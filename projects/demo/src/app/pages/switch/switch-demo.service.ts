import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_SWITCH_DEFAULT_CONFIG_FACTORY, IdsSwitchIconPosition, IdsSwitchIconPositionType, IdsSwitchLabelPosition, IdsSwitchLabelPositionType, IdsSwitchVariant, IdsSwitchVariantType } from '@i-cell/ids-angular/switch';
import { TranslateService } from '@ngx-translate/core';

const SWITCH_DOCS_PATH = 'switch/switch.component.docs.json';
const SWITCH_GROUP_DOCS_PATH = 'switch/switch-group.component.docs.json';

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
  name: string,
  tabIndex: number,
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
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly inputControlConfig: DemoControlConfig<SwitchInputControls> = {
    label: {
      description: this._widgetDocs.getDescription(SWITCH_DOCS_PATH, 'label', 'Switch label.'),
      type: 'string',
      default: '-',
      demoDefault: 'Switch label',
    },
    readonly: {
      description: this._widgetDocs.getDescription(SWITCH_DOCS_PATH, 'readonly', 'Whether the switch is readonly or not.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    size: {
      description: this._widgetDocs.getDescription(SWITCH_DOCS_PATH, 'size', 'Size of the switch.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: this._widgetDocs.getDescription(SWITCH_DOCS_PATH, 'variant', 'Variant of the switch.'),
      type: 'IdsSwitchVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSwitchVariant),
    },
    hasIcon: {
      description: this._widgetDocs.getDescription(SWITCH_DOCS_PATH, 'hasIcon', 'Whether the switch has icon.'),
      type: 'boolean',
      default: defaultConfig.hasIcon,
      control: DemoControl.SWITCH,
    },
    iconPosition: {
      description: this._widgetDocs.getDescription(SWITCH_DOCS_PATH, 'iconPosition', 'Where the icon should be shown in switch.'),
      type: 'IdsSwitchIconPositionType',
      default: defaultConfig.iconPosition,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSwitchIconPosition),
    },
    labelPosition: {
      description: this._widgetDocs.getDescription(SWITCH_DOCS_PATH, 'labelPosition', 'Where the label should be shown in switch.'),
      type: 'IdsSwitchLabelPositionType',
      default: defaultConfig.labelPosition,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSwitchLabelPosition),
    },
    disabled: {
      description: this._widgetDocs.getDescription(SWITCH_DOCS_PATH, 'disabled', 'Whether the switch is disabled or not.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    name: {
      description: this._widgetDocs.getDescription(SWITCH_DOCS_PATH, 'name', 'Name of the switch input, used for form submission.'),
      type: 'string',
      default: '',
      control: DemoControl.TEXT,
    },
    tabIndex: {
      description: this._widgetDocs.getDescription(SWITCH_DOCS_PATH, 'tabIndex', 'Tab index of the switch.'),
      type: 'number',
      default: 0,
      control: DemoControl.NUMBER,
      step: 1,
    },
    'aria-label': {
      description: this._widgetDocs.getDescription(SWITCH_DOCS_PATH, 'ariaLabel', 'aria-label for switch.'),
      type: 'string',
      default: '-',
      demoDefault: 'switch',
    },
    'aria-labelledby': {
      description: this._widgetDocs.getDescription(SWITCH_DOCS_PATH, 'labelledby', 'aria-labelledby for switch.'),
      type: 'string',
      default: '-',
      demoDefault: '',
    },
    'aria-describedby': {
      description: this._widgetDocs.getDescription(SWITCH_DOCS_PATH, 'describedby', 'aria-describedby for switch.'),
      type: 'string',
      default: '-',
      demoDefault: '',
    },
  };

  public readonly groupInputControlConfig: DemoControlConfig<SwitchGroupInputControls> = {
    size: {
      description: this._widgetDocs.getDescription(SWITCH_GROUP_DOCS_PATH, 'size', 'Size of the switch.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    hasIcon: {
      description: this._widgetDocs.getDescription(SWITCH_GROUP_DOCS_PATH, 'hasIcon', 'Whether the switch has icon.'),
      type: 'boolean',
      default: defaultConfig.hasIcon,
      control: DemoControl.SWITCH,
    },
    iconPosition: {
      description: this._widgetDocs.getDescription(
        SWITCH_GROUP_DOCS_PATH,
        'iconPosition',
        'Where the icon should be shown in switch.',
      ),
      type: 'IdsSwitchIconPositionType',
      default: defaultConfig.iconPosition,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSwitchIconPosition),
    },
    labelPosition: {
      description: this._widgetDocs.getDescription(
        SWITCH_GROUP_DOCS_PATH,
        'labelPosition',
        'Where the label should be shown in switch.',
      ),
      type: 'IdsSwitchLabelPositionType',
      default: defaultConfig.labelPosition,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSwitchLabelPosition),
    },
  };

  public readonly methodControlConfig: DemoMethodConfig = [
    {
      name: 'toggle()',
      description: 'Toggles the checked state of the switch.',
      returnType: 'void',
    },
    {
      name: 'focus()',
      description: 'Focuses the switch.',
      returnType: 'void',
    },
    {
      name: 'writeValue(value: boolean)',
      description: 'Writes a new value to the element.',
      parameters: ['value'],
      parameterTypes: ['boolean'],
      parameterDescriptions: ['The value to be written.'],
      returnType: 'void',
    },
    {
      name: 'registerOnChange(fn: ()=>void)',
      description: 'Registers a callback function that should be called when the control\'s value changes in the UI.',
      parameters: ['fn'],
      parameterTypes: ['()=>void'],
      parameterDescriptions: ['The callback function.'],
      returnType: 'void',
    },
    {
      name: 'registerOnTouched(fn: ()=>unknown)',
      description: 'Registers a callback function that should be called when the control is touched.',
      parameters: ['fn'],
      parameterTypes: ['()=>unknown'],
      parameterDescriptions: ['The callback function.'],
      returnType: 'void',
    },
    {
      name: 'setDisabledState(isDisabled: boolean)',
      description: 'Sets the disabled state of the element.',
      parameters: ['isDisabled'],
      parameterTypes: ['boolean'],
      parameterDescriptions: ['Whether the element should be disabled or not.'],
      returnType: 'void',
    },
  ];

  public defaults = getDefaultFromDemoConfig<SwitchInputControls>(this.inputControlConfig);
  public groupDefaults = getDefaultFromDemoConfig<SwitchGroupInputControls>(this.groupInputControlConfig);

  public model: SwitchInputControls = { ...this.defaults };
  public groupModel: SwitchGroupInputControls = { ...this.groupDefaults };

  public value = true;

  public groupValue = [
    true,
    true,
    true,
  ];

  public reset(): void {
    this.value = true;
    this.model = { ...this.defaults };
    this.groupValue = [
      true,
      true,
      true,
    ];
    this.groupModel = { ...this.groupDefaults };
  }

  public getMethodConfig(): DemoMethodConfig[] {
    return [this.methodControlConfig];
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.SWITCH', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.inputControlConfig,
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.SWITCH', 'API.PROPERTY_GROUP.GROUP'),
        config: this.groupInputControlConfig,
      },
    ];
  }
}
