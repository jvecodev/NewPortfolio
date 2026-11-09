import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { LanguageService } from '../../core/language.service';
import { Reveal } from '../../core/reveal.directive';
import { PROFILE } from '../../content/profile';
import { SectionHeader } from '../../shared/section-header/section-header';

type Status = 'idle' | 'sending' | 'sent' | 'error';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [SectionHeader, Reveal],
  host: { id: 'contact' },
  templateUrl: './contact.html',
  styleUrl: './contact.css',
})
export class Contact {
  protected readonly c = inject(LanguageService).content;
  protected readonly profile = PROFILE;
  protected readonly status = signal<Status>('idle');
  protected readonly copied = signal(false);
  protected readonly whatsappUrl = computed(
    () =>
      `https://wa.me/${PROFILE.whatsapp}?text=${encodeURIComponent(this.c().contact.whatsappMessage)}`,
  );

  protected async copyEmail(): Promise<void> {
    try {
      await navigator.clipboard.writeText(PROFILE.email);
      this.copied.set(true);
      setTimeout(() => this.copied.set(false), 2000);
    } catch {
      window.location.href = `mailto:${PROFILE.email}`;
    }
  }

  /** Sends through FormSubmit's AJAX endpoint so the visitor stays on the page. */
  protected async submit(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form));
    if (data['_honey']) return; // bot

    this.status.set('sending');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${PROFILE.email}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data['name'],
          email: data['email'],
          message: data['message'],
          _subject: this.c().contact.subject,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      if (!res.ok || String(json.success) !== 'true') throw new Error('FormSubmit rejected');
      this.status.set('sent');
      form.reset();
    } catch {
      this.status.set('error');
    }
  }
}
