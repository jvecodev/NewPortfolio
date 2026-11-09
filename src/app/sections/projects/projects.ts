import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { Reveal } from '../../core/reveal.directive';
import { PROJECTS } from '../../content/profile';
import { SectionHeader } from '../../shared/section-header/section-header';

@Component({
  selector: 'app-projects',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeader, Reveal],
  host: { id: 'projects' },
  template: `
    <section class="section" aria-labelledby="projects-title">
      <app-section-header headingId="projects-title" [title]="c().projects.title" />

      <ol class="list">
        @for (p of projects; track p.id) {
          <li appReveal>
            <article class="project">
              <div class="head">
                <h3>{{ p.name }}</h3>
                @if (p.status) {
                  <span [class]="'status ' + p.status">{{ c().projects.status[p.status] }}</span>
                }
                @if (p.team) {
                  <span class="status team">{{ c().projects.team }}</span>
                }
              </div>
              <div class="desc">
                <p>{{ c().projects.descriptions[p.id] }}</p>
                @if (c().projects.roles[p.id]; as role) {
                  <p class="role"><strong>{{ c().projects.roleLabel }}:</strong> {{ role }}</p>
                }
              </div>
              <p class="tech">{{ p.tech.join(' · ') }}</p>
              <div class="links">
                @for (link of p.links; track link.url) {
                  <a class="repo" [href]="link.url" target="_blank" rel="noopener">
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.9-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.56 9.56 0 0 1 5 0c1.91-1.3 2.75-1.02 2.75-1.02.55 1.38.2 2.4.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" /></svg>
                    {{ c().projects.links[link.kind] }}
                    <span class="arrow" aria-hidden="true">↗</span>
                  </a>
                }
              </div>
            </article>
          </li>
        }
      </ol>
    </section>
  `,
  styles: `
    :host {
      display: block;
    }
    .list {
      margin: 0;
      padding: 0;
      list-style: none;
      border-bottom: 1px solid var(--line);
    }
    .project {
      display: grid;
      grid-template-columns: minmax(0, 280px) minmax(0, 1fr) auto;
      grid-template-areas:
        'head desc links'
        'head tech links';
      gap: 6px 40px;
      padding: 28px 0;
      border-top: 1px solid var(--line);
    }
    .head {
      grid-area: head;
    }
    h3 {
      margin: 0;
      font-weight: 800;
      font-size: 1.25rem;
      letter-spacing: -0.02em;
      transition: color 0.2s ease;
    }
    .status {
      display: inline-block;
      margin-top: 8px;
      font: 700 1.125rem/1 var(--font-hand);
      color: var(--amber-ink);
    }
    .status {
      display: block;
    }
    .status.study,
    .status.team {
      color: var(--ink-3);
    }
    .desc {
      grid-area: desc;
      color: var(--ink-2);
    }
    .desc p {
      margin: 0;
    }
    .desc .role {
      margin-top: 8px;
      color: var(--ink);
    }
    .role strong {
      font-weight: 700;
      color: var(--amber-ink);
    }
    .tech {
      grid-area: tech;
      margin: 4px 0 0;
      font-size: 0.875rem;
      color: var(--ink-3);
    }
    .links {
      grid-area: links;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .repo {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      font-weight: 600;
      font-size: 0.9375rem;
      color: var(--ink);
      white-space: nowrap;
    }
    .repo svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
    }
    .arrow {
      transition: transform 0.2s ease;
    }
    .repo:hover {
      color: var(--amber-deep);
    }
    .repo:hover .arrow {
      transform: translate(2px, -2px);
    }
    @media (max-width: 859px) {
      .project {
        grid-template-columns: minmax(0, 1fr);
        grid-template-areas: 'head' 'desc' 'tech' 'links';
        gap: 8px;
        padding: 24px 0;
      }
      .links {
        flex-direction: row;
        gap: 20px;
        margin-top: 8px;
      }
    }
  `,
})
export class Projects {
  protected readonly c = inject(LanguageService).content;
  protected readonly projects = PROJECTS;
}
