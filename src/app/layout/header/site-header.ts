import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  afterNextRender,
  inject,
  signal,
} from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { ThemeService } from '../../core/theme.service';
import { Lang } from '../../content/content.model';
import { PROFILE } from '../../content/profile';

@Component({
  selector: 'app-site-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './site-header.html',
  styleUrl: './site-header.css',
  host: {
    '[class.scrolled]': 'scrolled()',
    '[class.open]': 'menuOpen()',
    '(window:scroll)': 'onScroll()',
    '(document:keydown.escape)': 'menuOpen.set(false)',
  },
})
export class SiteHeader {
  protected readonly i18n = inject(LanguageService);
  protected readonly theme = inject(ThemeService);
  protected readonly c = this.i18n.content;
  protected readonly photo = PROFILE.photo;
  protected readonly name = PROFILE.name;
  protected readonly langs: { code: Lang; label: string; flag: string }[] = [
    { code: 'pt', label: 'Português', flag: 'assets/icon/flag-br.svg' },
    { code: 'en', label: 'English', flag: 'assets/icon/flag-uk.svg' },
  ];

  protected readonly scrolled = signal(false);
  protected readonly menuOpen = signal(false);
  protected readonly active = signal('');

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      this.onScroll();
      const sections = this.c()
        .nav.map((n) => document.getElementById(n.id))
        .filter((el): el is HTMLElement => !!el);
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) this.active.set(entry.target.id);
          }
        },
        { rootMargin: '-45% 0px -50% 0px' },
      );
      sections.forEach((s) => observer.observe(s));
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }

  protected onScroll(): void {
    this.scrolled.set(window.scrollY > 8);
  }
}
