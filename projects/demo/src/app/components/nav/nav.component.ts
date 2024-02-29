import { Component, Input, ViewEncapsulation, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mdiChevronDown, mdiChevronRight } from '@mdi/js';
import { TranslateModule } from '@ngx-translate/core';
import { Menu } from './menu.interface';
import { SubnavComponent } from './subnav/subnav.component';
import { IdsIconComponent } from '../icon/ids-icon.component';

@Component({
  standalone: true,
  selector: 'ids-nav',
  imports: [RouterModule, TranslateModule, SubnavComponent, IdsIconComponent],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavComponent {
  public menu = input<Menu[]>([]);
  public open = false;
  public iconClosed = input<string>(mdiChevronDown);
  public iconOpened = input<string>(mdiChevronRight);
}
