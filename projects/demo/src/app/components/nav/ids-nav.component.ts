import { Component, ViewEncapsulation, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IdsIconComponent } from '@i-cell/widgets/icon';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import { TranslateModule } from '@ngx-translate/core';
import { Menu } from './menu.interface';
import { SubnavComponent } from './subnav/ids-subnav.component';

@Component({
  standalone: true,
  selector: 'ids-nav',
  imports: [RouterModule, TranslateModule, SubnavComponent, IdsIconComponent],
  templateUrl: './ids-nav.component.html',
  styleUrls: ['./ids-nav.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NavComponent {
  public menu = input<Menu[]>([]);
  public open = false;
  public iconClosed = input<string>(mdiChevronDown);
  public iconOpened = input<string>(mdiChevronUp);
}
