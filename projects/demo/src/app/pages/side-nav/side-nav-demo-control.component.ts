import { SideNavDemoService } from './side-nav-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-side-nav-demo-control',
  imports: [
    TranslateModule,
    ControlTableComponent,
    TryoutControlComponent,
  ],
  templateUrl: './side-nav-demo-control.component.html',
  styleUrl: './side-nav-demo.component.scss',
})
export class SideNavDemoControlComponent {
  protected _sideNavDemoService = inject(SideNavDemoService);
}
