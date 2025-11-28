import { SwitchDemoService } from './switch-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsSwitchComponent, IdsSwitchGroupComponent } from '@i-cell/ids-angular/switch';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-switch-demo',
  imports: [
    TryoutComponent,
    IdsSwitchComponent,
    IdsSwitchGroupComponent,
    TranslateModule,
    FormsModule,
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
  ],
  templateUrl: './switch-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './switch-demo.component.scss',
  ],
})
export class SwitchDemoComponent {
  protected _switchDemoService = inject(SwitchDemoService);
}
