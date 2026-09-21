import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IdsFieldsetComponent,
  IdsFieldsetRowComponent,
  IdsFormFieldComponent,
  IdsInputDirective,
  IdsLabelDirective,
} from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-fieldset-rows-example',
  imports: [
    IdsFieldsetComponent,
    IdsFieldsetRowComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './fieldset-rows-example.component.html',
})
export class FieldsetRowsExampleComponent {
  public street = '';
  public city = '';
  public zip = '';
}
