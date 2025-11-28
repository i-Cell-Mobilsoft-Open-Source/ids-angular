import { SideNavDemoService } from './side-nav-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsSideNavComponent, IdsSideNavItemComponent, IdsSideNavSectionComponent, IdsSideNavTitleComponent } from '@i-cell/ids-angular/side-nav';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-side-nav-demo',
  imports: [
    IdsIconComponent,
    IdsSideNavComponent,
    IdsSideNavItemComponent,
    IdsSideNavSectionComponent,
    IdsSideNavTitleComponent,
    TranslateModule,
    TryoutComponent,
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
  ],
  templateUrl: './side-nav-demo.component.html',
  styleUrl: './side-nav-demo.component.scss',
})
export class SideNavDemoComponent {
  protected _sideNavDemoService = inject(SideNavDemoService);
}
