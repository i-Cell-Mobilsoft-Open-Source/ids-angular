import { Component } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import {
  IdsSideNavComponent,
  IdsSideNavItemComponent,
  IdsSideNavSectionComponent,
  IdsSideNavTitleComponent,
} from '@i-cell/ids-angular/side-nav';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-side-nav-nested-example',
  imports: [
    IdsSideNavComponent,
    IdsSideNavSectionComponent,
    IdsSideNavTitleComponent,
    IdsSideNavItemComponent,
    IdsIconComponent,
    TranslateModule,
  ],
  templateUrl: './side-nav-nested-example.component.html',
})
export class SideNavNestedExampleComponent {}
