import { SwitchDemoService } from './switch-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-switch-demo-control',
  imports: [
    TryoutControlComponent,
    TranslateModule,
    FormsModule,
    ControlTableSmallComponent,
  ],
  templateUrl: './switch-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './switch-demo.component.scss',
  ],
})
export class SwitchDemoControlComponent {
  public switchDemoService = inject(SwitchDemoService);
}
