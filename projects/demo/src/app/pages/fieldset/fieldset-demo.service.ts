import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsFormFieldVariant, IdsFormFieldVariantType, IDS_FIELDSET_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/forms';

type FieldsetInputControls = {
  size: IdsSizeType;
  variant: IdsFormFieldVariantType;
  legend: string;
};

type FieldsetHelperControls = {
  showMessage: boolean;
};

const defaultConfig = IDS_FIELDSET_DEFAULT_CONFIG_FACTORY();

@Injectable()
export class FieldsetDemoService {
  public readonly inputControlConfig: DemoControlConfig<FieldsetInputControls> = {
    size: {
      description: 'Fieldset size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Fieldset variant.',
      type: 'IdsFormFieldVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsFormFieldVariant),
    },
    legend: {
      description: 'Fieldset legend.',
      type: 'string',
      default: '-',
      demoDefault: 'Personal data',
    },
  };

  public readonly helperControlConfig: DemoControlConfig<FieldsetHelperControls> = {
    showMessage: {
      description: 'Whether to show fieldset message or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
  };

  public defaults = getDefaultFromDemoConfig<FieldsetInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<FieldsetHelperControls>(this.helperControlConfig);

  public model: FieldsetInputControls = { ...this.defaults };
  public helperModel: FieldsetHelperControls = { ...this.helperDefaults };

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
  }
}
