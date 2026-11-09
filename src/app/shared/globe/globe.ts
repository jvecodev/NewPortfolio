import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  input,
  viewChild,
} from '@angular/core';
import { GeoPermissibleObjects, geoDistance, geoGraticule10, geoOrthographic, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { GeometryCollection, Topology } from 'topojson-specification';
import { ThemeService } from '../../core/theme.service';

interface Palette {
  sea: string;
  land: string;
  coast: string;
  grid: string;
  rim: string;
  accent: string;
}

const SPHERE: GeoPermissibleObjects = { type: 'Sphere' };
const GRATICULE = geoGraticule10();
const FLY_IN_MS = 2600;

/**
 * Orthographic globe drawn on canvas. Flies in to `lat/lon`, can be dragged,
 * and only animates while visible.
 */
@Component({
  selector: 'app-globe',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<canvas
    #canvas
    role="img"
    [attr.aria-label]="label()"
    (pointerdown)="onPointerDown($event)"
    (dblclick)="recenter()"
  ></canvas>`,
  styleUrl: './globe.css',
})
export class Globe {
  readonly lat = input.required<number>();
  readonly lon = input.required<number>();
  /** Optional photo drawn as the location marker (as in the original intro map). */
  readonly photo = input('');
  readonly label = input('');

  private readonly canvasRef = viewChild.required<ElementRef<HTMLCanvasElement>>('canvas');
  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly theme = inject(ThemeService);

  private readonly projection = geoOrthographic().clipAngle(90).precision(0.4);
  private ctx: CanvasRenderingContext2D | null = null;
  private land: GeoPermissibleObjects | null = null;
  private markerImage: HTMLImageElement | null = null;
  private palette: Palette | null = null;
  private size = 0;
  private dpr = 1;
  private frame = 0;
  private visible = true;
  private reducedMotion = false;
  private tween: { from: [number, number]; to: [number, number]; start: number; ms: number } | null =
    null;
  private drag: { x: number; y: number; rotate: [number, number] } | null = null;
  private returnTimer: ReturnType<typeof setTimeout> | undefined;

  constructor() {
    const destroyRef = inject(DestroyRef);

    effect(() => {
      this.theme.theme();
      this.palette = null; // re-read CSS variables on next draw
      this.draw(performance.now());
    });

    afterNextRender(() => {
      const canvas = this.canvasRef().nativeElement;
      this.ctx = canvas.getContext('2d');
      this.reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

      const home = this.homeRotation();
      if (this.reducedMotion) {
        this.projection.rotate(home);
      } else {
        this.projection.rotate([home[0] - 140, home[1] + 20]);
        this.flyTo(home, FLY_IN_MS);
      }

      const resize = new ResizeObserver(() => this.resize());
      resize.observe(this.host);
      const io = new IntersectionObserver(([entry]) => {
        this.visible = entry.isIntersecting;
        if (this.visible) this.loop();
      });
      io.observe(this.host);
      this.resize();
      this.loadLand();
      this.loadPhoto();
      this.loop();

      destroyRef.onDestroy(() => {
        resize.disconnect();
        io.disconnect();
        cancelAnimationFrame(this.frame);
        clearTimeout(this.returnTimer);
      });
    });
  }

  recenter(): void {
    this.flyTo(this.homeRotation(), this.reducedMotion ? 0 : 1400);
    this.loop();
  }

  protected onPointerDown(event: PointerEvent): void {
    const canvas = this.canvasRef().nativeElement;
    canvas.setPointerCapture(event.pointerId);
    clearTimeout(this.returnTimer);
    this.tween = null;
    const [l, p] = this.projection.rotate();
    this.drag = { x: event.clientX, y: event.clientY, rotate: [l, p] };

    const move = (e: PointerEvent) => {
      if (!this.drag) return;
      const k = 75 / Math.max(this.projection.scale(), 1);
      const lambda = this.drag.rotate[0] + (e.clientX - this.drag.x) * k;
      const phi = clamp(this.drag.rotate[1] - (e.clientY - this.drag.y) * k, -75, 75);
      this.projection.rotate([lambda, phi]);
      this.loop();
    };
    const up = () => {
      this.drag = null;
      // Drift back home after the visitor lets go.
      this.returnTimer = setTimeout(() => this.recenter(), 2500);
      canvas.removeEventListener('pointermove', move);
      canvas.removeEventListener('pointerup', up);
      canvas.removeEventListener('pointercancel', up);
    };
    canvas.addEventListener('pointermove', move);
    canvas.addEventListener('pointerup', up);
    canvas.addEventListener('pointercancel', up);
  }

  private homeRotation(): [number, number] {
    return [-this.lon(), -this.lat()];
  }

  private flyTo(to: [number, number], ms: number): void {
    const [l, p] = this.projection.rotate();
    // Take the short way round in longitude.
    const from: [number, number] = [to[0] + ((((l - to[0]) % 360) + 540) % 360) - 180, p];
    this.tween = { from, to, start: performance.now(), ms };
  }

  private async loadLand(): Promise<void> {
    try {
      const url = new URL('assets/geo/land-110m.json', document.baseURI);
      const topology = (await (await fetch(url)).json()) as Topology<{ land: GeometryCollection }>;
      this.land = feature(topology, topology.objects.land);
      this.loop();
    } catch {
      /* The globe still renders sphere + graticule without land. */
    }
  }

  private loadPhoto(): void {
    if (!this.photo()) return;
    const img = new Image();
    img.onload = () => {
      this.markerImage = img;
      this.loop();
    };
    img.src = this.photo();
  }

  private resize(): void {
    const canvas = this.canvasRef().nativeElement;
    const size = Math.floor(this.host.clientWidth);
    if (!size) return;
    this.size = size;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * this.dpr;
    canvas.height = size * this.dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    this.projection.scale(size / 2 - 2).translate([size / 2, size / 2]);
    this.draw(performance.now());
  }

  /** Runs a rAF loop while visible; the marker pulse keeps it alive. */
  private loop(): void {
    cancelAnimationFrame(this.frame);
    const tick = (now: number) => {
      this.draw(now);
      if (this.visible && !(this.reducedMotion && !this.tween)) {
        this.frame = requestAnimationFrame(tick);
      }
    };
    this.frame = requestAnimationFrame(tick);
  }

  private draw(now: number): void {
    const ctx = this.ctx;
    if (!ctx || !this.size) return;
    this.palette ??= readPalette(this.host);
    const c = this.palette;

    if (this.tween) {
      const t = this.tween.ms ? Math.min((now - this.tween.start) / this.tween.ms, 1) : 1;
      const e = easeInOutCubic(t);
      const { from, to } = this.tween;
      this.projection.rotate([from[0] + (to[0] - from[0]) * e, from[1] + (to[1] - from[1]) * e]);
      if (t >= 1) this.tween = null;
    }

    const path = geoPath(this.projection, ctx);
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.clearRect(0, 0, this.size, this.size);

    ctx.beginPath();
    path(SPHERE);
    ctx.fillStyle = c.sea;
    ctx.fill();

    ctx.beginPath();
    path(GRATICULE);
    ctx.lineWidth = 0.6;
    ctx.strokeStyle = c.grid;
    ctx.stroke();

    if (this.land) {
      ctx.beginPath();
      path(this.land);
      ctx.fillStyle = c.land;
      ctx.fill();
      ctx.lineWidth = 0.7;
      ctx.strokeStyle = c.coast;
      ctx.stroke();
    }

    ctx.beginPath();
    path(SPHERE);
    ctx.lineWidth = 1;
    ctx.strokeStyle = c.rim;
    ctx.stroke();

    this.drawMarker(ctx, c, now);
  }

  private drawMarker(ctx: CanvasRenderingContext2D, c: Palette, now: number): void {
    const point: [number, number] = [this.lon(), this.lat()];
    const [l, p] = this.projection.rotate();
    if (geoDistance(point, [-l, -p]) > Math.PI / 2 - 0.05) return;
    const xy = this.projection(point);
    if (!xy) return;
    const [x, y] = xy;

    if (!this.reducedMotion) {
      const t = (now % 2200) / 2200;
      ctx.beginPath();
      ctx.arc(x, y, 16 + t * 22, 0, Math.PI * 2);
      ctx.strokeStyle = c.accent;
      ctx.globalAlpha = 1 - t;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    const img = this.markerImage;
    if (!img) {
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fillStyle = c.accent;
      ctx.fill();
      return;
    }

    // Circular photo with a white ring and amber border.
    const r = 16;
    ctx.save();
    ctx.shadowColor = 'rgba(255, 182, 55, 0.7)';
    ctx.shadowBlur = 18;
    ctx.beginPath();
    ctx.arc(x, y, r + 3, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.beginPath();
    ctx.arc(x, y, r, 0, Math.PI * 2);
    ctx.clip();
    const side = Math.min(img.naturalWidth, img.naturalHeight);
    ctx.drawImage(
      img,
      (img.naturalWidth - side) / 2,
      (img.naturalHeight - side) / 2,
      side,
      side,
      x - r,
      y - r,
      r * 2,
      r * 2,
    );
    ctx.restore();

    ctx.beginPath();
    ctx.arc(x, y, r + 3, 0, Math.PI * 2);
    ctx.strokeStyle = c.accent;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }
}

function readPalette(el: HTMLElement): Palette {
  const s = getComputedStyle(el);
  const v = (name: string) => s.getPropertyValue(name).trim();
  return {
    sea: v('--globe-sea'),
    land: v('--globe-land'),
    coast: v('--globe-coast'),
    grid: v('--globe-grid'),
    rim: v('--globe-rim'),
    accent: v('--accent'),
  };
}

function clamp(n: number, min: number, max: number): number {
  return Math.min(Math.max(n, min), max);
}

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
