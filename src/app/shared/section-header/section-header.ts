import { ChangeDetectionStrategy, Component, input } from '@angular/core';

/** Section title with a hand-drawn amber underline and an optional lead. */
@Component({
  selector: 'app-section-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h2 class="title" [id]="headingId()">
      {{ title() }}
      <svg class="scribble" viewBox="0 0 200 14" preserveAspectRatio="none" aria-hidden="true">
        <path d="M3 9 C 40 3, 80 12, 120 6 S 180 4, 197 8" />
      </svg>
    </h2>
    @if (lead()) {
      <p class="lead">{{ lead() }}</p>
    }
  `,
  styles: `
    :host {
      display: block;
    }
    .title {
      position: relative;
      display: inline-block;
      margin: 0;
      padding-bottom: 10px;
      font-weight: 800;
      font-size: clamp(2rem, 4vw, 2.75rem);
      line-height: 1.1;
      letter-spacing: -0.03em;
    }
    .scribble {
      position: absolute;
      left: 0;
      bottom: -4px;
      width: 100%;
      height: 14px;
      overflow: visible;
    }
    .scribble path {
      fill: none;
      stroke: var(--amber);
      stroke-width: 4;
      stroke-linecap: round;
      vector-effect: non-scaling-stroke;
    }
    .lead {
      max-width: 56ch;
      margin: 18px 0 0;
      font-size: 1.0625rem;
      color: var(--ink-2);
    }
  `,
})
export class SectionHeader {
  readonly title = input.required<string>();
  readonly lead = input<string>();
  readonly headingId = input<string>();
}
