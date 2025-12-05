import { Menu } from './components/nav/menu.interface';
import { NavComponent } from './components/nav/nav.component';
import { GraphqlService, NavigationQueryResult } from './services/graphql.service';

import { CdkScrollable } from '@angular/cdk/scrolling';
import { DestroyRef, inject as angularInject, Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSwitchComponent } from '@i-cell/ids-angular/switch';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { map, startWith, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [
    RouterModule,
    RouterOutlet,
    TranslateModule,
    NavComponent,
    IdsButtonComponent,
    IdsSwitchComponent,
    CdkScrollable,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit, OnDestroy {
  private _translate: TranslateService = angularInject(TranslateService);

  private _subscription = new Subscription();

  public darkMode = new FormControl<boolean>(false);

  public currentLang = toSignal(this._translate.onLangChange.pipe(map(({ lang }) => lang), startWith(this._translate.currentLang)));

  public dynamicMenu: Menu[] = [];
  private _destroyRef = angularInject(DestroyRef);

  private _componentLevelDepth: number | undefined;

  constructor() {
    this._changeTheme('light');
    this._translate.addLangs([
      'hu',
      'en',
    ]);
    this._translate.setDefaultLang('en');
    const browserLang = this._translate.getBrowserLang();
    this._translate.use(browserLang?.toString().match(/hu|en/) ? browserLang : 'en');

    const graphqlService = angularInject(GraphqlService);
    graphqlService.getNavigation().pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((result: ApolloQueryResult<NavigationQueryResult>) => {
      const navTree = result.data.navs?.[0]?.tree || [];
      this._componentLevelDepth = this._findDeepestLevel(navTree);
      this.dynamicMenu = this._mapStatamicNavToMenu(navTree);
    });
  }

  private _findDeepestLevel(tree: readonly StatamicNavNode[], currentDepth = 0): number {
    if (!tree || tree.length === 0) {
      return currentDepth;
    }
    return Math.max(
      ...tree.map((node: StatamicNavNode) =>
        this._findDeepestLevel(node.children ?? [], node.depth),
      ),
    );
  }

  private _mapStatamicNavToMenu(tree: StatamicNavNode[]): Menu[] {
    return tree.map((node) => {
      let path: string | undefined = undefined;
      if (node.page?.slug) {
        if (this._componentLevelDepth !== undefined && node.depth >= this._componentLevelDepth) {
          path = `/components/${node.page.slug}`;
        } else {
          path = `/${node.page.slug}`;
        }
      }
      return {
        name: node.page?.title,
        path,
        children: node.children ? this._mapStatamicNavToMenu(node.children) : [],
      };
    });
  }

  public ngOnInit(): void {
    this._subscription = this.darkMode.valueChanges.subscribe((checked) => {
      this._changeTheme(checked ? 'dark' : 'light');
    });
  }

  private _changeTheme(theme: string): void {
    if (theme === 'dark') {
      document.documentElement.classList.remove('ids-theme-light');
      document.documentElement.classList.add('ids-theme-dark');
    } else if (theme === 'light') {
      document.documentElement.classList.remove('ids-theme-dark');
      document.documentElement.classList.add('ids-theme-light');
    }
  }

  public ngOnDestroy(): void {
    this._subscription.unsubscribe();
  }

  public changeLanguage(lang: 'en' | 'hu'): void {
    this._translate.use(lang);
  }
}

interface StatamicNavNode {
  depth: number;
  page?: { title?: string; id?: string; slug?: string };
  children?: StatamicNavNode[];
}
