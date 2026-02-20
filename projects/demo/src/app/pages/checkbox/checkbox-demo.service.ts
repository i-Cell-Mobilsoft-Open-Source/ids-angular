import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import {
  IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY,
  IDS_CHECKBOX_GROUP_DEFAULT_CONFIG_FACTORY,
  IdsCheckboxVariant,
  IdsCheckboxVariantType,
} from '@i-cell/ids-angular/checkbox';
import { IdsOrientation, IdsOrientationType, IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY();
const defaultGroupConfig = IDS_CHECKBOX_GROUP_DEFAULT_CONFIG_FACTORY();

type CheckboxInputControls = {
  size: IdsSizeType;
  variant: IdsCheckboxVariantType;
  readonly: boolean;
  required: boolean;
  disabled: boolean;
};

type CheckboxHelperControls = {
  label: string;
  allowHint: boolean;
  hintMessage: string;
};

type CheckboxGroupInputControls = {
  groupLabel: string;
  allowParent: boolean;
  parentLabel: string;
  name: string;
  size: IdsSizeType;
  variant: IdsCheckboxVariantType;
  orientation: IdsOrientationType;
};

@Injectable()
export class CheckboxDemoService {
  public readonly inputControlConfig: DemoControlConfig<CheckboxInputControls> = {
    size: {
      description: 'Checkbox size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Checkbox variant.',
      type: 'IdsCheckboxVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsCheckboxVariant),
    },
    readonly: {
      description: 'Whether the checkbox is readonly or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    required: {
      description: 'Whether the checkbox is required or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    disabled: {
      description: 'Whether the checkbox is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly helperControlConfig: DemoControlConfig<CheckboxHelperControls> = {
    label: {
      description: 'Label of checkbox',
      type: 'string',
      default: '-',
      demoDefault: 'I accept the terms and conditions',
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
  };

  public readonly groupInputControlConfig: DemoControlConfig<CheckboxGroupInputControls> = {
    groupLabel: {
      description: 'Checkbox group\'s label.',
      type: 'string',
      default: '-',
      demoDefault: 'Everyday todos',
    },
    allowParent: {
      description: 'Whether to allow parent checkbox or not.',
      type: 'boolean',
      default: defaultGroupConfig.allowParent,
      control: DemoControl.SWITCH,
    },
    parentLabel: {
      description: 'Parent checkbox label.',
      type: 'string',
      default: '-',
      demoDefault: 'Parent todo',
    },
    name: {
      description: 'Name for checkboxes.',
      type: 'string',
      default: '-',
      demoDefault: 'todo',
    },
    size: {
      description: 'Checkbox group size.',
      type: 'IdsSizeType',
      default: defaultGroupConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Checkbox group variant.',
      type: 'IdsCheckboxVariantType',
      default: defaultGroupConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsCheckboxVariant),
    },
    orientation: {
      description: 'Checkbox group variant.',
      type: 'IdsOrientationType',
      default: defaultGroupConfig.orientation,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsOrientation),
    },
  };

  public readonly methodControlConfig: DemoMethodConfig = [
    {
      name: 'toggle()',
      description: 'Toggles the checked state of the checkbox.',
      returnType: 'void',
    },
    {
      name: 'focus()',
      description: 'Focuses the checkbox.',
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
    {
      name: 'select()',
      description: 'Selects the checkbox.',
      returnType: 'void',
    },
    {
      name: 'deselect()',
      description: 'Deselects the checkbox.',
      returnType: 'void',
    },
    {
      name: 'onBlur()',
      description: 'Should be called when the checkbox loses focus.',
      returnType: 'void',
    },
    {
      name: 'onInputClick()',
      description: 'Should be called when the checkbox input is clicked.',
      returnType: 'void',
    },
    {
      name: 'onTouchTargetClick()',
      description: 'Should be called when the checkbox touch target is clicked.',
      returnType: 'void',
    },
    {
      name: 'displayedMessages()',
      description: 'Returns the type of messages currently displayed by the checkbox.',
      returnType: '"error" | "hint" | undefined',
    },
  ];

  public readonly groupMethodControlConfig: DemoMethodConfig = [
    {
      name: 'selectAllChild()',
      description: 'Checkbox-group: Selects all child checkboxes in the checkbox-group.',
      returnType: 'void',
    },
    {
      name: 'deselectAllChild()',
      description: 'Checkbox-group: Deselects all child checkboxes in the checkbox-group.',
      returnType: 'void',
    },
  ];

  public defaults = getDefaultFromDemoConfig<CheckboxInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<CheckboxHelperControls>(this.helperControlConfig);
  public groupDefaults = getDefaultFromDemoConfig<CheckboxGroupInputControls>(this.groupInputControlConfig);

  public model: CheckboxInputControls = { ...this.defaults };
  public helperModel: CheckboxHelperControls = { ...this.helperDefaults };
  public groupModel: CheckboxGroupInputControls = { ...this.groupDefaults };

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
    this.groupModel = { ...this.groupDefaults };

    this.standalone = {
      unselected: false,
      indeterminate: false,
      selected: true,
    };
    this.group = {
      toothBrushing: true,
      bath: true,
      sleep: false,
    };
  }

  public standalone = {
    unselected: false,
    indeterminate: false,
    selected: true,
  };

  public group = {
    toothBrushing: true,
    bath: true,
    sleep: false,
  };

  public getMethodConfig(): DemoMethodConfig[] {
    return [
      this.methodControlConfig,
      this.groupMethodControlConfig,
    ];
  }
}
