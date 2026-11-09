import { DOCUMENT, Injectable, inject, signal } from '@angular/core';
import { writeStorage } from './storage';

export type Theme = 'light' | 'dark';
const STORAGE_KEY = 'portfolio.theme';

/**
 * The initial theme is applied by an inline script in index.html (avoids a flash);
 * this service reads it back and keeps `data-theme` on <html> in sync.
 */
@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly root = inject(DOCUMENT).documentElement;

  readonly theme = signal<Theme>(this.root.dataset['theme'] === 'dark' ? 'dark' : 'light');

  toggle(): void {
    const next: Theme = this.theme() === 'dark' ? 'light' : 'dark';
    // Set the attribute synchronously so canvas consumers read fresh CSS variables.
    this.root.dataset['theme'] = next;
    this.theme.set(next);
    writeStorage(STORAGE_KEY, next);
  }
}
