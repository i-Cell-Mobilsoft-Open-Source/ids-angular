import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY, IdsFormFieldVariant, IdsFormFieldVariantType } from '@i-cell/ids-angular/forms';
import { IDS_SELECT_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/select';
import { TranslateService } from '@ngx-translate/core';

const FORM_FIELD_DOCS_PATH = 'forms/components/form-field/form-field.component.docs.json';
const SELECT_DOCS_PATH = 'select/select.component.docs.json';

const formFieldDefaultConfig = IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY();

const selectDefaultConfig = IDS_SELECT_DEFAULT_CONFIG_FACTORY();

type FormFieldInputControls = {
  size: IdsSizeType;
  variant: IdsFormFieldVariantType;
};

type SelectInputControls = {
  placeholder: string;
  required: boolean;
  disabled: boolean;
  readonly: boolean;
  'aria-label': string;
  'aria-labelledby': string;
  typeaheadDebounceInterval: number;
  canHandleSuccessState: boolean;
  tabIndex: number;
};

type SelectHelperControls = {
  useCustomTrigger: boolean;
};

type SampleOption = {
  value: string;
  viewValue: string;
};

type AnimalOptions = {
  land: SampleOption[];
  aquatic: SampleOption[];
};

@Injectable()
export class SelectDemoService {
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly formFieldInputControlConfig: DemoControlConfig<FormFieldInputControls> = {
    size: {
      description: this._widgetDocs.getDescription(FORM_FIELD_DOCS_PATH, 'size', 'Form field size.'),
      type: 'IdsSizeType',
      default: formFieldDefaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: this._widgetDocs.getDescription(FORM_FIELD_DOCS_PATH, 'variant', 'Form field variant.'),
      type: 'IdsFormFieldVariantType',
      default: formFieldDefaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsFormFieldVariant),
    },
  };

  public readonly selectInputControlConfig: DemoControlConfig<SelectInputControls> = {
    placeholder: {
      description: this._widgetDocs.getDescription(SELECT_DOCS_PATH, 'placeholder', 'Select placeholder.'),
      type: 'string',
      default: '-',
      demoDefault: 'Select animal',
    },
    required: {
      description: this._widgetDocs.getDescription(SELECT_DOCS_PATH, 'required', 'Whether the select is required or not.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    disabled: {
      description: this._widgetDocs.getDescription(SELECT_DOCS_PATH, 'disabled', 'Whether the select is disabled or not.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
      onModelChange: (isDisabled?: boolean) => {
        if (isDisabled) {
          this.testForm.controls.animal.disable();
        } else {
          this.testForm.controls.animal.enable();
        }
      },
    },
    readonly: {
      description: this._widgetDocs.getDescription(SELECT_DOCS_PATH, 'readonly', 'Whether the select is readonly or not.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    'aria-label': {
      description: this._widgetDocs.getDescription(SELECT_DOCS_PATH, 'label', 'aria-label tag for the select.'),
      type: 'string',
      default: '-',
      demoDefault: 'animal',
    },
    'aria-labelledby': {
      description: this._widgetDocs.getDescription(SELECT_DOCS_PATH, 'labelledby', 'aria-labelledby tag for select.'),
      type: 'string',
      default: '-',
      demoDefault: 'animal',
    },
    typeaheadDebounceInterval: {
      description: this._widgetDocs.getDescription(
        SELECT_DOCS_PATH,
        'typeaheadDebounceInterval',
        'Number in millisec. Can not overwrite at runtime.',
      ),
      type: 'number',
      default: selectDefaultConfig.typeaheadDebounceInterval,
      min: 0,
      step: 100,
      disabled: true,
    },
    canHandleSuccessState: {
      description: this._widgetDocs.getDescription(
        SELECT_DOCS_PATH,
        'canHandleSuccessState',
        'Whether the select can handle success state with a success state matcher.',
      ),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    tabIndex: {
      description: this._widgetDocs.getDescription(SELECT_DOCS_PATH, 'tabIndex', 'Tab index of the select.'),
      type: 'number',
      default: 0,
      control: DemoControl.NUMBER,
      step: 1,
    },
  };

  public readonly selectPropControlConfig: DemoControlConfig<unknown> = {
    multiSelect: {
      description: this._widgetDocs.getDescription(
        SELECT_DOCS_PATH,
        'multiSelect',
        'Whether the select allows selecting multiple options at once.',
      ),
      type: 'boolean',
      default: false,
    },
    valueCompareFn: {
      description: this._widgetDocs.getDescription(
        SELECT_DOCS_PATH,
        'valueCompareFn',
        'Function used to compare option values when determining selection state.',
      ),
      type: '(o1: unknown, o2: unknown) => boolean',
      default: '-',
    },
    sortCompareFn: {
      description: this._widgetDocs.getDescription(
        SELECT_DOCS_PATH,
        'sortCompareFn',
        'Function used to sort selected options (only relevant when multiSelect is true).',
      ),
      type: '(a: IdsOptionComponent, b: IdsOptionComponent, options: readonly IdsOptionComponent[]) => number',
      default: '-',
    },
    errorStateMatcher: {
      description: this._widgetDocs.getDescription(
        SELECT_DOCS_PATH,
        'errorStateMatcher',
        'Matcher instance used to determine whether the select should show an error state.',
      ),
      type: 'AbstractErrorStateMatcher',
      default: '-',
    },
    successStateMatcher: {
      description: this._widgetDocs.getDescription(
        SELECT_DOCS_PATH,
        'successStateMatcher',
        'Matcher instance used to determine whether the select should show a success state.',
      ),
      type: 'AbstractSuccessStateMatcher',
      default: '-',
    },
  };

  public readonly selectHelperControlConfig: DemoControlConfig<SelectHelperControls> = {
    useCustomTrigger: {
      description: 'Whether the select has a custom trigger or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly selectMethodControlConfig: DemoMethodConfig = [
    {
      name: 'toggle()',
      description: 'Toggles the select open or closed.',
      returnType: 'void',
    },
    {
      name: 'open()',
      description: 'Opens the select.',
      returnType: 'void',
    },
    {
      name: 'close()',
      description: 'Closes the select.',
      returnType: 'void',
    },
    {
      name: 'focus(options?: FocusOptions)',
      description: 'Focuses the select.',
      returnType: 'void',
      parameters: ['options?'],
      parameterTypes: ['FocusOptions'],
      parameterDescriptions: ['Optional focus options.'],
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
      name: 'isOptionPreSelectedByValue(optionValue: unknown)',
      description: 'Checks if an option with the given value is pre-selected.',
      parameters: ['optionValue'],
      parameterTypes: ['unknown'],
      parameterDescriptions: ['The value to check.'],
      returnType: 'boolean',
    },
    {
      name: 'updateErrorAndSuccessState()',
      description: 'Updates the error and success state of the select based on the current value.',
      returnType: 'void',
    },
  ];

  public formFieldDefaults = getDefaultFromDemoConfig<FormFieldInputControls>(this.formFieldInputControlConfig);
  public selectDefaults = getDefaultFromDemoConfig<SelectInputControls>(this.selectInputControlConfig);
  public selectHelperDefaults = getDefaultFromDemoConfig<SelectHelperControls>(this.selectHelperControlConfig);

  public formFieldModel: FormFieldInputControls = { ...this.formFieldDefaults };
  public selectModel: SelectInputControls = { ...this.selectDefaults };
  public selectHelperModel: SelectHelperControls = { ...this.selectHelperDefaults };

  public translate = inject(TranslateService);

  public animals: AnimalOptions = {
    land: [
      { viewValue: 'SELECT.LAND.DOG', value: 'dog' },
      { viewValue: 'SELECT.LAND.CAT', value: 'cat' },
      { viewValue: 'SELECT.LAND.GIRAFFE', value: 'giraffe' },
      { viewValue: 'SELECT.LAND.ORANGUTAN', value: 'orangutan' },
      { viewValue: 'SELECT.LAND.MAMMOTH', value: 'mammoth' },
      { viewValue: 'SELECT.LAND.OPISTHOCOELICAUDIA SKARZYNSKI', value: 'opisthocoelicaudia skarzynski' },
    ],
    aquatic: [
      { viewValue: 'SELECT.AQUATIC.CROCODILE', value: 'crocodile' },
      { viewValue: 'SELECT.AQUATIC.WHALE', value: 'whale' },
      { viewValue: 'SELECT.AQUATIC.DOLPHIN', value: 'doplhin' },
      { viewValue: 'SELECT.AQUATIC.SHARK', value: 'shark' },
    ],
  };

  public testForm = new FormGroup({
    animal: new FormControl<string>('dog', { nonNullable: true }),
  });

  public singleSelectionValue: string | null = null;
  public multiSelectionValue: string[] = [
    this.animals.land[0].value,
    this.animals.land[2].value,
    this.animals.aquatic[1].value,
  ];

  public reset(): void {
    this.formFieldModel = { ...this.formFieldDefaults };
    this.selectModel = { ...this.selectDefaults };
    this.selectHelperModel = { ...this.selectHelperDefaults };

    this.testForm.reset({ animal: 'dog' });

    this.singleSelectionValue = null;
    this.multiSelectionValue = [
      this.animals.land[0].value,
      this.animals.land[2].value,
      this.animals.aquatic[1].value,
    ];
  }

  public getMethodConfig(): DemoMethodConfig[] {
    return [this.selectMethodControlConfig];
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this.translate, 'COMPONENTS.FORM_FIELD', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.formFieldInputControlConfig,
      },
      {
        title: getDemoApiTitle(this.translate, 'COMPONENTS.SELECT', 'API.PROPERTY_GROUP.DEFAULT'),
        config: { ...this.selectInputControlConfig, ...this.selectPropControlConfig },
      },
    ];
  }
}
