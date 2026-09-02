import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsFormFieldActionDirective, IdsFormFieldComponent, IdsInputDirective, IdsLabelDirective, IdsPrefixDirective, IdsSuffixDirective } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field-input-adornments-example',
  imports: [
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    IdsPrefixDirective,
    IdsSuffixDirective,
    IdsFormFieldActionDirective,
    IdsIconComponent,
    IdsIconButtonComponent,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './form-field-input-adornments-example.component.html',
})
export class FormFieldInputAdornmentsExampleComponent {
  public input = '';
}
