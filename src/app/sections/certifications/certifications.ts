import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { Reveal } from '../../core/reveal.directive';
import { IBM_COURSES } from '../../content/profile';
import { SectionHeader } from '../../shared/section-header/section-header';

@Component({
  selector: 'app-certifications',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeader, Reveal],
  host: { id: 'certifications' },
  template: `
    <section class="section" aria-labelledby="certifications-title">
      <app-section-header headingId="certifications-title" [title]="c().certifications.title" />

      <div class="body">
        <article class="cert" appReveal>
          <header>
            <div class="seal" aria-hidden="true">
              <span>IBM</span>
            </div>
            <div>
              <h3>{{ c().certifications.certName }}</h3>
              <p class="meta">
                <span>{{ c().certifications.issuer }}</span>
                <span>{{ c().certifications.completed }}</span>
                <span>{{ c().certifications.courses }}</span>
              </p>
            </div>
          </header>

          <ol class="courses">
            @for (course of courses; track course; let i = $index; let last = $last) {
              <li [class.capstone]="last">
                <span class="n">{{ (i + 1).toString().padStart(2, '0') }}</span>
                <span class="t">{{ course }}</span>
                @if (last) {
                  <span class="tag">{{ c().certifications.capstone }}</span>
                }
              </li>
            }
          </ol>
        </article>

        <div class="other" appReveal>
          <h3>{{ c().certifications.otherTitle }}</h3>
          <ul>
            @for (item of c().certifications.other; track item) {
              <li>{{ item }}</li>
            }
          </ul>
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
      gap: 24px;
    }
    .cert {
      padding: 36px;
      border-radius: var(--radius);
      border: 1px solid var(--line);
      background: var(--card);
    }
    header {
      display: flex;
      gap: 20px;
      align-items: center;
      margin-bottom: 24px;
    }
    .seal {
      flex: none;
      display: grid;
      place-items: center;
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--amber-soft), var(--amber));
            font: 800 0.9375rem/1 var(--font-display);
      color: #1b1306;
    }
    h3 {
      margin: 0;
      font-weight: 800;
      font-size: 1.5rem;
      line-height: 1.2;
      letter-spacing: -0.02em;
    }
    .meta {
      display: flex;
      flex-wrap: wrap;
      gap: 6px;
      margin: 10px 0 0;
    }
    .meta span {
      padding: 4px 10px;
      border-radius: 999px;
      background: color-mix(in srgb, var(--amber) 16%, transparent);
      font: 600 0.8125rem/1.2 var(--font-display);
      color: var(--amber-ink);
    }
    .courses {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 10px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .courses li {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 10px 14px;
      border-radius: var(--radius-sm);
      background: var(--paper-2);
      font-size: 0.9375rem;
      transition: transform 0.2s ease;
    }
    .courses li:hover {
      transform: translateX(4px);
    }
    .n {
      flex: none;
      display: grid;
      place-items: center;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      background: var(--card);
      font: 700 0.75rem/1 var(--font-display);
      color: var(--amber-ink);
    }
    .capstone {
      outline: 2px solid var(--amber);
    }
    .capstone .n {
      background: var(--amber);
      color: #1b1306;
    }
    .tag {
      margin-left: auto;
      padding: 3px 8px;
      border-radius: 999px;
      background: var(--amber);
      font: 700 0.6875rem/1.2 var(--font-display);
      color: #1b1306;
      white-space: nowrap;
    }
    .other {
      padding: 28px 36px;
      border-radius: var(--radius);
      border: 1px solid var(--line);
      background: var(--card);
    }
    .other h3 {
      font-size: 1.25rem;
      margin-bottom: 14px;
    }
    .other ul {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px 24px;
      margin: 0;
      padding: 0;
      list-style: none;
    }
    .other li {
      position: relative;
      padding-left: 18px;
      color: var(--ink-2);
    }
    .other li::before {
      content: '';
      position: absolute;
      top: 0.65em;
      left: 0;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: var(--amber);
    }
    @media (max-width: 759px) {
      .cert,
      .other {
        padding: 24px 18px;
      }
      header {
        align-items: flex-start;
      }
      .courses,
      .other ul {
        grid-template-columns: minmax(0, 1fr);
      }
    }
  `,
})
export class Certifications {
  protected readonly c = inject(LanguageService).content;
  protected readonly courses = IBM_COURSES;
}
