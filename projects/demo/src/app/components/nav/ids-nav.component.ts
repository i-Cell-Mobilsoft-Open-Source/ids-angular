import {
  Component,
  Input,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { mdiChevronDown, mdiChevronUp } from '@mdi/js';
import { TranslateModule } from '@ngx-translate/core';
import { Menu } from './menu.interface';
import { SubnavComponent } from './subnav/ids-subnav.component';
import { IdsIconComponent } from '../../../../../widgets/icon/ids-icon.component';
import publicApi from '@i-cell/widgets/src/public-api';

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
