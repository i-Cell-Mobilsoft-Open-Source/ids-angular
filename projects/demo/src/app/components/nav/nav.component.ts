import { Menu } from './menu.interface';
import { SubnavComponent } from './subnav/subnav.component';

import { Component, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  standalone: true,
  selector: 'ids-nav',
  imports: [
    RouterModule,
    TranslateModule,
    SubnavComponent,
    IdsIconComponent,
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  public menu = input<Menu[]>([]);
  public open = false;
  public iconClosed = input<string>(mdiChevronDown);
  public iconOpened = input<string>(mdiChevronUp);
}
