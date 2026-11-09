import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { Reveal } from '../../core/reveal.directive';
import { PROFILE } from '../../content/profile';
import { SectionHeader } from '../../shared/section-header/section-header';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeader, Reveal],
  host: { id: 'about' },
  template: `
    <section class="section" aria-labelledby="about-title">
      <app-section-header headingId="about-title" [title]="c().about.title" />

      <div class="body" appReveal>
        <figure class="photo">
          <img [src]="profile.photo" [alt]="c().about.photoAlt" width="320" height="400" loading="lazy" />
        </figure>

        <div class="text">
          @for (p of c().about.paragraphs; track $index) {
            <p>{{ p }}</p>
          }

          <dl class="facts">
            @for (f of c().about.facts; track f.label) {
              <div>
                <dt>{{ f.label }}</dt>
                <dd>{{ f.value }}</dd>
              </div>
            }
          </dl>
        </div>
      </div>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .body {
      display: grid;
      grid-template-columns: minmax(0, 300px) minmax(0, 1fr);
      gap: 64px;
      align-items: start;
    }
    .photo {
      margin: 0;
    }
    .photo img {
      display: block;
      width: 100%;
      height: auto;
      aspect-ratio: 4 / 5;
      object-fit: cover;
      box-shadow: var(--amber) 8px 10px 0;
      animation: shape 8s ease-in-out infinite;
    }
    @keyframes shape {
      0%, 100% { border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%; }
      25% { border-radius: 20% 40% 60% 50% / 60% 90% 50% 40%; }
      50% { border-radius: 70% 30% 50% 40% / 40% 70% 30% 60%; }
      75% { border-radius: 80% 40% 60% 30% / 50% 80% 40% 70%; }
    }
    .text p {
      margin: 0 0 1em;
      font-size: 1.0625rem;
      color: var(--ink-2);
    }
    .text p:first-child {
      font-weight: 600;
      font-size: 1.25rem;
      line-height: 1.5;
      color: var(--ink);
    }
    .facts {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 0 32px;
      margin: 32px 0 0;
    }
    .facts div {
      padding: 14px 0;
      border-top: 1px solid var(--line);
    }
    .facts dt {
      font-size: 0.8125rem;
      font-weight: 600;
      color: var(--amber-ink);
    }
    .facts dd {
      margin: 2px 0 0;
      font-weight: 500;
    }
    @media (max-width: 859px) {
      .body {
        grid-template-columns: minmax(0, 1fr);
        gap: 40px;
      }
      .photo {
        max-width: 240px;
      }
      .facts {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `,
})
export class About {
  protected readonly c = inject(LanguageService).content;
  protected readonly profile = PROFILE;
}
