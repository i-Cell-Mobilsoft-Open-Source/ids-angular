import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsCheckboxComponent } from '@i-cell/ids-angular/checkbox';
import { IdsErrorDefinitionDirective, IdsErrorMessageComponent } from '@i-cell/ids-angular/forms';

@Component({
  selector: 'app-checkbox-form-control-example',
  imports: [
    IdsButtonComponent,
    IdsCheckboxComponent,
    IdsErrorDefinitionDirective,
    IdsErrorMessageComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './checkbox-form-control-example.component.html',
})
export class CheckboxFormControlExampleComponent {
  public marketing = new FormControl(false);
  public accepted = new FormControl(false, { validators: [Validators.requiredTrue] });

  public onSubmit(event: Event): void {
    event.preventDefault();
    this.accepted.markAsTouched();
  }
}
