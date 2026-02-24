import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_DATEPICKER_DEFAULT_CONFIG_FACTORY, IdsDatepickerView, IdsDatepickerViewType } from '@i-cell/ids-angular/datepicker';
import { IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/forms';

const formFieldDefaultConfig = IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY();
const datepickerDefaultConfig = IDS_DATEPICKER_DEFAULT_CONFIG_FACTORY();

type FormFieldInputControls = {
  size: IdsSizeType,
};

type DatepickerInputControls = {
  minDate: string,
  maxDate: string,
  view: IdsDatepickerViewType,
};

@Injectable()
export class DatepickerDemoService {
  public readonly formFieldInputControlConfig: DemoControlConfig<FormFieldInputControls> = {
    size: {
      description: 'Size of the form field.',
      type: 'IdsSizeType',
      default: formFieldDefaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
  };

  public readonly datepickerInputControlConfig: DemoControlConfig<DatepickerInputControls> = {
    minDate: {
      description: 'The datepicker\'s minimum date',
      type: 'Date',
      default: '-',
      demoDefault: '',
      control: DemoControl.DATE,
    },
    maxDate: {
      description: 'The datepicker\'s maximum date',
      type: 'Date',
      default: '-',
      demoDefault: '',
      control: DemoControl.DATE,
    },
    view: {
      description: 'The starting view of the datepicker\'s calendar popup (day, month, year)',
      type: 'IdsDatepickerView',
      default: datepickerDefaultConfig.view,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsDatepickerView),
    },
  };

  public readonly datepickerMethodConfig: DemoMethodConfig = [
    {
      name: 'writeValue(obj:unknown): void',
      description: 'Writes a new value to the element.',
      returnType: 'void',
      parameters: ['obj'],
      parameterTypes: ['unknown'],
      parameterDescriptions: ['The value to be written.'],
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
      name: 'validate(control: AbstractControl): ValidationErrors | null',
      description: 'Validates the control\'s value and returns validation errors if the value is invalid, or null if the value is valid.',
      returnType: 'ValidationErrors | null',
      parameters: ['control'],
      parameterTypes: ['AbstractControl'],
      parameterDescriptions: ['The control to validate.'],
    },
    {
      name: 'registerOnValidatorChange(fn: () => void): void',
      description: 'Registers a callback function that should be called when the validator needs to be re-evaluated.',
      returnType: 'void',
      parameters: ['fn'],
      parameterTypes: ['() => void'],
      parameterDescriptions: ['The callback function to register.'],
    },
    {
      name: 'open(): void',
      description: 'Opens the datepicker\'s calendar popup.',
      returnType: 'void',
    },
    {
      name: 'close(): void',
      description: 'Closes the datepicker\'s calendar popup.',
      returnType: 'void',
    },
  ];

  public pageSelectorMethodConfig: DemoMethodConfig = [
    {
      name: 'hasPreviousPage(): boolean',
      description: 'Date selectors (day, month, year) - Checks if there is a previous page.',
      returnType: 'boolean',
    },
    {
      name: 'gotoPreviousPage()',
      description: 'Date selectors (day, month, year) - Goes to the previous page.',
      returnType: 'void',
    },

    {
      name: 'hasNextPage(): boolean',
      description: 'Date selectors (day, month, year) - Checks if there is a next page.',
      returnType: 'boolean',
    },
    {
      name: 'gotoNextPage()',
      description: 'Date selectors (day, month, year) - Goes to the next page.',
      returnType: 'void',
    },
  ];

  public formFieldDefaults = getDefaultFromDemoConfig<FormFieldInputControls>(this.formFieldInputControlConfig);
  public datepickerDefaults = getDefaultFromDemoConfig<DatepickerInputControls>(this.datepickerInputControlConfig);

  public formFieldModel: FormFieldInputControls = { ...this.formFieldDefaults };
  public datepickerModel: DatepickerInputControls = { ...this.datepickerDefaults };

  public input = '';
  public control = new FormControl('');

  public reset(): void {
    this.formFieldModel = { ...this.formFieldDefaults };
    this.datepickerModel = { ...this.datepickerDefaults };

    this.input = '';
    this.control.setValue('');
  }

  public getMethodConfig(): DemoMethodConfig[] {
    return [
      this.datepickerMethodConfig,
      this.pageSelectorMethodConfig,
    ];
  }
}
