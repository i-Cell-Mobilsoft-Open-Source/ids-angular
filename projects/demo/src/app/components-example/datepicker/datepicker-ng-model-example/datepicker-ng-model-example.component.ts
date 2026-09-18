import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsDatepickerDirective, IdsDatepickerTriggerComponent } from '@i-cell/ids-angular/datepicker';
import {
  IdsErrorDefinitionDirective,
  IdsErrorMessageComponent,
  IdsFormFieldComponent,
  IdsInputDirective,
  IdsLabelDirective,
  IdsSuffixDirective,
} from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-datepicker-ng-model-example',
  imports: [
    FormsModule,
    IdsButtonComponent,
    IdsDatepickerDirective,
    IdsDatepickerTriggerComponent,
    IdsErrorDefinitionDirective,
    IdsErrorMessageComponent,
    IdsFormFieldComponent,
    IdsInputDirective,
    IdsLabelDirective,
    IdsSuffixDirective,
    TranslateModule,
  ],
  templateUrl: './datepicker-ng-model-example.component.html',
})
export class DatepickerNgModelExampleComponent {
  public date: Date | null = null;

  public onSubmit(dateField: NgModel): void {
    dateField.control.markAsTouched();
  }
}
