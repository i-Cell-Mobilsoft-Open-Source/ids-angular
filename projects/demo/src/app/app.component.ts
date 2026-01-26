import { FooterComponent } from './components/footer/footer.component';
import { Menu } from './components/nav/menu.interface';
import { NavComponent } from './components/nav/nav.component';
import { GraphqlService, NavigationQueryResult } from './services/graphql.service';

import { CdkScrollable } from '@angular/cdk/scrolling';
import { DestroyRef, Component, ViewEncapsulation, inject } from '@angular/core';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { ApolloQueryResult } from '@apollo/client/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsSegmentedControlToggleDirective, IdsSegmentedControlToggleItemComponent } from '@i-cell/ids-angular/segmented-control-toggle';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { map, startWith } from 'rxjs';

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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  private _translate: TranslateService = inject(TranslateService);

  // Use a string FormControl to hold the segmented control value ('light-mode' | 'dark-mode')
  public theme = new FormControl<Theme>('light', { nonNullable: true });

  public currentLang = toSignal(
    this._translate.onLangChange.pipe(
      map(({ lang }) => lang),
      startWith(this._translate.currentLang),
    ),
  );

  public dynamicMenu: Menu[] = [];
  private _destroyRef = inject(DestroyRef);

  private _componentLevelDepth: number | undefined;

  constructor() {
    this._changeTheme('light');

    this.theme.valueChanges
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((value) => {
        this._changeTheme(value);
      });

    this._translate.addLangs([
      'hu',
      'en',
    ]);
    this._translate.setDefaultLang('en');
    const browserLang = this._translate.getBrowserLang();
    this._translate.use(browserLang?.toString().match(/hu|en/) ? browserLang : 'en');

    const graphqlService = inject(GraphqlService);
    graphqlService
      .getNavigation()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((result: ApolloQueryResult<NavigationQueryResult>) => {
        const navTree = result.data.navs?.[0]?.tree || [];
        this._componentLevelDepth = this._findDeepestLevel(navTree);
        this.dynamicMenu = this._mapStatamicNavToMenu(navTree);
      });
  }

  private _findDeepestLevel(tree: readonly StatamicNavNode[], currentDepth = 0): number {
    if (!tree || tree.length === 0) {
      return currentDepth;
    }
    return Math.max(...tree.map((node: StatamicNavNode) => this._findDeepestLevel(node.children ?? [], node.depth)));
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
  }
}

interface StatamicNavNode {
  depth: number;
  page?: { title?: string; id?: string; slug?: string };
  children?: StatamicNavNode[];
}
