import { FooterComponent } from './components/footer/footer.component';
import { Menu } from './components/nav/menu.interface';
import { NavComponent } from './components/nav/nav.component';
import { GraphqlService } from './services/graphql.service';
import { LoadingService } from './services/loading.service';

import { CdkScrollable } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, Component, DestroyRef, ElementRef, ViewEncapsulation, inject, signal, viewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsSegmentedControlToggleDirective, IdsSegmentedControlToggleItemComponent } from '@i-cell/ids-angular/segmented-control-toggle';
import { IdsSpinnerComponent } from '@i-cell/ids-angular/spinner';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { filter, switchMap } from 'rxjs';

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
    FooterComponent,
    IdsSpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements AfterViewInit {
  public loadingService = inject(LoadingService);

  private readonly _navRef = viewChild<ElementRef<HTMLElement>>('navRef');
  private readonly _mainRef = viewChild<ElementRef<HTMLElement>>('mainRef');

  private _translate: TranslateService = inject(TranslateService);
  private _router = inject(Router);

  // Use a string FormControl to hold the segmented control value ('light-mode' | 'dark-mode')
  public theme = new FormControl<Theme>('light', { nonNullable: true });
  public language = new FormControl<string>('en', { nonNullable: true });

  public currentLang = signal<'hu' | 'en'>('en');

  public dynamicMenu: Menu[] = [];
  private _destroyRef = inject(DestroyRef);

  private _componentLevelDepth: number | undefined;
  private _navTree: StatamicNavNode[] = [];
  private readonly _linkID = 'ids-tokens';
  private readonly _doc = inject(DOCUMENT);

  constructor() {
    this._initLanguage();
    this._changeTheme('light');

    this.theme.valueChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((value) => {
      this._changeTheme(value);
    });

    this._router.events.pipe(filter((event): event is NavigationEnd => event instanceof NavigationEnd)).subscribe((event) => {
      const urlLang = event.urlAfterRedirects.split('/')[1];
      if (urlLang && /^(hu|en)$/.test(urlLang) && urlLang !== this._translate.getCurrentLang()) {
        this._setLanguage(urlLang as 'hu' | 'en');
      }
    });

    const graphqlService = inject(GraphqlService);
    graphqlService
      .getNavigation()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((result) => {
        const navResult = result as { data?: { navs?: Array<{ handle: string; tree: StatamicNavNode[] }> } };

        const sideNav = navResult.data?.navs?.find((nav) => nav.handle === 'side_nav');
        this._navTree = sideNav?.tree || [];

        this._componentLevelDepth = this._findDeepestLevel(this._navTree);
        this.dynamicMenu = this._mapStatamicNavToMenu(this._navTree);
      });

    this._translate.onLangChange.pipe(
      takeUntilDestroyed(this._destroyRef),
      switchMap(() => graphqlService.getNavigation()),
    ).subscribe((result) => {
      const navResult = result as { data?: { navs?: Array<{ handle: string; tree: StatamicNavNode[] }> } };

      const sideNav = navResult.data?.navs?.find((nav) => nav.handle === 'side_nav');
      this._navTree = sideNav?.tree || [];
      this._componentLevelDepth = this._findDeepestLevel(this._navTree);
      this.dynamicMenu = this._mapStatamicNavToMenu(this._navTree);
    });
  }

  public ngAfterViewInit(): void {
    this._setupScrollChaining();
  }

  private _setupScrollChaining(): void {
    const nav = this._navRef()?.nativeElement;
    const main = this._mainRef()?.nativeElement;

    if (!nav || !main) {
      return;
    }

    const onNavWheel = (event: WheelEvent): void => {
      this._chainWheelScroll(event, nav, main);
    };

    const onMainWheel = (event: WheelEvent): void => {
      if (event.deltaY < 0) {
        this._chainWheelScroll(event, main, nav);
      }
    };

    nav.addEventListener('wheel', onNavWheel, { passive: false });
    main.addEventListener('wheel', onMainWheel, { passive: false });

    this._destroyRef.onDestroy(() => {
      nav.removeEventListener('wheel', onNavWheel);
      main.removeEventListener('wheel', onMainWheel);
    });
  }

  private _chainWheelScroll(event: WheelEvent, source: HTMLElement, target: HTMLElement): void {
    const scrollingDown = event.deltaY > 0;
    const atSourceEnd = scrollingDown
      ? this._isScrolledToBottom(source)
      : this._isScrolledToTop(source);

    if (!atSourceEnd) {
      return;
    }

    const targetCanScroll = scrollingDown
      ? !this._isScrolledToBottom(target)
      : !this._isScrolledToTop(target);

    if (!targetCanScroll) {
      return;
    }

    target.scrollTop += event.deltaY;
    event.preventDefault();
  }

  private _isScrolledToBottom(element: HTMLElement, threshold = 1): boolean {
    return element.scrollTop + element.clientHeight >= element.scrollHeight - threshold;
  }

  private _isScrolledToTop(element: HTMLElement, threshold = 1): boolean {
    return element.scrollTop <= threshold;
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

  private _mapStatamicNavToMenu(tree: StatamicNavNode[], parentGeneratedSlug?: string): Menu[] {
    const lang = this._translate.getCurrentLang() || 'en';
    return tree.map((node) => {
      let path: string | undefined = undefined;
      const currentGeneratedSlug = node.page?.generated ? node.page.slug : parentGeneratedSlug;

      if (node.page?.slug && node.depth) {
        if (this._componentLevelDepth !== undefined && node.depth >= this._componentLevelDepth) {
          path = `/${lang}/components/${node.page.slug}`;
        } else if (parentGeneratedSlug && !node.page.generated) {
          path = `/${lang}/${parentGeneratedSlug}/${node.page.slug}`;
        } else {
          path = `/${lang}/${node.page.slug}`;
        }
      }
      return {
        slug: node.page?.slug,
        name: node.page?.title,
        path,
        children: node.children ? this._mapStatamicNavToMenu(node.children, currentGeneratedSlug) : [],
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

  private _initLanguage(): void {
    this._translate.addLangs([
      'hu',
      'en',
    ]);
    this._translate.setFallbackLang('en');

    const urlLang = location.pathname.split('/')[1];
    let langToUse: 'hu' | 'en';

    if (urlLang && /^(hu|en)$/.test(urlLang)) {
      langToUse = urlLang as 'hu' | 'en';
    } else {
      const sessionLang = sessionStorage.getItem('ids_lang');
      if (sessionLang && /^(hu|en)$/.test(sessionLang)) {
        langToUse = sessionLang as 'hu' | 'en';
      } else {
        const browserLang = this._translate.getBrowserLang();
        langToUse = browserLang && /hu|en/.test(browserLang) ? (browserLang as 'hu' | 'en') : 'en';
      }
    }

    this._setLanguage(langToUse);
  }

  private _setLanguage(lang: 'hu' | 'en'): void {
    this.currentLang.set(lang);
    sessionStorage.setItem('ids_lang', lang);
    this._translate.use(lang);
  }

  public changeLanguage(lang: 'en' | 'hu'): void {
    if (this.currentLang() !== lang) {
      this._setLanguage(lang);
      const currentUrl = this._router.url;
      const newUrl = currentUrl.replace(/^\/(hu|en)/, `/${lang}`);
      this._router.navigateByUrl(newUrl);
    }
  }
}

interface StatamicNavNode {
  depth?: number;
  page?: { title?: string; id?: string; slug?: string; generated?: boolean };
  children?: StatamicNavNode[];
}
