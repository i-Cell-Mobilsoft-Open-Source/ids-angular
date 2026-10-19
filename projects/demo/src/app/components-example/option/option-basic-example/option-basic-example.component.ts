import { OPTION_EXAMPLE_FRUITS } from '../option-example.utils';

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
  selector: 'app-option-basic-example',
  imports: [
    FormsModule,
    IdsFormFieldComponent,
    IdsHintMessageComponent,
    IdsLabelDirective,
    IdsOptionComponent,
    IdsSelectComponent,
    TranslateModule,
  ],
  templateUrl: './option-basic-example.component.html',
})
export class OptionBasicExampleComponent {
  protected readonly _fruits = OPTION_EXAMPLE_FRUITS;

  protected _value: string | null = null;
}
