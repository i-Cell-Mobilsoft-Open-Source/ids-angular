import { UpperCasePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsFormFieldVariant, IdsFormFieldVariantType, IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY, IdsActionDirective, IdsErrorMessageComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsInputDirective, IdsLabelDirective, IdsPrefixDirective, IdsSuccessMessageComponent, IdsSuffixDirective, IdsValidators } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { TranslateModule } from '@ngx-translate/core';

type FormFieldPublicApi = {
  size: IdsSizeType,
  variant: IdsFormFieldVariantType,
};

type FormFieldHelperControls = {
  hasLeadingIcon: boolean,
  hasPrefix: boolean,
  prefix: string,
  hasSuffix: boolean,
  suffix: string,
  hasTrailingIcon: boolean,
  hasAction: boolean,
  label: string,
  hintMessage: string,
};

type InputPublicApi = {
  placeholder: string,
  value: string,
  readonly: boolean,
  disabled: boolean,
  canHandleSuccessState: boolean,
};

type InputHelperControls = {
  hasRequiredValidator: boolean,
};

const defaultConfig = IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'app-form-field-demo',
  standalone: true,
  imports: [
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    IdsPrefixDirective,
    IdsSuffixDirective,
    IdsActionDirective,
    IdsIconButtonComponent,
    IdsIconComponent,
    IdsHintMessageComponent,
    IdsSuccessMessageComponent,
    IdsErrorMessageComponent,
    FormsModule,
    ReactiveFormsModule,
    UpperCasePipe,
    TranslateModule,
    IdsButtonComponent,
  ],
  templateUrl: './form-field-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './form-field-demo.component.scss',
  ],
})
export class FormFieldDemoComponent implements OnInit {
  public sizes = Object.values<IdsSizeType>(IdsSize);
  public variants = Object.values<IdsFormFieldVariantType>(IdsFormFieldVariant);

  public formFieldDefaults: FormFieldPublicApi & FormFieldHelperControls = {
    size: defaultConfig.size,
    variant: defaultConfig.variant,
    hasLeadingIcon: true,
    hasPrefix: true,
    prefix: 'Prefix',
    hasSuffix: true,
    suffix: 'Suffix',
    hasTrailingIcon: true,
    hasAction: true,
    label: 'Form field label',
    hintMessage: 'Type a value',
  };

  public formFieldModel: FormFieldPublicApi & FormFieldHelperControls = { ...this.formFieldDefaults };

  public inputDefaults: InputPublicApi & InputHelperControls = {
    placeholder: 'Placeholder',
    value: 'Sample value',
    readonly: false,
    disabled: false,
    canHandleSuccessState: true,
    hasRequiredValidator: true,
  };

  public inputModel: InputPublicApi & InputHelperControls = { ...this.inputDefaults };

  public form = new FormGroup({
    input: new FormControl<string>(this.inputModel.value),
    textarea: new FormControl<string>(this.inputModel.value),
  });

  public ngOnInit(): void {
    this.setDisabledState(this.inputModel.disabled);
    this.setRequiredValidator(this.inputModel.hasRequiredValidator);
  }

  public reset(): void {
    this.formFieldModel = { ...this.formFieldDefaults };
    this.inputModel = { ...this.inputDefaults };
    this.setDisabledState(this.inputModel.disabled);
    this.setRequiredValidator(this.inputModel.hasRequiredValidator);
    this.form.reset({
      input: this.inputModel.value,
      textarea: this.inputModel.value,
    });
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.form.disable();
    } else {
      this.form.enable();
    }
  }

  public setRequiredValidator(hasRequiredValidator: boolean): void {
    if (hasRequiredValidator) {
      this.form.controls.input.setValidators(IdsValidators.required);
      this.form.controls.textarea.setValidators(IdsValidators.required);
    } else {
      this.form.controls.input.clearValidators();
      this.form.controls.textarea.clearValidators();
    }

    this.form.controls.input.updateValueAndValidity();
    this.form.controls.textarea.updateValueAndValidity();
  }
}
