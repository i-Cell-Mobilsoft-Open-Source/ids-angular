import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsDatepickerDirective, IdsDatepickerTriggerComponent } from '@i-cell/ids-angular/datepicker';
import {
  IdsErrorDefinitionDirective,
  IdsErrorMessageComponent,
  IdsFormFieldComponent,
  IdsInputDirective,
  IdsHintMessageComponent,
  IdsLabelDirective,
  IdsSuffixDirective,
} from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-datepicker-min-max-example',
  imports: [
    FormsModule,
    IdsDatepickerDirective,
    IdsDatepickerTriggerComponent,
    IdsErrorDefinitionDirective,
    IdsErrorMessageComponent,
    IdsFormFieldComponent,
    IdsHintMessageComponent,
    IdsInputDirective,
    IdsLabelDirective,
    IdsSuffixDirective,
    TranslateModule,
  ],
  templateUrl: './datepicker-min-max-example.component.html',
})
/* eslint-disable no-magic-numbers */
export class DatepickerMinMaxExampleComponent {
  public minDate = new Date(2025, 0, 15);
  public maxDate = new Date(2025, 0, 31);
  public date: Date | null = null;
}
