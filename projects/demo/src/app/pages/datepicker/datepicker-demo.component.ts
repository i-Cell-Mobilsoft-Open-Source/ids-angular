import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_DATEPICKER_DEFAULT_CONFIG_FACTORY, IdsDatepickerDirective, IdsDatepickerView, IdsDatepickerViewType, IdsDatepickerTriggerComponent } from '@i-cell/ids-angular/datepicker';
import { IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY, IdsErrorMessageComponent, IdsFormFieldComponent, IdsInputDirective, IdsLabelDirective, IdsSuffixDirective, IdsErrorDefinitionDirective } from '@i-cell/ids-angular/forms';
import { TranslateModule } from '@ngx-translate/core';

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

@Component({
  selector: 'app-datepicker-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    IdsSuffixDirective,
    IdsErrorMessageComponent,
    IdsErrorDefinitionDirective,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IdsDatepickerDirective,
    IdsDatepickerTriggerComponent,
  ],
  templateUrl: './datepicker-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './datepicker-demo.component.scss',
  ],
})
export class DatepickerDemoComponent {
  protected _formFieldInputControlConfig: DemoControlConfig<FormFieldInputControls> = {
    size: {
      description: 'Size of the form field.',
      type: 'IdsSizeType',
      default: formFieldDefaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
  };

  protected _datepickerInputControlConfig: DemoControlConfig<DatepickerInputControls> = {
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

  public formFieldDefaults = getDefaultFromDemoConfig<FormFieldInputControls>(this._formFieldInputControlConfig);
  public datepickerDefaults = getDefaultFromDemoConfig<DatepickerInputControls>(this._datepickerInputControlConfig);

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
