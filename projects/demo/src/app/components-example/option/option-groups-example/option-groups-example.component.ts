import { OPTION_EXAMPLE_AQUATIC_ANIMALS, OPTION_EXAMPLE_LAND_ANIMALS } from '../option-example.utils';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IdsFormFieldComponent,
  IdsHintMessageComponent,
  IdsLabelDirective,
  IdsOptionComponent,
  IdsOptionGroupComponent,
} from '@i-cell/ids-angular/forms';
import { IdsSelectComponent } from '@i-cell/ids-angular/select';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-option-groups-example',
  imports: [
    FormsModule,
    IdsFormFieldComponent,
    IdsHintMessageComponent,
    IdsLabelDirective,
    IdsOptionComponent,
    IdsOptionGroupComponent,
    IdsSelectComponent,
    TranslateModule,
  ],
  templateUrl: './option-groups-example.component.html',
})
export class OptionGroupsExampleComponent {
  protected readonly _landAnimals = OPTION_EXAMPLE_LAND_ANIMALS;
  protected readonly _aquaticAnimals = OPTION_EXAMPLE_AQUATIC_ANIMALS;

  protected _value: string | null = null;
}
