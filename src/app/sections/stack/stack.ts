import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { Reveal } from '../../core/reveal.directive';
import { SectionHeader } from '../../shared/section-header/section-header';

@Component({
  selector: 'app-stack',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeader, Reveal],
  host: { id: 'stack' },
  template: `
    <section class="section" aria-labelledby="stack-title">
      <app-section-header headingId="stack-title" [title]="c().stack.title" />

      <ul class="grid" appReveal>
        @for (layer of c().stack.layers; track $index; let i = $index) {
          <li [class.ai]="i < 4">
            <h3>{{ layer.name }}</h3>
            <p class="items">
              @for (item of layer.items; track item) {
                <span>{{ item }}</span>
              }
            </p>
          </li>
        }
      </ul>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 48px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    li {
      padding: 20px 0;
      border-top: 1px solid var(--line);
    }
    h3 {
      display: flex;
      align-items: center;
      gap: 10px;
      margin: 0;
      font-weight: 700;
      font-size: 1.0625rem;
    }
    h3::before {
      content: '';
      width: 8px;
      height: 8px;
      border-radius: 50%;
      border: 2px solid var(--ink-3);
    }
    .ai h3::before {
      border-color: var(--amber);
      background: var(--amber);
    }
    .items {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 10px 0 0;
    }
    .items span {
      padding: 4px 12px;
      border: 1px solid var(--line-strong);
      border-radius: 999px;
      font-size: 0.875rem;
      color: var(--ink-2);
    }
    .ai .items span {
      border-color: color-mix(in srgb, var(--amber) 60%, transparent);
      background: color-mix(in srgb, var(--amber) 10%, transparent);
      color: var(--ink);
    }
    @media (max-width: 759px) {
      .grid {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `,
})
export class Stack {
  protected readonly c = inject(LanguageService).content;
}
