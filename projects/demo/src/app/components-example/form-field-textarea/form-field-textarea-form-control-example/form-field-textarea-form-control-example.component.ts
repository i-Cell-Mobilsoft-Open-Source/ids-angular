import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IdsFormFieldComponent, IdsHintMessageComponent, IdsInputDirective, IdsLabelDirective } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field-textarea-form-control-example',
  imports: [
    ReactiveFormsModule,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    IdsHintMessageComponent,
    TranslateModule,
  ],
  templateUrl: './form-field-textarea-form-control-example.component.html',
})
export class FormFieldTextareaFormControlExampleComponent {
  public description = new FormControl('');
}
