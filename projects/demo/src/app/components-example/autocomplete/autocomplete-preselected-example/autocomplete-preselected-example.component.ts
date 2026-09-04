import {
  AUTOCOMPLETE_BASIC_FRUIT_KEYS,
  filterAutocompleteFruitOptions,
  getAutocompleteFruitLabel,
} from '../autocomplete-example.utils';

import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { delay, of } from 'rxjs';

const ASYNC_OPTIONS_DELAY_MS = 10000;

@Component({
  selector: 'app-autocomplete-preselected-example',
  imports: [
    FormsModule,
    IdsAutocompleteComponent,
    IdsAutocompleteHintComponent,
    IdsAutocompleteTriggerDirective,
    IdsFormFieldComponent,
    IdsHintMessageComponent,
    IdsLabelDirective,
    IdsOptionComponent,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './autocomplete-preselected-example.component.html',
})
export class AutocompletePreselectedExampleComponent implements OnInit {
  private _translate = inject(TranslateService);

  public readonly options = AUTOCOMPLETE_BASIC_FRUIT_KEYS;

  public ngModelQuery = '';
  public formControlQuery = '';
  public asyncNgModelQuery = '';
  public asyncFormControlQuery = '';
  public ngModelValue: string | null = 'APPLE';
  public formControlValue = new FormControl<string | null>('BANANA');
  public asyncNgModelValue: string | null = 'APPLE';
  public asyncFormControlValue = new FormControl<string | null>('BANANA');

  public asyncNgModelOptions = signal<readonly string[]>([]);
  public asyncFormControlOptions = signal<readonly string[]>([]);
  public asyncNgModelLoading = signal(true);
  public asyncFormControlLoading = signal(true);

  public ngOnInit(): void {
    this._loadAsyncOptions(this.asyncNgModelOptions, this.asyncNgModelLoading);
    this._loadAsyncOptions(this.asyncFormControlOptions, this.asyncFormControlLoading);
  }

  public getFruitLabel(key: string): string {
    return getAutocompleteFruitLabel(this._translate, key);
  }

  public filterOptions(query: string): string[] {
    return filterAutocompleteFruitOptions(this._translate, this.options, query);
  }

  public filterAsyncOptions(keys: readonly string[], query: string): string[] {
    return filterAutocompleteFruitOptions(this._translate, keys, query);
  }

  public onNgModelInput(event: Event): void {
    this.ngModelQuery = (event.target as HTMLInputElement).value;
  }

  public onFormControlInput(event: Event): void {
    this.formControlQuery = (event.target as HTMLInputElement).value;
  }

  public onAsyncNgModelInput(event: Event): void {
    this.asyncNgModelQuery = (event.target as HTMLInputElement).value;
  }

  public onAsyncFormControlInput(event: Event): void {
    this.asyncFormControlQuery = (event.target as HTMLInputElement).value;
  }

  private _loadAsyncOptions(optionsSignal: WritableSignal<readonly string[]>, loadingSignal: WritableSignal<boolean>): void {
    of([...AUTOCOMPLETE_BASIC_FRUIT_KEYS])
      .pipe(delay(ASYNC_OPTIONS_DELAY_MS))
      .subscribe((keys) => {
        optionsSignal.set(keys);
        loadingSignal.set(false);
      });
  }
}
