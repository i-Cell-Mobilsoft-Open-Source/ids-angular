import { httpResource } from '@angular/common/http';
import { computed, inject, Injectable, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';

/**
 * Supported languages for widget property/method documentation sidecar files
 * (`*.docs.json` files placed next to widget component/directive sources in `projects/widgets`).
 */
export type WidgetDocsLanguage = 'en' | 'hu';

export type WidgetDocEntry = {
  description: Partial<Record<WidgetDocsLanguage, string>>,
  type?: string,
};

export type WidgetDocs = Record<string, WidgetDocEntry>;

const WIDGET_DOCS_ASSET_BASE = 'assets/widget-docs';

/**
 * Loads `*.docs.json` sidecar files (copied from `projects/widgets/**` to
 * `assets/widget-docs/**` at build time, see angular.json) and exposes their
 * localized property/method descriptions as reactive signals that update
 * automatically when the active language changes.
 */
@Injectable({
  providedIn: 'root',
})
export class WidgetDocsService {
  private readonly _translate = inject(TranslateService);

  /** Currently active language, kept in sync with ngx-translate's `onLangChange`. */
  public readonly currentLang: Signal<string> = toSignal(
    this._translate.onLangChange.pipe(map((event) => event.lang)),
    { initialValue: this._translate.getCurrentLang() || this._translate.getFallbackLang() || 'en' },
  );

  private readonly _docsCache = new Map<string, Signal<WidgetDocs | undefined>>();

  /**
   * Loads (and caches) the sidecar docs file for a given widget source file.
   * @param docsPath path relative to `projects/widgets`, e.g. `badge/badge.component.docs.json`
   */
  public loadDocs(docsPath: string): Signal<WidgetDocs | undefined> {
    let cached = this._docsCache.get(docsPath);

    if (!cached) {
      const res = httpResource<WidgetDocs>(() => `${WIDGET_DOCS_ASSET_BASE}/${docsPath}`);
      cached = res.value;
      this._docsCache.set(docsPath, cached);
    }

    return cached;
  }

  /**
   * Returns a computed signal resolving to the localized description of `propertyName`,
   * looking it up in the given sidecar doc file(s) (checked in order, first match wins) for the
   * currently active language. Falls back to the English description, then to `fallback`.
   */
  public getDescription(docsPaths: string | string[], propertyName: string, fallback = ''): Signal<string> {
    const paths = Array.isArray(docsPaths) ? docsPaths : [docsPaths];
    const docsSignals = paths.map((path) => this.loadDocs(path));

    return computed(() => {
      for (const docsSignal of docsSignals) {
        const entry = docsSignal()?.[propertyName];

        if (entry) {
          const lang = this.currentLang() as WidgetDocsLanguage;
          return entry.description[lang] ?? entry.description.en ?? fallback;
        }
      }

      return fallback;
    });
  }
}
