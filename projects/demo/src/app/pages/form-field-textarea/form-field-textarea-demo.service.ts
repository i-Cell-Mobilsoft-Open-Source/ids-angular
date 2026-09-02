import {
  formFieldDefaults,
  formFieldInputControlConfig,
  formFieldMethodControlConfig,
  FormFieldInputControls,
  FormFieldTextareaHelperControls,
  InputInputControls,
} from '../form-field/form-field-demo-shared';

import { Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';

@Injectable()
export class FormFieldTextareaDemoService {
  public readonly formFieldInputControlConfig = formFieldInputControlConfig;

  public readonly formFieldTextareaHelperControlConfig: DemoControlConfig<FormFieldTextareaHelperControls> = {
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
  };

  public readonly textareaInputControlConfig: DemoControlConfig<InputInputControls> = {
    placeholder: {
      description: 'Textarea placeholder.',
      type: 'string',
      default: '-',
      demoDefault: 'Placeholder',
    },
    readonly: {
      description: 'Whether textarea is readonly or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    disabled: {
      description: 'Whether textarea is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
      onModelChange: (disable?: boolean) => {
        if (disable) {
          this.textarea.disable();
        } else {
          this.textarea.enable();
        }
      },
    },
    required: {
      description: 'Whether textarea is required or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
      onModelChange: (isRequired?: boolean) => {
        if (isRequired) {
          this.textarea.addValidators(Validators.required);
        } else {
          this.textarea.removeValidators(Validators.required);
        }
        this.textarea.updateValueAndValidity();
      },
    },
    canHandleSuccessState: {
      description: 'Whether textarea can handle success state with a success state matcher.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public formFieldDefaults = formFieldDefaults;
  public formFieldHelperDefaults = getDefaultFromDemoConfig<FormFieldTextareaHelperControls>(this.formFieldTextareaHelperControlConfig);
  public inputDefaults = getDefaultFromDemoConfig<InputInputControls>(this.textareaInputControlConfig);

  public formFieldModel: FormFieldInputControls = { ...this.formFieldDefaults };
  public formFieldHelperModel: FormFieldTextareaHelperControls = { ...this.formFieldHelperDefaults };
  public inputModel: InputInputControls = { ...this.inputDefaults };

  public textarea = new FormControl('');

  public reset(): void {
    this.formFieldModel = { ...this.formFieldDefaults };
    this.formFieldHelperModel = { ...this.formFieldHelperDefaults };
    this.inputModel = { ...this.inputDefaults };

    this.textarea.setValue('');
    this.textarea.enable();
    this.textarea.removeValidators(Validators.required);
    this.textarea.updateValueAndValidity();
  }

  public getMethodConfig(): DemoMethodConfig[] {
    return [formFieldMethodControlConfig];
  }

  public getApiConfig(): DemoControlConfig<unknown>[] {
    return [
      this.formFieldInputControlConfig,
      this.textareaInputControlConfig,
    ];
  }
}
