import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_SWITCH_DEFAULT_CONFIG_FACTORY, IdsSwitchComponent, IdsSwitchGroupComponent, IdsSwitchIconPosition, IdsSwitchIconPositionType, IdsSwitchLabelPosition, IdsSwitchLabelPositionType, IdsSwitchVariant, IdsSwitchVariantType } from '@i-cell/ids-angular/switch';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_SWITCH_DEFAULT_CONFIG_FACTORY();

type SwitchInputControls = {
  label: string,
  required: boolean,
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

@Component({
  selector: 'app-switch-demo',
  standalone: true,
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsSwitchComponent,
    IdsSwitchGroupComponent,
    TranslateModule,
    UpperCasePipe,
    FormsModule,
    IdsButtonComponent,
  ],
  templateUrl: './switch-demo.component.html',
  styleUrl: './switch-demo.component.scss',
})
export class SwitchDemoComponent {
  protected _inputControlConfig: DemoControlConfig<SwitchInputControls> = {
    label: {
      description: 'Switch label.',
      type: 'string',
      default: '-',
      demoDefault: 'Switch label',
    },
    required: {
      description: 'Whether the switch is required or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
    readonly: {
      description: 'Whether the switch is readonly or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
    size: {
      description: 'Size of the switch.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Variant of the switch.',
      type: 'IdsSwitchVariantType',
      default: defaultConfig.variant,
      control: 'select',
      list: convertEnumToStringArray(IdsSwitchVariant),
    },
    hasIcon: {
      description: 'Whether the switch has icon.',
      type: 'boolean',
      default: defaultConfig.hasIcon,
      control: 'checkbox',
    },
    iconPosition: {
      description: 'Where the icon should be shown in switch.',
      type: 'IdsSwitchIconPositionType',
      default: defaultConfig.iconPosition,
      control: 'select',
      list: convertEnumToStringArray(IdsSwitchIconPosition),
    },
    labelPosition: {
      description: 'Where the label should be shown in switch.',
      type: 'IdsSwitchLabelPositionType',
      default: defaultConfig.labelPosition,
      control: 'select',
      list: convertEnumToStringArray(IdsSwitchLabelPosition),
    },
    disabled: {
      description: 'Whether the switch is disabled or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
    'aria-label': {
      description: 'aria-label for switch.',
      type: 'string',
      default: '-',
      demoDefault: '',
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

  protected _groupInputControlConfig: DemoControlConfig<SwitchGroupInputControls> = {
    size: {
      description: 'Size of the switch.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
    },
    hasIcon: {
      description: 'Whether the switch has icon.',
      type: 'boolean',
      default: defaultConfig.hasIcon,
      control: 'checkbox',
    },
    iconPosition: {
      description: 'Where the icon should be shown in switch.',
      type: 'IdsSwitchIconPositionType',
      default: defaultConfig.iconPosition,
      control: 'select',
      list: convertEnumToStringArray(IdsSwitchIconPosition),
    },
    labelPosition: {
      description: 'Where the label should be shown in switch.',
      type: 'IdsSwitchLabelPositionType',
      default: defaultConfig.labelPosition,
      control: 'select',
      list: convertEnumToStringArray(IdsSwitchLabelPosition),
    },
  };

  public defaults = getDefaultFromDemoConfig<SwitchInputControls>(this._inputControlConfig);
  public groupDefaults = getDefaultFromDemoConfig<SwitchGroupInputControls>(this._groupInputControlConfig);

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
