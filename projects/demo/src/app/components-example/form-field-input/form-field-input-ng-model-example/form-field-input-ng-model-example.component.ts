import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsErrorDefinitionDirective, IdsErrorMessageComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsInputDirective, IdsLabelDirective } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field-input-ng-model-example',
  imports: [
    FormsModule,
    IdsButtonComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
    IdsErrorDefinitionDirective,
    TranslateModule,
  ],
  templateUrl: './form-field-input-ng-model-example.component.html',
})
export class FormFieldInputNgModelExampleComponent {
  public name = '';

  public onSubmit(nameField: NgModel): void {
    nameField.control.markAsTouched();
  }
}
