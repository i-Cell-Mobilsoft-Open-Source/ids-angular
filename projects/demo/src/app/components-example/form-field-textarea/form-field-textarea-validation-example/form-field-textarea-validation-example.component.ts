import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsErrorDefinitionDirective, IdsErrorMessageComponent, IdsFormFieldComponent, IdsInputDirective, IdsLabelDirective } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field-textarea-validation-example',
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
  templateUrl: './form-field-textarea-validation-example.component.html',
})
export class FormFieldTextareaValidationExampleComponent {
  public comment = new FormControl('', {
    validators: [
      Validators.required,
      /*eslint no-magic-numbers: ["error", { "ignore": [10] }]*/
      Validators.minLength(10),
      Validators.pattern(/^[a-zA-Z\s]+$/),
    ],
  });

  public onSubmit(event: Event): void {
    event.preventDefault();
    this.comment.markAsTouched();
  }
}
