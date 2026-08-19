import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsCheckboxComponent } from '@i-cell/ids-angular/checkbox';
import { IdsErrorDefinitionDirective, IdsErrorMessageComponent } from '@i-cell/ids-angular/forms';

@Component({
  selector: 'app-checkbox-form-control-name-example',
  imports: [
    IdsButtonComponent,
    IdsCheckboxComponent,
    IdsErrorDefinitionDirective,
    IdsErrorMessageComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './checkbox-form-control-name-example.component.html',
})
export class CheckboxFormControlNameExampleComponent {
  public form = new FormGroup({
    marketing: new FormControl(false),
    accepted: new FormControl(false, { validators: [Validators.requiredTrue] }),
  });

  public onSubmit(): void {
    this.form.controls.accepted.markAsTouched();
  }
}
