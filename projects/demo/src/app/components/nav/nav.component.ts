import { Component, Input, input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { mdiChevronDown, mdiChevronRight } from '@mdi/js';
import { TranslateModule } from '@ngx-translate/core';
import { Menu } from './menu.interface';
import { SubnavComponent } from './subnav/subnav.component';

@Component({
  standalone: true,
  selector: 'app-nav',
  imports: [RouterModule, TranslateModule, SubnavComponent],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  public menu = input<Menu[]>([]);
  public open = false;
  public iconClosed = input<string>(mdiChevronDown);
  public iconOpened = input<string>(mdiChevronRight);
}
