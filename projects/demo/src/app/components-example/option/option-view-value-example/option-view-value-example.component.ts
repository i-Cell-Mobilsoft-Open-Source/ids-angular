import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IdsFormFieldComponent,
  IdsHintMessageComponent,
  IdsLabelDirective,
  IdsOptionComponent,
} from '@i-cell/ids-angular/forms';
import { IdsSelectComponent } from '@i-cell/ids-angular/select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-option-view-value-example',
  imports: [
    FormsModule,
    IdsFormFieldComponent,
    IdsHintMessageComponent,
    IdsLabelDirective,
    IdsOptionComponent,
    IdsSelectComponent,
    TranslateModule,
  ],
  templateUrl: './option-view-value-example.component.html',
})
export class OptionViewValueExampleComponent {
  protected _value: string | null = 'BANANA';
}
