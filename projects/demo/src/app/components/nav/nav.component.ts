import { Menu } from './menu.interface';
import { SubnavComponent } from './subnav/subnav.component';

import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ids-nav',
  imports: [
    RouterModule,
    TranslateModule,
    SubnavComponent,
    IdsIconComponent,
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  public menu = input<Menu[]>([]);
  public open = false;
}
