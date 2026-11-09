import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { PROFILE } from '../../content/profile';
import { Globe } from '../../shared/globe/globe';

@Component({
  selector: 'app-hero',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [Globe],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class Hero {
  private readonly i18n = inject(LanguageService);
  protected readonly c = this.i18n.content;
  protected readonly profile = PROFILE;

  private readonly now = signal(new Date());
  protected readonly localTime = computed(() =>
    new Intl.DateTimeFormat(this.i18n.locale(), {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: PROFILE.home.timeZone,
    }).format(this.now()),
  );

  protected readonly whatsappUrl = computed(
    () =>
      `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(this.c().contact.whatsappMessage)}`,
  );

  constructor() {
    const timer = setInterval(() => this.now.set(new Date()), 15_000);
    inject(DestroyRef).onDestroy(() => clearInterval(timer));
  }
}
