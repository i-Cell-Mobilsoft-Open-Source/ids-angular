import {
  AUTOCOMPLETE_EXTENDED_FRUIT_KEYS,
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
  IdsHintMessageComponent,
  IdsLabelDirective,
  IdsOptionComponent,
} from '@i-cell/ids-angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-autocomplete-min-chars-example',
  imports: [
    FormsModule,
    IdsAutocompleteComponent,
    IdsAutocompleteHintComponent,
    IdsAutocompleteTriggerDirective,
    IdsFormFieldComponent,
    IdsHintMessageComponent,
    IdsLabelDirective,
    IdsOptionComponent,
    TranslateModule,
  ],
  templateUrl: './autocomplete-min-chars-example.component.html',
})
export class AutocompleteMinCharsExampleComponent {
  private _translate = inject(TranslateService);

  public readonly minChars = 2;
  public readonly options = AUTOCOMPLETE_EXTENDED_FRUIT_KEYS;

  public query = '';
  public value: string | null = null;

  public get canSearch(): boolean {
    return this.query.length >= this.minChars;
  }

  public getFruitLabel(key: string): string {
    return getAutocompleteFruitLabel(this._translate, key);
  }

  public get filteredOptions(): string[] {
    return filterAutocompleteFruitOptions(this._translate, this.options, this.query);
  }

  public onInput(event: Event): void {
    this.query = (event.target as HTMLInputElement).value;
  }
}
