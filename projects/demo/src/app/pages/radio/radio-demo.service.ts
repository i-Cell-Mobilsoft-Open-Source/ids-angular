import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsOrientation, IdsOrientationType, IdsPosition, IdsPositionType, IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsValidators } from '@i-cell/ids-angular/forms';
import { IDS_RADIO_DEFAULT_CONFIG_FACTORY, IdsRadioVariant, IdsRadioVariantType } from '@i-cell/ids-angular/radio';

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
  allowHint: boolean,
  hintMessage: string,
  showGroupLabel: boolean,
  showGroupHintMessage: boolean,
};

@Injectable()
export class RadioDemoService {
  public form = new FormGroup({
    selection: new FormControl(null, []),
  });

  public inputControlConfig: DemoControlConfig<RadioInputControls> = {
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
      control: DemoControl.SWITCH,
      onModelChange: (isRequired?: boolean) => {
        if (isRequired) {
          this.form.controls.selection.addValidators(IdsValidators.required);
        } else {
          this.form.controls.selection.removeValidators(IdsValidators.required);
        }
        this.form.controls.selection.updateValueAndValidity();
      },
    },
    disabled: {
      description: 'Whether the radio is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
      onModelChange: (isDisabled?: boolean) => {
        if (isDisabled) {
          this.form.controls.selection.disable();
        } else {
          this.form.controls.selection.enable();
        }
      },
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

  public helperControlConfig: DemoControlConfig<RadioHelperControls> = {
    onlyOneItemIsDisabled: {
      description: 'When true, the first item will be disabled. Just for testing purposes.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    allowHint: {
      description: 'Allow hint message',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
    hintMessage: {
      description: 'Hint message',
      type: 'string',
      default: '-',
      demoDefault: 'Hint message',
    },
    showGroupLabel: {
      description: 'Whether to show the label of the radio group or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    showGroupHintMessage: {
      description: 'Whether to show the hint message of the radio group or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public methodControlConfig: DemoMethodConfig = [
    {
      name: 'focus(option?: FocusOption)',
      description: 'Focuses the radio item.',
      returnType: 'void',
      parameters: ['option?'],
      parameterTypes: ['FocusOption'],
      parameterDescriptions: ['The option to focus. If not provided, focuses the first enabled option.'],
    },
  ];

  public defaults = getDefaultFromDemoConfig<RadioInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<RadioHelperControls>(this.helperControlConfig);

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
    this.form.reset();
  }

  public getMethodConfig(): DemoMethodConfig[] {
    return [this.methodControlConfig];
  }

  public getApiConfig(): DemoControlConfig<unknown>[] {
    return [this.inputControlConfig];
  }
}
