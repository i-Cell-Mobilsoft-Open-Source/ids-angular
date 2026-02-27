import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY, IdsFormFieldVariant, IdsFormFieldVariantType } from '@i-cell/ids-angular/forms';
import { IDS_SELECT_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/select';

const formFieldDefaultConfig = IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY();

const selectDefaultConfig = IDS_SELECT_DEFAULT_CONFIG_FACTORY();

type FormFieldInputControls = {
  size: IdsSizeType,
  variant: IdsFormFieldVariantType,
};

type SelectInputControls = {
  placeholder: string,
  required: boolean,
  disabled: boolean,
  readonly: boolean,
  'aria-label': string,
  'aria-labelledby': string,
  typeaheadDebounceInterval: number,
  canHandleSuccessState: boolean,
};

type SelectHelperControls = {
  useCustomTrigger: boolean,
};

type SampleOption = {
  value: string
  viewValue: string
};

type AnimalOptions = {
  land: SampleOption[]
  aquatic: SampleOption[]
};
@Injectable()
export class SelectDemoService {
  public readonly formFieldInputControlConfig: DemoControlConfig<FormFieldInputControls> = {
    size: {
      description: 'Form field size.',
      type: 'IdsSizeType',
      default: formFieldDefaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Form field variant.',
      type: 'IdsFormFieldVariantType',
      default: formFieldDefaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsFormFieldVariant),
    },
  };

  public readonly selectInputControlConfig: DemoControlConfig<SelectInputControls> = {
    placeholder: {
      description: 'Select placeholder.',
      type: 'string',
      default: '-',
      demoDefault: 'Select animal',
    },
    required: {
      description: 'Whether the select is required or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    disabled: {
      description: 'Whether the select is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    readonly: {
      description: 'Whether the select is readonly or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    'aria-label': {
      description: 'aria-label tag for the select.',
      type: 'string',
      default: '-',
      demoDefault: 'animal',
    },
    'aria-labelledby': {
      description: 'aria-labelledby tag for select.',
      type: 'string',
      default: '-',
      demoDefault: 'animal',
    },
    typeaheadDebounceInterval: {
      description: 'Number in millisec. Can not overwrite at runtime.',
      type: 'number',
      default: selectDefaultConfig.typeaheadDebounceInterval,
      min: 0,
      step: 100,
      disabled: true,
    },
    canHandleSuccessState: {
      description: 'Whether the select can handle success state with a success state matcher.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly selectHelperControlConfig: DemoControlConfig<SelectHelperControls> = {
    useCustomTrigger: {
      description: 'Whether the select has a custom trigger or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public formFieldDefaults = getDefaultFromDemoConfig<FormFieldInputControls>(this.formFieldInputControlConfig);
  public selectDefaults = getDefaultFromDemoConfig<SelectInputControls>(this.selectInputControlConfig);
  public selectHelperDefaults = getDefaultFromDemoConfig<SelectHelperControls>(this.selectHelperControlConfig);

  public formFieldModel: FormFieldInputControls = { ...this.formFieldDefaults };
  public selectModel: SelectInputControls = { ...this.selectDefaults };
  public selectHelperModel: SelectHelperControls = { ...this.selectHelperDefaults };

  public animals: AnimalOptions = {
    land: [
      { viewValue: 'Dog', value: 'dog' },
      { viewValue: 'Cat', value: 'cat' },
      { viewValue: 'Giraffe', value: 'giraffe' },
      { viewValue: 'Orangutan', value: 'orangutan' },
      { viewValue: 'Mammoth', value: 'mammoth' },
      { viewValue: 'Opisthocoelicaudia Skarzynski', value: 'opisthocoelicaudia skarzynski' },
    ],
    aquatic: [
      { viewValue: 'Crocodile', value: 'crocodile' },
      { viewValue: 'Whale', value: 'whale' },
      { viewValue: 'Dolphin', value: 'doplhin' },
      { viewValue: 'Shark', value: 'shark' },
    ],
  };

  public singleSelectionValue: string | null = null;
  public multiSelectionValue: string[] = [
    this.animals.land[0].value,
    this.animals.land[2].value,
    this.animals.aquatic[1].value,
  ];

  public reset(): void {
    this.formFieldModel = { ...this.formFieldDefaults };
    this.selectModel = { ...this.selectDefaults };
    this.selectHelperModel = { ...this.selectHelperDefaults };

    this.singleSelectionValue = null;
    this.multiSelectionValue = [
      this.animals.land[0].value,
      this.animals.land[2].value,
      this.animals.aquatic[1].value,
    ];
  }

  public getApiConfig(): DemoControlConfig<unknown>[] {
    return [
      this.formFieldInputControlConfig,
      this.selectInputControlConfig,
      this.selectHelperControlConfig,
    ];
  }
}
