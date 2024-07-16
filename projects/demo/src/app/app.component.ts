import { NavComponent } from './components/nav/ids-nav.component';
import { Menu } from './components/nav/menu.interface';
import { IdsSwitchComponent } from './components/switch/ids-switch.component';

import { Component, ElementRef, OnInit, ViewEncapsulation, inject, viewChild } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    TranslateModule,
    NavComponent,
    IdsSwitchComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent implements OnInit {
  private _translate: TranslateService = inject(TranslateService);
  public menuConfigs: Menu[] = [
    { name: 'GET_STARTED', children: [] },
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
            { name: 'COMPONENTS.ACTION_PANEL', path: '/components/action-panel' },
            { name: 'COMPONENTS.AVATAR', path: '/components/avatar' },
            { name: 'COMPONENTS.BUTTONS', path: '/components/button' },
            { name: 'COMPONENTS.CARD', path: '/components/card' },
            { name: 'COMPONENTS.DIALOG', path: '/components/dialog' },
            { name: 'COMPONENTS.DIVIDERS', path: '/components/divider' },
            { name: 'COMPONENTS.ICON_BUTTON', path: '/components/icon-button' },
            { name: 'COMPONENTS.PAGINATOR', path: '/components/paginator' },
            { name: 'COMPONENTS.TAG', path: '/components/tag' },
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

  public themeSwitcher = viewChild<ElementRef>('themeSwitcher');

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
    this.themeSwitcher()?.nativeElement.addEventListener('change', (event: Event) => {
      this._changeTheme((event.target as HTMLInputElement)?.checked ? 'dark' : 'light');
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
}
