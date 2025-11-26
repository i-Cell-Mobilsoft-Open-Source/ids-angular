import { CheckboxDemoService } from './checkbox-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
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
    ControlTableComponent,
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
