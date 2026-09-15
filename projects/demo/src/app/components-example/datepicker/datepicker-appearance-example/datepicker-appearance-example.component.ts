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
  selector: 'app-datepicker-appearance-example',
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
  templateUrl: './datepicker-appearance-example.component.html',
})
/* eslint-disable no-magic-numbers */
export class DatepickerAppearanceExampleComponent {
  public filled: Date | null = new Date(2025, 5, 15);
  public outlined: Date | null = new Date(2025, 5, 15);
  public elevated: Date | null = new Date(2025, 5, 15);
}
