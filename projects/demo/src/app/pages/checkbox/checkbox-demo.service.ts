import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY, IdsCheckboxVariant, IdsCheckboxVariantType } from '@i-cell/ids-angular/checkbox';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY();

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

@Injectable()
export class CheckboxDemoService {
  public form = new FormGroup({
    terms_and_conditions: new FormControl(false, []),
    privacy_policy: new FormControl(false, []),
    marketing_materials: new FormControl(false, []),
  });

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
      onModelChange: (isDisabled?: boolean) => {
        if (isDisabled) {
          this.form.controls.terms_and_conditions.disable();
          this.form.controls.privacy_policy.disable();
          this.form.controls.marketing_materials.disable();
        } else {
          this.form.controls.terms_and_conditions.enable();
          this.form.controls.privacy_policy.enable();
          this.form.controls.marketing_materials.enable();
        }
      },
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

  public defaults = getDefaultFromDemoConfig<CheckboxInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<CheckboxHelperControls>(this.helperControlConfig);

  public model: CheckboxInputControls = { ...this.defaults };
  public helperModel: CheckboxHelperControls = { ...this.helperDefaults };

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };

    this.standalone = {
      unselected: false,
      indeterminate: false,
      selected: true,
    };
  }

  public standalone = {
    unselected: false,
    indeterminate: false,
    selected: true,
  };

  public getMethodConfig(): DemoMethodConfig[] {
    return [this.methodControlConfig];
  }

  public getApiConfig(): DemoControlConfig<unknown>[] {
    return [this.inputControlConfig];
  }
}
