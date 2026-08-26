import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsCheckboxComponent, IdsCheckboxGroupComponent } from '@i-cell/ids-angular/checkbox';
import { IdsErrorDefinitionDirective, IdsErrorMessageComponent, IdsHintMessageComponent } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-checkbox-group-custom-validator-example',
  imports: [
    IdsButtonComponent,
    IdsCheckboxComponent,
    IdsCheckboxGroupComponent,
    IdsErrorDefinitionDirective,
    IdsErrorMessageComponent,
    IdsHintMessageComponent,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './checkbox-group-custom-validator-example.component.html',
})
export class CheckboxGroupCustomValidatorExampleComponent {
  public form = new FormGroup({
    toppings: new FormGroup(
      {
        cheese: new FormControl(false),
        ham: new FormControl(false),
        corn: new FormControl(false),
        mushrooms: new FormControl(false),
      },
      { validators: [this._minimumSelected(2)] },
    ),
  });

  public onSubmit(): void {
    this.form.controls.toppings.markAsTouched();
  }

  private _minimumSelected(min: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      const count = Object.values(group.controls)
        .filter((ctrl) => ctrl.value === true).length;
      return count >= min ? null : { minimumCountSelected: true };
    };
  }
}
