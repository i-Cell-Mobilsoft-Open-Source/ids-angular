import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  IdsErrorDefinitionDirective,
  IdsErrorMessageComponent,
  IdsFormFieldComponent,
  IdsHintMessageComponent,
  IdsInputDirective,
  IdsLabelDirective,
} from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-message-validation-example',
  imports: [
    FormsModule,
    IdsButtonComponent,
    IdsErrorDefinitionDirective,
    IdsErrorMessageComponent,
    IdsFormFieldComponent,
    IdsHintMessageComponent,
    IdsInputDirective,
    IdsLabelDirective,
    TranslateModule,
  ],
  templateUrl: './message-validation-example.component.html',
})
export class MessageValidationExampleComponent {
  protected _email = '';

  protected _onSubmit(field: NgModel): void {
    field.control.markAllAsTouched();
  }
}
