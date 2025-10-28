import { ActionMenuDemoService } from './action-menu-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-action-menu-demo-control',
  imports: [
    TryoutControlComponent,
    ControlTableSmallComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './action-menu-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './action-menu-demo.component.scss',
  ],
})
export class ActionMenuDemoControlComponent {
  public demoService = inject(ActionMenuDemoService);
}
