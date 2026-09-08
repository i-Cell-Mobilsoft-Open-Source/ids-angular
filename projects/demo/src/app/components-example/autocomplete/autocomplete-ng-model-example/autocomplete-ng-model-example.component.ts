import {
  AUTOCOMPLETE_BASIC_FRUIT_KEYS,
  filterAutocompleteFruitOptions,
  getAutocompleteFruitLabel,
} from '../autocomplete-example.utils';

import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  IdsAutocompleteComponent,
  IdsAutocompleteHintComponent,
  IdsAutocompleteTriggerDirective,
  IdsErrorDefinitionDirective,
  IdsErrorMessageComponent,
  IdsFormFieldComponent,
  IdsHintMessageComponent,
  IdsLabelDirective,
  IdsOptionComponent,
} from '@i-cell/ids-angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-autocomplete-ng-model-example',
  imports: [
    FormsModule,
    IdsAutocompleteComponent,
    IdsAutocompleteHintComponent,
    IdsAutocompleteTriggerDirective,
    IdsButtonComponent,
    IdsErrorDefinitionDirective,
    IdsErrorMessageComponent,
    IdsFormFieldComponent,
    IdsHintMessageComponent,
    IdsLabelDirective,
    IdsOptionComponent,
    TranslateModule,
  ],
  templateUrl: './autocomplete-ng-model-example.component.html',
})
export class AutocompleteNgModelExampleComponent {
  private _translate = inject(TranslateService);

  public readonly options = AUTOCOMPLETE_BASIC_FRUIT_KEYS;

  public query = '';
  public value: string | null = null;

  public getFruitLabel(key: string): string {
    return getAutocompleteFruitLabel(this._translate, key);
  }

  public filterOptions(query: string): string[] {
    return filterAutocompleteFruitOptions(this._translate, this.options, query);
  }

  public onInput(event: Event): void {
    this.query = (event.target as HTMLInputElement).value;
  }

  public onSubmit(fruitModel: NgModel): void {
    fruitModel.control.markAsTouched();
  }
}
