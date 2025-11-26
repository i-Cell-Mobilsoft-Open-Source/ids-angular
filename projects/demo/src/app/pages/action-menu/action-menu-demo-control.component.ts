import { ActionMenuDemoService } from './action-menu-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-action-menu-demo-control',
  imports: [
    TryoutControlComponent,
    ControlTableComponent,
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
