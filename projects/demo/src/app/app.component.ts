import { Menu } from './components/nav/menu.interface';
import { NavComponent } from './components/nav/nav.component';
import { GraphqlService, NavigationQueryResult } from './services/graphql.service';
import { LoadingService } from './services/loading.service';

import { CdkScrollable } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import { Component, DestroyRef, ViewEncapsulation, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { ObservableQuery } from '@apollo/client/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsSegmentedControlToggleDirective, IdsSegmentedControlToggleItemComponent } from '@i-cell/ids-angular/segmented-control-toggle';
import { IdsSpinnerComponent } from '@i-cell/ids-angular/spinner';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter } from 'rxjs';

export type Theme = 'light' | 'dark';
@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    RouterOutlet,
    TranslateModule,
    NavComponent,
    CdkScrollable,
    ReactiveFormsModule,
    IdsSegmentedControlToggleDirective,
    IdsSegmentedControlToggleItemComponent,
    FormsModule,
    IdsIconComponent,
    IdsSpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  public loadingService = inject(LoadingService);

  private _translate: TranslateService = inject(TranslateService);
  private _router = inject(Router);

  // Use a string FormControl to hold the segmented control value ('light-mode' | 'dark-mode')
  public theme = new FormControl<Theme>('light', { nonNullable: true });

  public dynamicMenu: Menu[] = [];
  private _destroyRef = inject(DestroyRef);

  private _componentLevelDepth: number | undefined;
  private _navTree: StatamicNavNode[] = [];
  private readonly _linkID = 'ids-tokens';
  private readonly _doc = inject(DOCUMENT);

  constructor() {
    this._changeTheme('light');

    this.theme.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((value) => {
      this._changeTheme(value);
    });

    this._translate.addLangs([
      'hu',
      'en',
    ]);
    this._translate.setFallbackLang('hu');

    const urlLang = location.pathname.split('/')[1];
    let initialLang = 'hu';
    if (urlLang?.match(/^(hu|en)$/)) {
      initialLang = urlLang;
    } else {
      const browserLang = this._translate.getBrowserLang();
      if (browserLang?.match(/hu|en/)) {
        initialLang = browserLang;
      }
    }
    this._translate.use(initialLang);

    this._router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe((event) => {
        const lang = event.urlAfterRedirects.split('/')[1];
        if (lang?.match(/^(hu|en)$/) && lang !== this._translate.currentLang) {
          this._translate.use(lang);
        }
      });

    const graphqlService = inject(GraphqlService);
    graphqlService
      .getNavigation()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((result: ObservableQuery.Result<NavigationQueryResult>) => {
        this._navTree = result.data?.navs?.[0]?.tree || [];
        this._componentLevelDepth = this._findDeepestLevel(this._navTree);
        this.dynamicMenu = this._mapStatamicNavToMenu(this._navTree);
      });

    this._translate.onLangChange.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      if (this._navTree.length > 0) {
        this.dynamicMenu = this._mapStatamicNavToMenu(this._navTree);
      }
    });
  }

  private async _setTokens(href: string): Promise<void> {
    const head = this._doc.head;
    const current = this._doc.getElementById(this._linkID) as HTMLLinkElement | null;

    if (current?.href && new URL(current.href).pathname.endsWith(href)) {
      return;
    }

    const next = this._doc.createElement('link');
    next.rel = 'stylesheet';
    next.href = href;
    next.setAttribute('data-tokens', 'next');

    await new Promise<void>((resolve, reject) => {
      next.onload = (): void => resolve();
      next.onerror = (): void => reject(new Error(`Failed to load: ${href}`));
      head.appendChild(next);
    });

    if (current) {
      head.removeChild(current);
    }
    next.id = this._linkID;
    next.removeAttribute('data-tokens');
  }

  protected _changeStyle(style: 'default' | 'alt'): Promise<void> | undefined {
    if (style === 'default') {
      return this._setTokens('assets/ids-tokens/tokens.css');
    } else if (style === 'alt') {
      return this._setTokens('assets/ids_css/tokens.css');
    } else {
      return undefined;
    }
  }

  private _findDeepestLevel(tree: readonly StatamicNavNode[], currentDepth = 0): number {
    if (!tree || tree.length === 0) {
      return currentDepth;
    }
    return Math.max(...tree.map((node: StatamicNavNode) => this._findDeepestLevel(node.children ?? [], node.depth ?? 0)));
  }

  private _mapStatamicNavToMenu(tree: StatamicNavNode[]): Menu[] {
    const lang = this._translate.getCurrentLang() || 'hu';
    return tree.map((node) => {
      let path: string | undefined = undefined;
      if (node.page?.slug && node.depth) {
        if (this._componentLevelDepth !== undefined && node.depth >= this._componentLevelDepth) {
          path = `/${lang}/components/${node.page.slug}`;
        } else {
          path = `/${lang}/${node.page.slug}`;
        }
      }
      return {
        slug: node.page?.slug,
        name: node.page?.title,
        path,
        children: node.children ? this._mapStatamicNavToMenu(node.children) : [],
      };
    });
  }

  private _changeTheme(theme: Theme): void {
    if (theme === 'dark') {
      document.documentElement.classList.remove('ids-theme-light');
      document.documentElement.classList.add('ids-theme-dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('ids-theme-dark');
      document.documentElement.classList.add('ids-theme-light');
    }
  }

  public changeLanguage(lang: 'en' | 'hu'): void {
    this._translate.use(lang);
    const currentUrl = this._router.url;
    const newUrl = currentUrl.replace(/^\/(hu|en)/, `/${lang}`);
    this._router.navigateByUrl(newUrl);
  }
}

interface StatamicNavNode {
  depth?: number;
  page?: { title?: string; id?: string; slug?: string };
  children?: StatamicNavNode[];
}
