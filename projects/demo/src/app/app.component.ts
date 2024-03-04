import { Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Menu } from './components/nav/menu.interface';
import { NavComponent } from './components/nav/nav.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, TranslateModule, NavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  private translate: TranslateService = inject(TranslateService);
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
            { name: 'COMPONENTS.AVATAR', path: '/components/avatar' },
            { name: 'COMPONENTS.BUTTONS', path: '/components/buttons' },
            { name: 'COMPONENTS.DIVIDERS', path: '/components/dividers' },
            { name: 'COMPONENTS.ICON_BUTTON', path: '/components/icon-button' },
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

  constructor() {
    this.translate.addLangs(['hu', 'en']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    this.translate.use(
      browserLang?.toString().match(/hu|en/) ? browserLang : 'en'
    );
  }
}
