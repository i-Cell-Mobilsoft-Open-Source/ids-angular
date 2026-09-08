import {
  AUTOCOMPLETE_LIMIT_FRUIT_KEYS,
  filterAutocompleteFruitOptions,
  getAutocompleteFruitLabel,
} from '../autocomplete-example.utils';

import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsDividerComponent } from '@i-cell/ids-angular/divider';
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
  selector: 'app-autocomplete-limit-example',
  imports: [
    FormsModule,
    IdsAutocompleteComponent,
    IdsAutocompleteHintComponent,
    IdsAutocompleteTriggerDirective,
    IdsDividerComponent,
    IdsFormFieldComponent,
    IdsHintMessageComponent,
    IdsLabelDirective,
    IdsOptionComponent,
    TranslateModule,
  ],
  templateUrl: './autocomplete-limit-example.component.html',
})
export class AutocompleteLimitExampleComponent {
  private _translate = inject(TranslateService);

  public readonly limit = 2;
  public readonly options = AUTOCOMPLETE_LIMIT_FRUIT_KEYS;

  public query = '';
  public value: string | null = null;

  public get matchingOptions(): string[] {
    return filterAutocompleteFruitOptions(this._translate, this.options, this.query);
  }

  public get exceedsLimit(): boolean {
    return this.matchingOptions.length >= this.limit;
  }

  public get filteredOptions(): string[] {
    return this.matchingOptions.slice(0, this.limit);
  }

  public getFruitLabel(key: string): string {
    return getAutocompleteFruitLabel(this._translate, key);
  }

  public onInput(event: Event): void {
    this.query = (event.target as HTMLInputElement).value;
  }
}
