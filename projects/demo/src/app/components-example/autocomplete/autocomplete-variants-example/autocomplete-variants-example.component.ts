import {
  AUTOCOMPLETE_BASIC_FRUIT_KEYS,
  filterAutocompleteFruitOptions,
  getAutocompleteFruitLabel,
} from '../autocomplete-example.utils';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IdsAutocompleteComponent,
  IdsAutocompleteHintComponent,
  IdsAutocompleteTriggerDirective,
  IdsFormFieldComponent,
  IdsLabelDirective,
  IdsOptionComponent,
} from '@i-cell/ids-angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-autocomplete-variants-example',
  imports: [
    FormsModule,
    IdsAutocompleteComponent,
    IdsAutocompleteHintComponent,
    IdsAutocompleteTriggerDirective,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsOptionComponent,
    TranslateModule,
  ],
  templateUrl: './autocomplete-variants-example.component.html',
})
export class AutocompleteVariantsExampleComponent {
  private _translate = inject(TranslateService);

  public readonly options = AUTOCOMPLETE_BASIC_FRUIT_KEYS;

  public surfaceQuery = '';
  public lightQuery = '';
  public surfaceValue: string | null = null;
  public lightValue: string | null = null;

  public getFruitLabel(key: string): string {
    return getAutocompleteFruitLabel(this._translate, key);
  }

  public filterOptions(query: string): string[] {
    return filterAutocompleteFruitOptions(this._translate, this.options, query);
  }

  public onSurfaceInput(event: Event): void {
    this.surfaceQuery = (event.target as HTMLInputElement).value;
  }

  public onLightInput(event: Event): void {
    this.lightQuery = (event.target as HTMLInputElement).value;
  }
}
