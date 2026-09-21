import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IdsFieldsetComponent,
  IdsFieldsetMessageDirective,
  IdsFieldsetRowComponent,
  IdsFormFieldComponent,
  IdsHintMessageComponent,
  IdsInputDirective,
  IdsLabelDirective,
} from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-fieldset-message-example',
  imports: [
    IdsFieldsetComponent,
    IdsFieldsetMessageDirective,
    IdsFieldsetRowComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    IdsHintMessageComponent,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './fieldset-message-example.component.html',
})
export class FieldsetMessageExampleComponent {
  public phone = '';
}
