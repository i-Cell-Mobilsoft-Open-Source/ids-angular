import { Menu } from './menu.interface';

import { CdkMenuModule } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { IsActiveMatchOptions, RouterModule } from '@angular/router';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import {
  IdsSideNavComponent,
  IdsSideNavSectionComponent,
  IdsSideNavTitleComponent,
  IdsSideNavItemComponent,
} from '@i-cell/ids-angular/side-nav';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ids-nav',
  imports: [
    RouterModule,
    TranslateModule,
    IdsIconComponent,
    IdsSideNavComponent,
    IdsSideNavSectionComponent,
    IdsSideNavTitleComponent,
    IdsSideNavItemComponent,
    CdkMenuModule,
  ],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavComponent {
  public menu = input<Menu[]>([]);
  public open = false;

  public subsetMatchOptions: IsActiveMatchOptions = {
    paths: 'subset',
    queryParams: 'exact',
    fragment: 'ignored',
    matrixParams: 'ignored',
  };
}
