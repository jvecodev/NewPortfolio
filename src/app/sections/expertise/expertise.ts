import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { Reveal } from '../../core/reveal.directive';
import { SectionHeader } from '../../shared/section-header/section-header';

interface Point {
  x: number;
  y: number;
}

/** Approximation of the decision boundary used to keep the two classes apart. */
const boundaryY = (x: number) => 60 + (x - 60) * (190 / 340);

/**
 * AI & ML focus areas, each with a small animated diagram:
 * a RAG pipeline, a multi-agent graph and a classification plot.
 */
@Component({
  selector: 'app-expertise',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeader, Reveal],
  host: { id: 'expertise' },
  templateUrl: './expertise.html',
  styleUrl: './expertise.css',
})
export class Expertise {
  protected readonly c = inject(LanguageService).content;

  /** Two deterministic clusters for the ML plot. */
  protected readonly classA = cluster(1, { x: 140, y: 195 }, -14);
  protected readonly classB = cluster(2, { x: 320, y: 105 }, 14);

  /** Agent graph: satellites around the orchestrator at (220, 140). */
  protected readonly agents = [
    { key: 'research', x: 90, y: 50, delay: '0s' },
    { key: 'tools', x: 350, y: 50, delay: '0.8s' },
    { key: 'memory', x: 90, y: 230, delay: '1.6s' },
    { key: 'reviewer', x: 350, y: 230, delay: '2.4s' },
  ] as const;
}

function cluster(seed: number, center: Point, side: number): Point[] {
  const rand = mulberry32(seed);
  const points: Point[] = [];
  while (points.length < 16) {
    const angle = rand() * Math.PI * 2;
    const radius = Math.sqrt(rand()) * 62;
    const p = { x: center.x + Math.cos(angle) * radius, y: center.y + Math.sin(angle) * radius };
    // `side` > 0 keeps points above the boundary, < 0 below it.
    const distance = boundaryY(p.x) - p.y;
    if (Math.sign(distance) === Math.sign(side) && Math.abs(distance) > Math.abs(side)) {
      points.push({ x: Math.round(p.x), y: Math.round(p.y) });
    }
  }
  return points;
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
