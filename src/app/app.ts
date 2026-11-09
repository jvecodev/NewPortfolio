import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LanguageService } from './core/language.service';
import { SiteFooter } from './layout/footer/site-footer';
import { SiteHeader } from './layout/header/site-header';
import { About } from './sections/about/about';
import { Certifications } from './sections/certifications/certifications';
import { Contact } from './sections/contact/contact';
import { Hero } from './sections/hero/hero';
import { Expertise } from './sections/expertise/expertise';
import { Projects } from './sections/projects/projects';
import { Stack } from './sections/stack/stack';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    SiteHeader,
    Hero,
    About,
    Expertise,
    Certifications,
    Stack,
    Projects,
    Contact,
    SiteFooter,
  ],
  template: `
    <a class="skip-link" href="#main">{{ c().a11y.skip }}</a>
    <app-site-header />
    <main id="main">
      <app-hero id="top" />
      <app-about />
      <app-projects />
      <app-expertise />
      <app-certifications />
      <app-stack />
      <app-contact />
    </main>
    <app-site-footer />
  `,
})
export class App {
  protected readonly c = inject(LanguageService).content;
}
