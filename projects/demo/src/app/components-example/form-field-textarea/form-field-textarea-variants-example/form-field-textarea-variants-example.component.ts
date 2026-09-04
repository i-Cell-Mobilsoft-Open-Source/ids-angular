import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsFormFieldComponent, IdsInputDirective, IdsLabelDirective } from '@i-cell/ids-angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field-textarea-variants-example',
  imports: [
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './form-field-textarea-variants-example.component.html',
})
export class FormFieldTextareaVariantsExampleComponent {
  private _translate = inject(TranslateService);

  public surface = '';
  public light = '';
  public disabled = this._translate.instant('EXAMPLES.FORM_FIELD_TEXTAREA.VARIANTS.CONTENT.VALUE_DISABLED');
  public readonly = this._translate.instant('EXAMPLES.FORM_FIELD_TEXTAREA.VARIANTS.CONTENT.VALUE_READONLY');
}
