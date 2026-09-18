import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsDatepickerDirective, IdsDatepickerTriggerComponent } from '@i-cell/ids-angular/datepicker';
import {
  IdsErrorDefinitionDirective,
  IdsErrorMessageComponent,
  IdsFormFieldComponent,
  IdsHintMessageComponent,
  IdsInputDirective,
  IdsLabelDirective,
  IdsSuffixDirective,
} from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-datepicker-weekend-validator-example',
  imports: [
    ReactiveFormsModule,
    IdsButtonComponent,
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
  templateUrl: './datepicker-weekend-validator-example.component.html',
})
export class DatepickerWeekendValidatorExampleComponent {
  public form = new FormGroup({
    date: new FormControl<Date | null>(null, {
      validators: [
        Validators.required,
        this._datepickerWeekendValidator(),
      ],
    }),
  });

  public onSubmit(event: Event): void {
    event.preventDefault();
    this.form.markAllAsTouched();
  }

  private _datepickerWeekendValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const date = value instanceof Date ? value : new Date(value);
      if (Number.isNaN(date.getTime())) {
        return null;
      }
      const day = date.getDay();

      return day === 1 || day === 2 ? { mondayTuesday: true } : null;
    };
  }

}
