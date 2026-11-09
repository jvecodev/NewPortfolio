import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PROFILE } from '../../content/profile';

@Component({
  selector: 'app-site-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <img class="logo" src="assets/img/logoName.svg" alt="" width="64" height="64" />
    <p class="signature">{{ firstName }}</p>
    <p class="meta">© {{ year }} {{ name }} · {{ city }}, PR</p>
  `,
  styles: `
    :host {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 48px var(--gutter) 40px;
      border-top: 1px solid var(--line);
      text-align: center;
    }
    .logo {
      width: 64px;
      height: 64px;
    }
    :host-context([data-theme='dark']) .logo {
      filter: invert(1);
    }
    .signature {
      margin: 4px 0 0;
      font: 700 2rem/1 var(--font-hand);
      color: var(--ink);
      transform: rotate(-3deg);
    }
    .meta {
      margin: 12px 0 0;
      font-size: 0.8125rem;
      color: var(--ink-3);
    }
  `,
})
export class SiteFooter {
  protected readonly year = new Date().getFullYear();
  protected readonly name = 'João Vitor Oliveira';
  protected readonly firstName = PROFILE.firstName;
  protected readonly city = PROFILE.home.city;
}
