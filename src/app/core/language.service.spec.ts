import { DOCUMENT } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CONTENT_EN } from '../content/content.en';
import { CONTENT_PT } from '../content/content.pt';
import { PROJECTS } from '../content/profile';
import { LanguageService } from './language.service';

describe('LanguageService', () => {
  beforeEach(() => localStorage.clear());

  it('switches content, <html lang> and persists the choice', () => {
    localStorage.setItem('portfolio.lang', 'pt');
    const service = TestBed.inject(LanguageService);
    const doc = TestBed.inject(DOCUMENT);

    expect(service.content()).toBe(CONTENT_PT);

    service.set('en');
    TestBed.tick();

    expect(service.content()).toBe(CONTENT_EN);
    expect(doc.documentElement.lang).toBe('en-US');
    expect(doc.title).toBe(CONTENT_EN.meta.title);
    expect(localStorage.getItem('portfolio.lang')).toBe('en');
  });

  it('restores a stored language', () => {
    localStorage.setItem('portfolio.lang', 'en');
    expect(TestBed.inject(LanguageService).lang()).toBe('en');
  });
});

describe('content parity (PT ⇄ EN)', () => {
  it('has the same navigation targets', () => {
    expect(CONTENT_EN.nav.map((n) => n.id)).toEqual(CONTENT_PT.nav.map((n) => n.id));
  });

  it('has matching list lengths in both languages', () => {
    for (const c of [CONTENT_PT, CONTENT_EN]) {
      expect(c.stack.layers.length).toBe(CONTENT_PT.stack.layers.length);
      expect(c.about.facts.length).toBe(CONTENT_PT.about.facts.length);
      expect(c.certifications.other.length).toBe(CONTENT_PT.certifications.other.length);
    }
  });

  it('describes every project in both languages', () => {
    for (const p of PROJECTS) {
      expect(CONTENT_PT.projects.descriptions[p.id]).toBeTruthy();
      expect(CONTENT_EN.projects.descriptions[p.id]).toBeTruthy();
    }
  });
});
