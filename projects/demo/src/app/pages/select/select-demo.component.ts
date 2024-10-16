import { KeyValuePipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsFormFieldVariant, IdsFormFieldVariantType, IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY, IdsErrorMessageComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsLabelDirective, IdsOptionComponent, IdsOptionGroupComponent, IdsSuccessMessageComponent, IdsValidators } from '@i-cell/ids-angular/forms';
import { IDS_SELECT_DEFAULT_CONFIG_FACTORY, IdsSelectComponent, IdsSelectTriggerDirective } from '@i-cell/ids-angular/select';
import { TranslateModule } from '@ngx-translate/core';

type FormFieldPublicApi = {
  size: IdsSizeType,
  variant: IdsFormFieldVariantType,
};

const formFieldDefaultConfig = IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY();

type SelectPublicApi = {
  placeholder: string,
  readonly: boolean,
  ariaLabel: string
  ariaLabelledBy: string
  typeaheadDebounceInterval: number
};

type SelectHelperControls = {
  hasRequiredValidator: boolean,
  useCustomTrigger: boolean,
};

const selectDefaultConfig = IDS_SELECT_DEFAULT_CONFIG_FACTORY();

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
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsSelectComponent,
    IdsHintMessageComponent,
    IdsSuccessMessageComponent,
    IdsErrorMessageComponent,
    UpperCasePipe,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
    IdsOptionComponent,
    IdsOptionGroupComponent,
    IdsSelectTriggerDirective,
    IdsButtonComponent,
    KeyValuePipe,
    TitleCasePipe,
  ],
  templateUrl: './select-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './select-demo.component.scss',
  ],
})
export class SelectDemoComponent implements OnInit {
  public sizes = Object.values<IdsSizeType>(IdsSize);
  public variants = Object.values<IdsFormFieldVariantType>(IdsFormFieldVariant);

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

  public defaults: SelectPublicApi & SelectHelperControls = {
    placeholder: 'Select animal',
    readonly: false,
    ariaLabel: 'arialabeltest',
    ariaLabelledBy: 'arialabelledbytest',
    typeaheadDebounceInterval: selectDefaultConfig.typeaheadDebounceInterval,
    hasRequiredValidator: true,
    useCustomTrigger: false,
  };

  public model: SelectPublicApi & SelectHelperControls = { ...this.defaults };

  public formFieldDefaults: FormFieldPublicApi = {
    size: formFieldDefaultConfig.size,
    variant: formFieldDefaultConfig.variant,
  };

  public formFieldModel: FormFieldPublicApi = { ...this.formFieldDefaults };

  public form = new FormGroup({
    single: new FormControl<string>(this.singleSelectionValue),
    multi: new FormControl<string[]>(this.multiSelectionValue),
  });

  public ngOnInit(): void {
    this.setRequiredValidator(this.model.hasRequiredValidator);
  }

  public resetFormField(): void {
    this.formFieldModel = { ...this.formFieldDefaults };
  }
  
  public resetSelect(): void {
    this.model = { ...this.defaults };
    this.form.reset({
      single: this.singleSelectionValue,
      multi: this.multiSelectionValue,
    });
    this.setRequiredValidator(this.model.hasRequiredValidator);
  }

  public setRequiredValidator(hasRequiredValidator: boolean): void {
    if (hasRequiredValidator) {
      this.form.controls.single.setValidators(IdsValidators.required);
      this.form.controls.multi.setValidators(IdsValidators.required);
    } else {
      this.form.controls.single.clearValidators();
      this.form.controls.multi.clearValidators();
    }

    this.form.controls.single.updateValueAndValidity();
    this.form.controls.multi.updateValueAndValidity();
  }
}
