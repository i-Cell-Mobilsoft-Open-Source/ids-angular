import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import {
  IdsSideNavComponent,
  IdsSideNavItemComponent,
  IdsSideNavSectionComponent,
  IdsSideNavTitleComponent,
} from '@i-cell/ids-angular/side-nav';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-side-nav-active-indicator-example',
  imports: [
    IdsSideNavComponent,
    IdsSideNavSectionComponent,
    IdsSideNavTitleComponent,
    IdsSideNavItemComponent,
    IdsIconComponent,
    TranslateModule,
  ],
  templateUrl: './side-nav-active-indicator-example.component.html',
})
export class SideNavActiveIndicatorExampleComponent {
  protected readonly _currentUrl = inject(Router).url.replace(/^\//, '');
}
