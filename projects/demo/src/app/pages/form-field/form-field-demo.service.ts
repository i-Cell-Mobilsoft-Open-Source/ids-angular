import {
  formFieldMethodControlConfig,
  FormFieldInputControls,
  FormFieldInputHelperControls,
  getFormFieldInputControlConfig,
  InputInputControls,
} from './form-field-demo-shared';

import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { DemoSlotConfig } from '@demo-types/demo-slot.type';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { TranslateService } from '@ngx-translate/core';

const INPUT_DOCS_PATH = 'forms/components/input/input.directive.docs.json';
const FORM_FIELD_SLOTS_DOCS_PATH = 'forms/components/form-field/form-field.component.slots.docs.json';

@Injectable()
export class FormFieldDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly formFieldInputControlConfig = getFormFieldInputControlConfig(this._widgetDocs);

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
    },
    required: {
      description: this._widgetDocs.getDescription(INPUT_DOCS_PATH, 'required', 'Whether the input is required or not.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
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

  public readonly inputPropControlConfig: DemoControlConfig<unknown> = {
    type: {
      description: this._widgetDocs.getDescription(
        INPUT_DOCS_PATH,
        'type',
        'Type of the input (e.g. text, email, number, password).',
      ),
      type: 'IdsInputType',
      default: 'text',
    },
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

  public readonly slotControlConfig: DemoSlotConfig = [
    {
      name: 'label',
      selector: 'ids-label',
      description: this._widgetDocs.getDescription(
        FORM_FIELD_SLOTS_DOCS_PATH,
        'label',
        'Projected <ids-label> element used as the form field\'s label.',
      ),
    },
    {
      name: 'idsLeadingIcon',
      selector: 'ids-icon[idsLeadingIcon]',
      description: this._widgetDocs.getDescription(
        FORM_FIELD_SLOTS_DOCS_PATH,
        'idsLeadingIcon',
        'Projected <ids-icon> element (marked with the idsLeadingIcon attribute) shown before the input.',
      ),
    },
    {
      name: 'idsPrefix',
      selector: '[idsPrefix]',
      description: this._widgetDocs.getDescription(
        FORM_FIELD_SLOTS_DOCS_PATH,
        'idsPrefix',
        'Content projected before the input (marked with the idsPrefix attribute), e.g. static text or an adornment.',
      ),
    },
    {
      name: 'content',
      description: this._widgetDocs.getDescription(
        FORM_FIELD_SLOTS_DOCS_PATH,
        'content',
        'Default content of the form field, typically the native or IDS input control.',
      ),
    },
    {
      name: 'idsSuffix',
      selector: '[idsSuffix]',
      description: this._widgetDocs.getDescription(
        FORM_FIELD_SLOTS_DOCS_PATH,
        'idsSuffix',
        'Content projected after the input (marked with the idsSuffix attribute), e.g. static text or an adornment.',
      ),
    },
    {
      name: 'idsTrailingIcon',
      selector: 'ids-icon[idsTrailingIcon]',
      description: this._widgetDocs.getDescription(
        FORM_FIELD_SLOTS_DOCS_PATH,
        'idsTrailingIcon',
        'Projected <ids-icon> element (marked with the idsTrailingIcon attribute) shown after the input.',
      ),
    },
    {
      name: 'idsFormFieldAction',
      selector: '[idsFormFieldAction]',
      description: this._widgetDocs.getDescription(
        FORM_FIELD_SLOTS_DOCS_PATH,
        'idsFormFieldAction',
        'Content projected as an action next to the field (marked with the idsFormFieldAction attribute), e.g. a button.',
      ),
    },
    {
      name: 'errorMessage',
      selector: 'ids-error-message',
      description: this._widgetDocs.getDescription(
        FORM_FIELD_SLOTS_DOCS_PATH,
        'errorMessage',
        'Projected <ids-error-message> element, shown in the subscript area when the field is in an error state.',
      ),
    },
    {
      name: 'successMessage',
      selector: 'ids-success-message',
      description: this._widgetDocs.getDescription(
        FORM_FIELD_SLOTS_DOCS_PATH,
        'successMessage',
        'Projected <ids-success-message> element, shown in the subscript area when the field is in a success state.',
      ),
    },
    {
      name: 'hintMessage',
      selector: 'ids-hint-message',
      description: this._widgetDocs.getDescription(
        FORM_FIELD_SLOTS_DOCS_PATH,
        'hintMessage',
        'Projected <ids-hint-message> element, shown in the subscript area by default.',
      ),
    },
  ];

  public getSlotConfig(): DemoSlotConfig[] {
    return [this.slotControlConfig];
  }

  public getSlotTitles(): string[] {
    return ['Form field'];
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.FORM_FIELD', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.formFieldInputControlConfig,
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.FORM_FIELD_INPUT', 'API.PROPERTY_GROUP.DEFAULT'),
        config: { ...this.inputInputControlConfig, ...this.inputPropControlConfig },
      },
    ];
  }
}
