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
  selector: 'app-fieldset-sizes-example',
  imports: [
    IdsFieldsetComponent,
    IdsFieldsetRowComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './fieldset-sizes-example.component.html',
})
export class FieldsetSizesExampleComponent {
  public label = '';
}
