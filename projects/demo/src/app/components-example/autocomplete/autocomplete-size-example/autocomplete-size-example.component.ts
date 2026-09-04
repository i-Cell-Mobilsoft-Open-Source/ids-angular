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
  selector: 'app-autocomplete-size-example',
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
  templateUrl: './autocomplete-size-example.component.html',
})
export class AutocompleteSizeExampleComponent {
  private _translate = inject(TranslateService);

  public readonly options = AUTOCOMPLETE_BASIC_FRUIT_KEYS;

  public queries = {
    dense: '',
    compact: '',
    comfortable: '',
    spacious: '',
  };

  public values: {
    dense: string | null
    compact: string | null
    comfortable: string | null
    spacious: string | null
  } = {
    dense: null,
    compact: null,
    comfortable: null,
    spacious: null,
  };

  public getFruitLabel(key: string): string {
    return getAutocompleteFruitLabel(this._translate, key);
  }

  public filterOptions(query: string): string[] {
    return filterAutocompleteFruitOptions(this._translate, this.options, query);
  }

  public onInput(size: keyof AutocompleteSizeExampleComponent['queries'], event: Event): void {
    this.queries[size] = (event.target as HTMLInputElement).value;
  }
}
