import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_SWITCH_DEFAULT_CONFIG_FACTORY, IdsSwitchIconPosition, IdsSwitchIconPositionType, IdsSwitchLabelPosition, IdsSwitchLabelPositionType, IdsSwitchVariant, IdsSwitchVariantType } from '@i-cell/ids-angular/switch';

const defaultConfig = IDS_SWITCH_DEFAULT_CONFIG_FACTORY();

type SwitchInputControls = {
  label: string,
  readonly: boolean,
  size: IdsSizeType,
  variant: IdsSwitchVariantType,
  hasIcon: boolean,
  iconPosition: IdsSwitchIconPositionType,
  labelPosition: IdsSwitchLabelPositionType,
  disabled: boolean,
  'aria-label': string,
  'aria-labelledby': string,
  'aria-describedby': string,
};

type SwitchGroupInputControls = {
  size: IdsSizeType,
  hasIcon: boolean,
  iconPosition: IdsSwitchIconPositionType,
  labelPosition: IdsSwitchLabelPositionType,
};
@Injectable()
export class SwitchDemoService {
  public readonly inputControlConfig: DemoControlConfig<SwitchInputControls> = {
    label: {
      description: 'Switch label.',
      type: 'string',
      default: '-',
      demoDefault: 'Switch label',
    },
    readonly: {
      description: 'Whether the switch is readonly or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    size: {
      description: 'Size of the switch.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Variant of the switch.',
      type: 'IdsSwitchVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSwitchVariant),
    },
    hasIcon: {
      description: 'Whether the switch has icon.',
      type: 'boolean',
      default: defaultConfig.hasIcon,
      control: DemoControl.SWITCH,
    },
    iconPosition: {
      description: 'Where the icon should be shown in switch.',
      type: 'IdsSwitchIconPositionType',
      default: defaultConfig.iconPosition,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSwitchIconPosition),
    },
    labelPosition: {
      description: 'Where the label should be shown in switch.',
      type: 'IdsSwitchLabelPositionType',
      default: defaultConfig.labelPosition,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSwitchLabelPosition),
    },
    disabled: {
      description: 'Whether the switch is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    'aria-label': {
      description: 'aria-label for switch.',
      type: 'string',
      default: '-',
      demoDefault: 'switch',
    },
    'aria-labelledby': {
      description: 'aria-labelledby for switch.',
      type: 'string',
      default: '-',
      demoDefault: '',
    },
    'aria-describedby': {
      description: 'aria-describedby for switch.',
      type: 'string',
      default: '-',
      demoDefault: '',
    },
  };

  public readonly groupInputControlConfig: DemoControlConfig<SwitchGroupInputControls> = {
    size: {
      description: 'Size of the switch.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    hasIcon: {
      description: 'Whether the switch has icon.',
      type: 'boolean',
      default: defaultConfig.hasIcon,
      control: DemoControl.SWITCH,
    },
    iconPosition: {
      description: 'Where the icon should be shown in switch.',
      type: 'IdsSwitchIconPositionType',
      default: defaultConfig.iconPosition,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSwitchIconPosition),
    },
    labelPosition: {
      description: 'Where the label should be shown in switch.',
      type: 'IdsSwitchLabelPositionType',
      default: defaultConfig.labelPosition,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSwitchLabelPosition),
    },
  };

  public defaults = getDefaultFromDemoConfig<SwitchInputControls>(this.inputControlConfig);
  public groupDefaults = getDefaultFromDemoConfig<SwitchGroupInputControls>(this.groupInputControlConfig);

  public model: SwitchInputControls = { ...this.defaults };
  public groupModel: SwitchGroupInputControls = { ...this.groupDefaults };

  public value = true;
  // eslint-disable-next-line @stylistic/js/array-bracket-newline, @stylistic/js/array-element-newline
  public groupValue = [true, true, true];

  public reset(): void {
    this.value = true;
    this.model = { ...this.defaults };
    // eslint-disable-next-line @stylistic/js/array-bracket-newline, @stylistic/js/array-element-newline
    this.groupValue = [true, true, true];
    this.groupModel = { ...this.groupDefaults };
  }
}
