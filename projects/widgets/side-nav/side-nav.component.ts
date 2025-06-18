import { Menu } from './menu.interface';
import { SubnavComponent } from './subnav/subnav.component';

import { IdsIconComponent } from '../icon';
import { IdsIconButtonComponent } from '../icon-button';

import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ids-side-nav',
  imports: [
    RouterModule,
    TranslateModule,
    IdsIconButtonComponent,
    IdsIconComponent,
    SubnavComponent,
  ],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsSideNavComponent {
  public hasDarkBackground = input<boolean>(false);
  public leadingIcon = input<string | undefined>();
  public trailingIcon = input<string | undefined>();
  public menu = input<Menu[]>([]);
  public open = false;
}
