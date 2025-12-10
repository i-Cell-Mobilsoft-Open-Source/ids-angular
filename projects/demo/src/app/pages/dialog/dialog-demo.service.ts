import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_DIALOG_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/dialog';

const defaultConfig = IDS_DIALOG_DEFAULT_CONFIG_FACTORY();

type DialogInputControls = {
  size: IdsSizeType,
  mainTitle: string,
  subTitle: string,
  showCloseButton: boolean,
  showBackdrop: boolean,
};

type DialogHelperControls = {
  useCustomHeader: boolean,
  useLongContent: boolean,
};

@Injectable()
export class DialogDemoService {
  public readonly inputControlConfig: DemoControlConfig<DialogInputControls> = {
    size: {
      description: 'Dialog size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    mainTitle: {
      description: 'Dialog main title.',
      type: 'string',
      default: '-',
      demoDefault: 'Dialog main title',
    },
    subTitle: {
      description: 'Dialog sub title.',
      type: 'string',
      default: '-',
      demoDefault: 'Dialog sub title',
    },
    showCloseButton: {
      description: 'Whether to show close button or not.',
      type: 'boolean',
      default: defaultConfig.showCloseButton,
      control: DemoControl.SWITCH,
    },
    showBackdrop: {
      description: 'Whether to show dialog backdrop or not.',
      type: 'boolean',
      default: defaultConfig.showBackdrop,
      control: DemoControl.SWITCH,
    },
  };

  public readonly helperControlConfig: DemoControlConfig<DialogHelperControls> = {
    useCustomHeader: {
      description: 'Whether to use custom header or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    useLongContent: {
      description: 'Whether to use long content or not. This is for testing scrollable content.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public defaults = getDefaultFromDemoConfig<DialogInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<DialogHelperControls>(this.helperControlConfig);

  public model: DialogInputControls = { ...this.defaults };
  public helperModel: DialogHelperControls = { ...this.helperDefaults };

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
  }
}
