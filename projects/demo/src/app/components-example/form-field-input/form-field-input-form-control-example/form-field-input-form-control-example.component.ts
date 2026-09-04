import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsErrorDefinitionDirective, IdsErrorMessageComponent, IdsFormFieldComponent, IdsInputDirective, IdsLabelDirective } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field-input-form-control-example',
  imports: [
    ReactiveFormsModule,
    IdsButtonComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    IdsErrorMessageComponent,
    IdsErrorDefinitionDirective,
    TranslateModule,
  ],
  templateUrl: './form-field-input-form-control-example.component.html',
})
export class FormFieldInputFormControlExampleComponent {
  public name = new FormControl('');

  public toggleRequired(): void {
    if (this.name.hasValidator(Validators.required)) {
      this.name.removeValidators(Validators.required);
    } else {
      this.name.addValidators(Validators.required);
    }
    this.name.updateValueAndValidity();
  }

  public onSubmit(event: Event): void {
    event.preventDefault();
    this.name.markAsTouched();
  }
}
