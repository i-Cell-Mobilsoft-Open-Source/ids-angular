import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsFormFieldComponent, IdsInputDirective, IdsLabelDirective } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field-input-variants-example',
  imports: [
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './form-field-input-variants-example.component.html',
})
export class FormFieldInputVariantsExampleComponent {
  public surface = '';
  public light = '';
  public disabled = 'Disabled value';
  public readonly = 'Readonly value';
}
