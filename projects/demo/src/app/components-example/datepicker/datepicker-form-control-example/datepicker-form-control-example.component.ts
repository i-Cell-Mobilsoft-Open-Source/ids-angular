import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
  selector: 'app-datepicker-form-control-example',
  imports: [
    ReactiveFormsModule,
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
  templateUrl: './datepicker-form-control-example.component.html',
})
export class DatepickerFormControlExampleComponent {
  public date = new FormControl<Date | null>(null, { validators: [Validators.required] });

  public onSubmit(event: Event): void {
    event.preventDefault();
    this.date.markAsTouched();
  }
}
