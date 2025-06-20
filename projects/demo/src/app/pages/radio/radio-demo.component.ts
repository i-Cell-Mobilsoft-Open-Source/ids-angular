import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsCardComponent } from '@i-cell/ids-angular/card';
import { IdsPositionType, IdsSize, IdsSizeType, IdsOrientationType, IdsPosition, IdsOrientation } from '@i-cell/ids-angular/core';
import { IDS_RADIO_DEFAULT_CONFIG_FACTORY, IdsRadioGroupDirective, IdsRadioComponent, IdsRadioVariant, IdsRadioVariantType } from '@i-cell/ids-angular/radio';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_RADIO_DEFAULT_CONFIG_FACTORY();

type RadioInputControls = {
  name: string
  required: boolean,
  disabled: boolean,
  size: IdsSizeType,
  variant: IdsRadioVariantType,
  orientation: IdsOrientationType,
  labelPosition: IdsPositionType,
};

type RadioHelperControls = {
  onlyOneItemIsDisabled: boolean,
};

@Component({
  selector: 'app-radio-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsCardComponent,
    IdsRadioGroupDirective,
    IdsRadioComponent,
    FormsModule,
    TranslateModule,
  ],
  templateUrl: './radio-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './radio-demo.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class RadioDemoComponent {
  protected _inputControlConfig: DemoControlConfig<RadioInputControls> = {
    name: {
      description: 'Name for radio items. Name is provided for group, but items get it.',
      type: 'string',
      default: '-',
      demoDefault: 'numbers',
    },
    required: {
      description: 'Whether the radio is required or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
    disabled: {
      description: 'Whether the radio is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
    size: {
      description: 'Size of the radio.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Variant of the radio.',
      type: 'IdsRadioVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsRadioVariant),
    },
    orientation: {
      description: 'Orientation of the radio.',
      type: 'IdsRadioVariantType',
      default: defaultConfig.orientation,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsOrientation),
    },
    labelPosition: {
      description: 'Position of the radio\'s label.',
      type: 'IdsPositionType',
      default: defaultConfig.labelPosition,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsPosition),
    },
  };

  protected _helperControlConfig: DemoControlConfig<RadioHelperControls> = {
    onlyOneItemIsDisabled: {
      description: 'When true, the first item will be disabled. Just for testing purposes.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
  };

  public defaults = getDefaultFromDemoConfig<RadioInputControls>(this._inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<RadioHelperControls>(this._helperControlConfig);

  public model: RadioInputControls = { ...this.defaults };
  public helperModel: RadioHelperControls = { ...this.helperDefaults };

  public simpleValue = undefined;
  public wrappedValue = undefined;

  public onClick(buttonName: string): void {
    console.info(`${buttonName} button clicked`);
  }

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
  }
}
