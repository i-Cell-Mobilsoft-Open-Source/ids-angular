import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsOrientation, IdsOrientationType, IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_DIVIDER_DEFAULT_CONFIG_FACTORY, IdsDividerVariant, IdsDividerVariantType } from '@i-cell/ids-angular/divider';

const defaultConfig = IDS_DIVIDER_DEFAULT_CONFIG_FACTORY();

type DividerInputControls = {
  size: IdsSizeType,
  variant: IdsDividerVariantType,
  orientation: IdsOrientationType,
  width: string,
  height: string,
};

@Injectable()
export class DividerDemoService {
  public readonly inputControlConfig: DemoControlConfig<DividerInputControls> = {
    orientation: {
      description: 'Divider orientation.',
      type: 'IdsOrientationType',
      default: defaultConfig.orientation,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsOrientation),
    },
    size: {
      description: 'Divider size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Divider variant.',
      type: 'IdsDividerVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsDividerVariant),
    },
    width: {
      description: 'Divider width as css property.',
      type: 'string',
      default: defaultConfig.width,
      demoDefault: '100%',
    },
    height: {
      description: 'Divider height as css property.',
      type: 'string',
      default: defaultConfig.height,
      demoDefault: '100%',
    },
  };

  public defaults = getDefaultFromDemoConfig<DividerInputControls>(this.inputControlConfig);

  public model: DividerInputControls = { ...this.defaults  };

  public reset(): void {
    this.model = { ...this.defaults };
  }

  public getApiConfig(): DemoControlConfig<unknown>[] {
    return [this.inputControlConfig];
  }
}
