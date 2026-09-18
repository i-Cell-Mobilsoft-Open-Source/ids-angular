import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsDatepickerDirective, IdsDatepickerTriggerComponent } from '@i-cell/ids-angular/datepicker';
import {
  IdsFormFieldComponent,
  IdsInputDirective,
  IdsLabelDirective,
  IdsSuffixDirective,
} from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-datepicker-views-example',
  imports: [
    FormsModule,
    IdsDatepickerDirective,
    IdsDatepickerTriggerComponent,
    IdsFormFieldComponent,
    IdsInputDirective,
    IdsLabelDirective,
    IdsSuffixDirective,
    TranslateModule,
  ],
  templateUrl: './datepicker-views-example.component.html',
})
/* eslint-disable no-magic-numbers */
export class DatepickerViewsExampleComponent {
  public day = new Date(2025, 5, 15);
  public month = new Date(2025, 5, 1);
  public year = new Date(2025, 0, 1);
}
