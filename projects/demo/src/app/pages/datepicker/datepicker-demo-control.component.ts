import { DatepickerDemoService } from './datepicker-demo.service';

import { ControlTableSmallComponent } from '../../components/control-table/control-table-small/control-table-small.component';
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
    ControlTableSmallComponent,
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
