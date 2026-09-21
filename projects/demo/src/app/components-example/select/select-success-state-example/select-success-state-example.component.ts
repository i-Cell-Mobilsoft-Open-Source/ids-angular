import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  IdsErrorDefinitionDirective,
  IdsErrorMessageComponent,
  IdsFormFieldComponent,
  IdsHintMessageComponent,
  IdsLabelDirective,
  IdsOptionComponent,
  IdsSuccessMessageComponent,
} from '@i-cell/ids-angular/forms';
import { IdsSelectComponent } from '@i-cell/ids-angular/select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-select-success-state-example',
  imports: [
    ReactiveFormsModule,
    IdsButtonComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsSelectComponent,
    IdsOptionComponent,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
    IdsErrorDefinitionDirective,
    IdsSuccessMessageComponent,
    TranslateModule,
  ],
  templateUrl: './select-success-state-example.component.html',
})
export class SelectSuccessStateExampleComponent {
  public readonly form = new FormGroup({
    fruit: new FormControl<string | null>(null, {
      validators: [
        Validators.required,
        this._cherryNotAllowedValidator(),
      ],
    }),
  });

  public onSubmit(): void {
    this.form.markAllAsTouched();
  }

  private _cherryNotAllowedValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value === 'CHERRY') {
        return { cherryNotAllowed: true };
      } else {
        return null;
      }
    };
  }
}
