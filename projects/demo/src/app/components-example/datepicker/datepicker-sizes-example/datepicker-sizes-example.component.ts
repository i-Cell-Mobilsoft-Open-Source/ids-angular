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
  selector: 'app-datepicker-sizes-example',
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
  templateUrl: './datepicker-sizes-example.component.html',
})
export class DatepickerSizesExampleComponent {
  /* eslint-disable no-magic-numbers */
  public date = new Date(2025, 5, 15);
}
