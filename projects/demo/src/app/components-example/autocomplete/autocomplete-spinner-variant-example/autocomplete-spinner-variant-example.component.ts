import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  IdsAutocompleteComponent,
  IdsAutocompleteHintComponent,
  IdsAutocompleteTriggerDirective,
  IdsFormFieldComponent,
  IdsLabelDirective,
} from '@i-cell/ids-angular/forms';
import { IdsSpinnerVariantType } from '@i-cell/ids-angular/spinner';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-autocomplete-spinner-variant-example',
  imports: [
    FormsModule,
    IdsAutocompleteComponent,
    IdsAutocompleteHintComponent,
    IdsAutocompleteTriggerDirective,
    IdsFormFieldComponent,
    IdsLabelDirective,
    TranslateModule,
  ],
  templateUrl: './autocomplete-spinner-variant-example.component.html',
})
export class AutocompleteSpinnerVariantExampleComponent {
  public readonly spinnerVariants: IdsSpinnerVariantType[] = [
    'surface',
    'primary',
    'secondary',
    'brand',
    'success',
    'warning',
    'error',
    'light',
  ];

  public values: Record<string, string | null> = {
    surface: null,
    primary: null,
    secondary: null,
    brand: null,
    success: null,
    warning: null,
    error: null,
    light: null,
  };
}
