import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsFormFieldVariant, IdsFormFieldVariantType } from '@i-cell/ids-angular/forms';
import { IDS_AUTOCOMPLETE_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/forms/components/autocomplete/autocomplete-defaults';
import { Subject } from 'rxjs';

const defaultConfig = IDS_AUTOCOMPLETE_DEFAULT_CONFIG_FACTORY();

type AutocompleteInputControls = {
  size: IdsSizeType;
  variant: IdsFormFieldVariantType;
  disabled: boolean;
  required: boolean;
};

type AutocompleteHelperControls = {
  name: string;
  placeholder: string;
  minChars: number;
  maxLength: number;
  ariaLabelClearButton: string;
  ariaLabelToggleButton: string;
  hintLoading: string;
  hintNoResults: string;
  hintMinChars: string;
  hintMaxLength: string;
};

@Injectable()
export class AutocompleteDemoService {
  private _resetSubject = new Subject<void>();
  public reset$ = this._resetSubject.asObservable();

  public readonly inputControlConfig: DemoControlConfig<AutocompleteInputControls> = {
    size: {
      description: 'Size of the auto complete field.',
      type: 'IdsSizeType',
      default: IdsSize.COMPACT,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Variant of the auto complete field.',
      type: 'IdsFormFieldVariantType',
      default: IdsFormFieldVariant.SURFACE,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsFormFieldVariant),
    },
    disabled: {
      description: 'Whether the field is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    required: {
      description: 'Whether the field is required or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly helperControlConfig: DemoControlConfig<AutocompleteHelperControls> = {
    name: {
      description: 'Name of the field',
      type: 'string',
      default: 'Autocomplete field',
    },
    placeholder: {
      description: 'Placeholder text for the autocomplete input',
      type: 'string',
      default: 'Type to search...',
    },
    minChars: {
      description: 'Minimum number of characters before autocomplete activates',
      type: 'number',
      default: defaultConfig.minChars,
    },
    maxLength: {
      description: 'Maximum length of the options is shown',
      type: 'number',
      default: 10,
    },
    ariaLabelClearButton: {
      description: 'Aria label for the clear button',
      type: 'string',
      default: 'Clear',
    },
    ariaLabelToggleButton: {
      description: 'Aria label for the toggle button',
      type: 'string',
      default: 'Toggle',
    },
    hintLoading: {
      description: 'Hint text displayed while loading options.',
      type: 'string',
      default: defaultConfig.hintLoading,
    },
    hintNoResults: {
      description: 'Hint text displayed when no results are found.',
      type: 'string',
      default: defaultConfig.hintNoResults,
    },
    hintMinChars: {
      description: 'Hint text displayed when minimum number of characters before autocomplete activates is not met.',
      type: 'string',
      default: defaultConfig.hintMinChars,
    },
    hintMaxLength: {
      description: 'Hint text displayed when maximum length of the options is exceeded.',
      type: 'string',
      default: defaultConfig.hintMaxLength,
    },
  };

  public defaults = getDefaultFromDemoConfig<AutocompleteInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<AutocompleteHelperControls>(this.helperControlConfig);

  public model: AutocompleteInputControls = { ...this.defaults };
  public helperModel: AutocompleteHelperControls = { ...this.helperDefaults };

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
    this._resetSubject.next();
  }

  public getApiConfig(): DemoControlConfig<unknown>[] {
    return [
      this.inputControlConfig,
      this.helperControlConfig,
    ];
  }
}
