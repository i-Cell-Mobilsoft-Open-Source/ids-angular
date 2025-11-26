import { RadioDemoService } from './radio-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-radio-demo-control',
  imports: [
    ControlTableComponent,
    FormsModule,
    TranslateModule,
    TryoutControlComponent,
  ],
  templateUrl: './radio-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './radio-demo.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class RadioDemoControlComponent {
  public radioDemoService = inject(RadioDemoService);
}
