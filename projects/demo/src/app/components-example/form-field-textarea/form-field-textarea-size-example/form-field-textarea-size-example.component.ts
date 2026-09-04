import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { IdsFormFieldComponent, IdsInputDirective, IdsLabelDirective } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-form-field-textarea-size-example',
  imports: [
    ReactiveFormsModule,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    TranslateModule,
  ],
  templateUrl: './form-field-textarea-size-example.component.html',
})
export class FormFieldTextareaSizeExampleComponent {
  public dense = new FormControl('');
  public compact = new FormControl('');
  public comfortable = new FormControl('');
  public spacious = new FormControl('');
}
