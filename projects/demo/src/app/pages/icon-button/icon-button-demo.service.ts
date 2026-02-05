import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import {
  IDS_ICON_BUTTON_DEFAULT_CONFIG_FACTORY,
  IdsIconButtonAppearance,
  IdsIconButtonAppearanceType,
  IdsIconButtonVariant,
  IdsIconButtonVariantType,
} from '@i-cell/ids-angular/icon-button';

const defaultConfig = IDS_ICON_BUTTON_DEFAULT_CONFIG_FACTORY();

type IconButtonInputControls = {
  size: IdsSizeType;
  variant: IdsIconButtonVariantType;
  appearance: IdsIconButtonAppearanceType;
  disabled: boolean;
  asLink: boolean;
};

@Injectable()
export class IconButtonDemoService {
  public readonly inputControlConfig: DemoControlConfig<IconButtonInputControls> = {
    size: {
      description: 'Icon Button size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Icon Button variant.',
      type: 'IdsIconButtonVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsIconButtonVariant),
    },
    appearance: {
      description: 'Icon Button appearance.',
      type: 'IdsIconButtonAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsIconButtonAppearance),
    },
    disabled: {
      description: 'Whether the icon button is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    asLink: {
      description: 'Whether the idsIconButton is a link (or button).',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public onClick(buttonName: string): void {
    console.info(`${buttonName} icon button clicked`);
  }

  public defaults = getDefaultFromDemoConfig<IconButtonInputControls>(this.inputControlConfig);

  public model: IconButtonInputControls = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }

  public getApiConfig(): DemoControlConfig<unknown>[] {
    return [this.inputControlConfig];
  }
}
