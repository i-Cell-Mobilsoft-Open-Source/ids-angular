import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSizeType, IdsSize } from '@i-cell/ids-angular/core';
import { IdsFormFieldVariant, IdsFormFieldVariantType } from '@i-cell/ids-angular/forms';

export type OptionSelectControls = {
  size: IdsSizeType;
  variant: IdsFormFieldVariantType;
};

export type SampleOptionControls = {
  hasDisabledElement: boolean;

};

export type MultipleOptionControls = {
  hasDisabledElement: boolean;
};

type SampleOption = {
  value: string
  viewValue: string
};

type AnimalOptions = {
  land: SampleOption[]
  aquatic: SampleOption[]
};

@Injectable({ providedIn: 'root' })
export class OptionDemoService {

  public readonly selectControlConfig: DemoControlConfig<OptionSelectControls> = {
    size: {
      description: 'Size of the form field.',
      type: 'IdsSizeType',
      default: IdsSize.COMPACT,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Variant of the form field.',
      type: 'IdsFormFieldVariantType',
      default: IdsFormFieldVariant.SURFACE,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsFormFieldVariant),
    },
  };

  public readonly sampleInputControlConfig: DemoControlConfig<SampleOptionControls> = {
    hasDisabledElement: {
      description: 'Whether there is an option that is disabled.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },

  };

  public readonly multipleInputControlConfig: DemoControlConfig<MultipleOptionControls> = {
    hasDisabledElement: {
      description: 'Whether there is an option that is disabled in multiple selection.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public selectDefaults = getDefaultFromDemoConfig<OptionSelectControls>(this.selectControlConfig);
  public defaults = getDefaultFromDemoConfig<SampleOptionControls>(this.sampleInputControlConfig);
  public groupDefaults = getDefaultFromDemoConfig<MultipleOptionControls>(this.multipleInputControlConfig);

  public selectModel: OptionSelectControls = { ...this.selectDefaults };
  public sampleOptionModel: SampleOptionControls = { ...this.defaults };
  public multipleSelectionModel: MultipleOptionControls = { ...this.groupDefaults };
  public reset(): void {
    this.selectModel = { ...this.selectDefaults };
    this.sampleOptionModel = { ...this.defaults };
    this.multipleSelectionModel = { ...this.groupDefaults };
  }

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

  public selectedValue: string | null = null;

  public multiSelectionValue: string[] = [
    this.animals.land[0].value,
    this.animals.land[2].value,
    this.animals.aquatic[1].value,
  ];
}
