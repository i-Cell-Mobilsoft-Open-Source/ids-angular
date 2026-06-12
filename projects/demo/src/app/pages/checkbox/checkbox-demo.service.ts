import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
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
  allowHint: boolean;
};

type CheckboxGroupInputControls = {
  groupLabel: string;
  allowParent: boolean;
  parentLabel: string;
  size: IdsSizeType;
  variant: IdsCheckboxVariantType;
  orientation: IdsOrientationType;
  showAsterisk: boolean;
};

@Injectable()
export class CheckboxDemoService {
  public form = new FormGroup({
    terms_and_conditions: new FormControl(false, []),
    privacy_policy: new FormControl(false, []),
    marketing_materials: new FormControl(false, []),
  });

  public formGroup = new FormGroup({
    toppings: new FormGroup({
      cheese: new FormControl(false, []),
      ham: new FormControl(false, []),
      corn: new FormControl(false, []),
      mushrooms: new FormControl(false, []),
    }, { validators: this._minimumCountSelectedValidator(2) }),
    cheeses: new FormGroup({
      cheddar: new FormControl(false, []),
      mozzarella: new FormControl(false, []),
      parmesan: new FormControl(false, []),
    }, { validators: this._minimumCountSelectedValidator(1) }),
  });

  private _minimumCountSelectedValidator(minimumCount: number): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;

      const checkedCount = Object.values(group.controls)
        .filter((control) => control.value === true)
        .length;

      return checkedCount >= minimumCount
        ? null
        : { minimumCountSelected: true };
    };
  }

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
      onModelChange: (isRequired?: boolean) => {
        if (isRequired) {
          this.form.controls.terms_and_conditions.addValidators(Validators.requiredTrue);
          this.form.controls.privacy_policy.addValidators(Validators.requiredTrue);
          this.form.controls.marketing_materials.addValidators(Validators.requiredTrue);
        } else {
          this.form.controls.terms_and_conditions.removeValidators(Validators.requiredTrue);
          this.form.controls.privacy_policy.removeValidators(Validators.requiredTrue);
          this.form.controls.marketing_materials.removeValidators(Validators.requiredTrue);
        }
        this.form.controls.terms_and_conditions.updateValueAndValidity();
        this.form.controls.privacy_policy.updateValueAndValidity();
        this.form.controls.marketing_materials.updateValueAndValidity();
      },
    },
    disabled: {
      description: 'Whether the checkbox is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly helperControlConfig: DemoControlConfig<CheckboxHelperControls> = {
    allowHint: {
      description: 'Allow hint message',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
  };

  public readonly groupInputControlConfig: DemoControlConfig<CheckboxGroupInputControls> = {
    groupLabel: {
      description: 'Checkbox group\'s label.',
      type: 'string',
      default: '-',
      demoDefault: 'Options',
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
      demoDefault: 'Parent options',
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
    showAsterisk: {
      description: 'Whether to show an asterisk before to the checkbox group label or not. IMPORTANT: This is only for display purposes.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly groupInputHelperControlConfig: DemoControlConfig<CheckboxHelperControls> = {
    allowHint: {
      description: 'Allow hint message',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
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
      description: 'Selects all child checkboxes in the checkbox-group.',
      returnType: 'void',
    },
    {
      name: 'deselectAllChild()',
      description: 'Deselects all child checkboxes in the checkbox-group.',
      returnType: 'void',
    },
  ];

  public defaults = getDefaultFromDemoConfig<CheckboxInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<CheckboxHelperControls>(this.helperControlConfig);
  public groupDefaults = getDefaultFromDemoConfig<CheckboxGroupInputControls>(this.groupInputControlConfig);
  public groupInputHelperDefaults = getDefaultFromDemoConfig<CheckboxHelperControls>(this.groupInputHelperControlConfig);

  public model: CheckboxInputControls = { ...this.defaults };
  public helperModel: CheckboxHelperControls = { ...this.helperDefaults };
  public groupModel: CheckboxGroupInputControls = { ...this.groupDefaults };
  public groupInputHelperModel: CheckboxHelperControls = { ...this.groupInputHelperDefaults };

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
    this.groupModel = { ...this.groupDefaults };
    this.groupInputHelperModel = { ...this.groupInputHelperDefaults };

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

  public getMethodTitles(): string[] {
    return [
      'Standalone Checkbox Methods',
      'Checkbox Group Methods',
    ];
  }

  public getApiConfig(): DemoControlConfig<unknown>[] {
    return [
      this.inputControlConfig,
      this.groupInputControlConfig,
    ];
  }
}
