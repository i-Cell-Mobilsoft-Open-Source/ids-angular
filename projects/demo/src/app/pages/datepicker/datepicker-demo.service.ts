import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
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
}
