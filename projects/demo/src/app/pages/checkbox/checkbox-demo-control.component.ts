import { CheckboxDemoService } from './checkbox-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkbox-demo-control',
  imports: [
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    TryoutControlComponent,
    ControlTableSmallComponent,
  ],
  templateUrl: './checkbox-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './checkbox-demo.component.scss',
  ],
})
export class CheckboxDemoControlComponent {
  public checkboxDemoService = inject(CheckboxDemoService);
}
