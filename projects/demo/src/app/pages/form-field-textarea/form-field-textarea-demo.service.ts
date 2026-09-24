import { WidgetDocsService } from '../../services/widget-docs.service';
import {
  formFieldMethodControlConfig,
  FormFieldInputControls,
  FormFieldTextareaHelperControls,
  getFormFieldInputControlConfig,
  InputInputControls,
} from '../form-field/form-field-demo-shared';

import { inject, Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { TranslateService } from '@ngx-translate/core';

const INPUT_DOCS_PATH = 'forms/components/input/input.directive.docs.json';

@Injectable()
export class FormFieldTextareaDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly formFieldInputControlConfig = getFormFieldInputControlConfig(this._widgetDocs);

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
      description: this._widgetDocs.getDescription(INPUT_DOCS_PATH, 'placeholder', 'Input placeholder.'),
      type: 'string',
      default: '-',
      demoDefault: 'Placeholder',
    },
    readonly: {
      description: this._widgetDocs.getDescription(INPUT_DOCS_PATH, 'readonly', 'Whether the input is readonly or not.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    disabled: {
      description: this._widgetDocs.getDescription(INPUT_DOCS_PATH, 'disabled', 'Whether the input is disabled or not.'),
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
      description: this._widgetDocs.getDescription(INPUT_DOCS_PATH, 'required', 'Whether the input is required or not.'),
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
      description: this._widgetDocs.getDescription(
        INPUT_DOCS_PATH,
        'canHandleSuccessState',
        'Whether the input can handle success state with a success state matcher.',
      ),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    name: {
      description: this._widgetDocs.getDescription(INPUT_DOCS_PATH, 'name', 'Name of the input, used for form submission.'),
      type: 'string',
      default: '',
      control: DemoControl.TEXT,
    },
  };

  public readonly textareaPropControlConfig: DemoControlConfig<unknown> = {
    errorStateMatcher: {
      description: this._widgetDocs.getDescription(
        INPUT_DOCS_PATH,
        'errorStateMatcher',
        'Matcher instance used to determine whether the input should show an error state.',
      ),
      type: 'AbstractErrorStateMatcher',
      default: '-',
    },
    successStateMatcher: {
      description: this._widgetDocs.getDescription(
        INPUT_DOCS_PATH,
        'successStateMatcher',
        'Matcher instance used to determine whether the input should show a success state.',
      ),
      type: 'AbstractSuccessStateMatcher',
      default: '-',
    },
  };

  public formFieldDefaults = getDefaultFromDemoConfig<FormFieldInputControls>(this.formFieldInputControlConfig);
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

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.FORM_FIELD', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.formFieldInputControlConfig,
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.FORM_FIELD_TEXTAREA', 'API.PROPERTY_GROUP.DEFAULT'),
        config: { ...this.textareaInputControlConfig, ...this.textareaPropControlConfig },
      },
    ];
  }
}
