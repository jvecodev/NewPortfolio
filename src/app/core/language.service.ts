import { DOCUMENT, Injectable, computed, effect, inject, signal } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { CONTENT_EN } from '../content/content.en';
import { Lang, SiteContent } from '../content/content.model';
import { CONTENT_PT } from '../content/content.pt';
import { readStorage, writeStorage } from './storage';

const STORAGE_KEY = 'portfolio.lang';
const CONTENT: Record<Lang, SiteContent> = { pt: CONTENT_PT, en: CONTENT_EN };

/** Runtime language switch (PT/EN). Components read `content()` and re-render on change. */
@Injectable({ providedIn: 'root' })
export class LanguageService {
  private readonly document = inject(DOCUMENT);
  private readonly meta = inject(Meta);

  readonly lang = signal<Lang>(this.initialLang());
  readonly content = computed(() => CONTENT[this.lang()]);
  /** BCP 47 locale for Intl APIs. */
  readonly locale = computed(() => (this.lang() === 'pt' ? 'pt-BR' : 'en-US'));

  constructor() {
    effect(() => {
      const content = this.content();
      this.document.documentElement.lang = this.locale();
      this.document.title = content.meta.title;
      this.meta.updateTag({ name: 'description', content: content.meta.description });
      writeStorage(STORAGE_KEY, this.lang());
    });
  }

  set(lang: Lang): void {
    this.lang.set(lang);
  }

  private initialLang(): Lang {
    const stored = readStorage(STORAGE_KEY);
    if (stored === 'pt' || stored === 'en') return stored;
    const browser = this.document.defaultView?.navigator.language ?? 'pt';
    return browser.toLowerCase().startsWith('pt') ? 'pt' : 'en';
  }
}
