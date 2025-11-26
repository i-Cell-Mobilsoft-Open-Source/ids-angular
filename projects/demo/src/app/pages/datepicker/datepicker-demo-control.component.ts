import { DatepickerDemoService } from './datepicker-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';

import { Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-datepicker-demo-control',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    TryoutControlComponent,
    ControlTableComponent,
  ],
  templateUrl: './datepicker-demo-control.component.html',
  styleUrls: [
    '../demo-page.scss',
    './datepicker-demo.component.scss',
  ],
})
export class DatepickerDemoControlComponent {
  public datepickerDemoService = inject(DatepickerDemoService);
}
