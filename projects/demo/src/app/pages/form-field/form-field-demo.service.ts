import {
  formFieldDefaults,
  formFieldInputControlConfig,
  formFieldMethodControlConfig,
  FormFieldInputControls,
  FormFieldInputHelperControls,
  InputInputControls,
} from './form-field-demo-shared';

import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';

@Injectable()
export class FormFieldDemoService {
  public readonly formFieldInputControlConfig = formFieldInputControlConfig;

  public readonly formFieldHelperControlConfig: DemoControlConfig<FormFieldInputHelperControls> = {
    hasLeadingIcon: {
      description: 'Whether the form field has leading icon or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    hasPrefix: {
      description: 'Whether the form field has prefix or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    prefix: {
      description: 'Prefix for form field.',
      type: 'string',
      default: '-',
      demoDefault: 'Prefix',
    },
    hasSuffix: {
      description: 'Whether the form field has suffix or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    suffix: {
      description: 'Suffix for form field.',
      type: 'string',
      default: '-',
      demoDefault: 'Suffix',
    },
    hasTrailingIcon: {
      description: 'Whether the form field has trailing icon or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    hasAction: {
      description: 'Whether the form field has action or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    label: {
      description: 'Label for form field.',
      type: 'string',
      default: '-',
      demoDefault: 'Form field label',
    },
    hintMessage: {
      description: 'Hint message for form field.',
      type: 'string',
      default: '-',
      demoDefault: 'Type a value',
    },
    dynamicRequired: {
      description: 'Whether the dynamic input field is required or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
      onModelChange: (isRequired?: boolean) => {
        if (isRequired) {
          this.dynamicInput.addValidators(Validators.required);
        } else {
          this.dynamicInput.removeValidators(Validators.required);
        }
        this.dynamicInput.updateValueAndValidity();
      },
    },
  };

  public readonly inputInputControlConfig: DemoControlConfig<InputInputControls> = {
    placeholder: {
      description: 'Input placeholder.',
      type: 'string',
      default: '-',
      demoDefault: 'Placeholder',
    },
    readonly: {
      description: 'Whether input is readonly or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    disabled: {
      description: 'Whether input is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    required: {
      description: 'Whether input is required or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    canHandleSuccessState: {
      description: 'Whether input can handle success state with a success state matcher.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public formFieldDefaults = formFieldDefaults;
  public formFieldHelperDefaults = getDefaultFromDemoConfig<FormFieldInputHelperControls>(this.formFieldHelperControlConfig);
  public inputDefaults = getDefaultFromDemoConfig<InputInputControls>(this.inputInputControlConfig);

  public formFieldModel: FormFieldInputControls = { ...this.formFieldDefaults };
  public formFieldHelperModel: FormFieldInputHelperControls = { ...this.formFieldHelperDefaults };
  public inputModel: InputInputControls = { ...this.inputDefaults };

  public input = '';
  public dynamicInput = new FormControl('');

  public reset(): void {
    this.formFieldModel = { ...this.formFieldDefaults };
    this.formFieldHelperModel = { ...this.formFieldHelperDefaults };
    this.inputModel = { ...this.inputDefaults };

    this.input = '';
    this.dynamicInput.setValue('');
    this.dynamicInput.removeValidators(Validators.required);
    this.dynamicInput.updateValueAndValidity();
  }

  public getMethodConfig(): DemoMethodConfig[] {
    return [formFieldMethodControlConfig];
  }

  public getApiConfig(): DemoControlConfig<unknown>[] {
    return [
      this.formFieldInputControlConfig,
      this.inputInputControlConfig,
    ];
  }
}
