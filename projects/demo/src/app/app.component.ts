import { Menu } from './components/nav/menu.interface';
import { NavComponent } from './components/nav/nav.component';

import { CdkScrollable } from '@angular/cdk/scrolling';
import { Component, OnDestroy, OnInit, ViewEncapsulation, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
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
  private _translate: TranslateService = inject(TranslateService);

  private _subscription = new Subscription();

  public menuConfigs: Menu[] = [
    {
      name: 'GET_STARTED', children: [{ name: 'Home', path: '/index' }] },
    {
      name: 'DESIGN_DEVELOP',
      children: [
        { name: 'DESIGN_DEVELOP_MENU.DESIGN_TOKENS', path: '/design-tokens' },
        { name: 'DESIGN_DEVELOP_MENU.FOUNDATION', path: '/foundation' },
        {
          name: 'DESIGN_DEVELOP_MENU.COMPONENTS',
          path: '/components',
          children: [
            { name: 'COMPONENTS.ACCORDION', path: '/components/accordion' },
            { name: 'COMPONENTS.ACTION_MENU', path: '/components/action-menu' },
            { name: 'COMPONENTS.AVATAR', path: '/components/avatar' },
            { name: 'COMPONENTS.BUTTON', path: '/components/button' },
            { name: 'COMPONENTS.CARD', path: '/components/card' },
            { name: 'COMPONENTS.CHECKBOX', path: '/components/checkbox' },
            { name: 'COMPONENTS.CHIP', path: '/components/chip' },
            { name: 'COMPONENTS.DIALOG', path: '/components/dialog' },
            { name: 'COMPONENTS.DIVIDER', path: '/components/divider' },
            { name: 'COMPONENTS.FIELDSET', path: '/components/fieldset' },
            { name: 'COMPONENTS.FORM_FIELD', path: '/components/form-field' },
            { name: 'COMPONENTS.ICON', path: '/components/icon' },
            { name: 'COMPONENTS.ICON_BUTTON', path: '/components/icon-button' },
            { name: 'COMPONENTS.MENU_ITEM', path: '/components/menu-item' },
            { name: 'COMPONENTS.NOTIFICATION', path: '/components/notification' },
            { name: 'COMPONENTS.OVERLAY_PANEL', path: '/components/overlay-panel' },
            { name: 'COMPONENTS.PAGINATOR', path: '/components/paginator' },
            { name: 'COMPONENTS.RADIO', path: '/components/radio' },
            { name: 'COMPONENTS.SCROLLBAR', path: '/components/scrollbar' },
            { name: 'COMPONENTS.SEGMENTED_CONTROL', path: '/components/segmented-control' },
            { name: 'COMPONENTS.SEGMENTED_CONTROL_TOGGLE', path: '/components/segmented-control-toggle' },
            { name: 'COMPONENTS.SELECT', path: '/components/select' },
            { name: 'COMPONENTS.SNACKBAR', path: '/components/snackbar' },
            { name: 'COMPONENTS.SPINNER', path: '/components/spinner' },
            { name: 'COMPONENTS.SWITCH', path: '/components/switch' },
            { name: 'COMPONENTS.TAB', path: '/components/tab' },
            { name: 'COMPONENTS.TABLE', path: '/components/table' },
            { name: 'COMPONENTS.TAG', path: '/components/tag' },
            { name: 'COMPONENTS.TOOLTIP', path: '/components/tooltip' },
          ],
        },
        {
          name: 'DESIGN_DEVELOP_MENU.PATTERNS',
          path: '/patterns',
        },
      ],
    },
    { name: 'RESOURCES', children: [] },
  ];

  public darkMode = new FormControl<boolean>(false);

  public currentLang = toSignal(this._translate.onLangChange.pipe(map(({ lang }) => lang), startWith(this._translate.currentLang)));

  constructor() {
    this._changeTheme('light');
    this._translate.addLangs([
      'hu',
      'en',
    ]);
    this._translate.setDefaultLang('en');
    const browserLang = this._translate.getBrowserLang();
    this._translate.use(browserLang?.toString().match(/hu|en/) ? browserLang : 'en');
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
