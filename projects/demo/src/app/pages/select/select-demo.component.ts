import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { KeyValuePipe, TitleCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsFormFieldVariant, IdsFormFieldVariantType, IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY, IdsErrorMessageComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsLabelDirective, IdsOptionComponent, IdsOptionGroupComponent } from '@i-cell/ids-angular/forms';
import { IDS_SELECT_DEFAULT_CONFIG_FACTORY, IdsSelectComponent, IdsSelectTriggerDirective } from '@i-cell/ids-angular/select';
import { TranslateModule } from '@ngx-translate/core';

const formFieldDefaultConfig = IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY();

const selectDefaultConfig = IDS_SELECT_DEFAULT_CONFIG_FACTORY();

type FormFieldInputControls = {
  size: IdsSizeType,
  variant: IdsFormFieldVariantType,
};

type SelectInputControls = {
  placeholder: string,
  readonly: boolean,
  'aria-label': string
  'aria-labelledby': string
  typeaheadDebounceInterval: number
};

type SelectHelperControls = {
  useCustomTrigger: boolean,
};

type SampleOption = {
  value: string
  viewValue: string
};

type AnimalOptions = {
  land: SampleOption[]
  aquatic: SampleOption[]
};

@Component({
  selector: 'app-select-demo',
  standalone: true,
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsSelectComponent,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
    FormsModule,
    TranslateModule,
    IdsOptionComponent,
    IdsOptionGroupComponent,
    IdsSelectTriggerDirective,
    KeyValuePipe,
    TitleCasePipe,
  ],
  templateUrl: './select-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './select-demo.component.scss',
  ],
})
export class SelectDemoComponent {
  protected _formFieldInputControlConfig: DemoControlConfig<FormFieldInputControls> = {
    size: {
      description: 'Form field size.',
      type: 'IdsSizeType',
      default: formFieldDefaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Form field variant.',
      type: 'IdsFormFieldVariantType',
      default: formFieldDefaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsFormFieldVariant),
    },
  };

  protected _selectInputControlConfig: DemoControlConfig<SelectInputControls> = {
    placeholder: {
      description: 'Select placeholder.',
      type: 'string',
      default: '-',
      demoDefault: 'Select animal',
    },
    readonly: {
      description: 'Whether select is readonly or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
    'aria-label': {
      description: 'aria-label tag for select.',
      type: 'string',
      default: '-',
      demoDefault: 'animal',
    },
    'aria-labelledby': {
      description: 'aria-labelledby tag for select.',
      type: 'string',
      default: '-',
      demoDefault: 'animal',
    },
    typeaheadDebounceInterval: {
      description: 'Number in millisec. Can not overwrite at runtime.',
      type: 'number',
      default: selectDefaultConfig.typeaheadDebounceInterval,
      min: 0,
      step: 100,
      disabled: true,
    },
  };

  protected _selectHelperControlConfig: DemoControlConfig<SelectHelperControls> = {
    useCustomTrigger: {
      description: 'Whether select has custom trigger or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
  };

  public formFieldDefaults = getDefaultFromDemoConfig<FormFieldInputControls>(this._formFieldInputControlConfig);
  public selectDefaults = getDefaultFromDemoConfig<SelectInputControls>(this._selectInputControlConfig);
  public selectHelperDefaults = getDefaultFromDemoConfig<SelectHelperControls>(this._selectHelperControlConfig);

  public formFieldModel: FormFieldInputControls = { ...this.formFieldDefaults };
  public selectModel: SelectInputControls = { ...this.selectDefaults };
  public selectHelperModel: SelectHelperControls = { ...this.selectHelperDefaults };

  public animals: AnimalOptions = {
    land: [
      { viewValue: 'Dog', value: 'dog' },
      { viewValue: 'Cat', value: 'cat' },
      { viewValue: 'Giraffe', value: 'giraffe' },
      { viewValue: 'Orangutan', value: 'orangutan' },
      { viewValue: 'Mammoth', value: 'mammoth' },
      { viewValue: 'Opisthocoelicaudia Skarzynski', value: 'opisthocoelicaudia skarzynski' },
    ],
    aquatic: [
      { viewValue: 'Crocodile', value: 'crocodile' },
      { viewValue: 'Whale', value: 'whale' },
      { viewValue: 'Dolphin', value: 'doplhin' },
      { viewValue: 'Shark', value: 'shark' },
    ],
  };

  public singleSelectionValue: string = this.animals.land[0].value;
  public multiSelectionValue: string[] = [
    this.animals.land[0].value,
    this.animals.land[2].value,
    this.animals.aquatic[1].value,
  ];

  public reset(): void {
    this.formFieldModel = { ...this.formFieldDefaults };
    this.selectModel = { ...this.selectDefaults };
    this.selectHelperModel = { ...this.selectHelperDefaults };
  }
}
