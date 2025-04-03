import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsFormFieldVariant, IdsFormFieldVariantType, IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY, IdsErrorMessageComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsInputDirective, IdsLabelDirective, IdsPrefixDirective, IdsSuffixDirective, IdsFormFieldActionDirective, IdsErrorDefinitionDirective, IdsSuccessMessageComponent } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { TranslateModule } from '@ngx-translate/core';

const defaultConfig = IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY();

type FormFieldInputControls = {
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

type InputInputControls = {
  placeholder: string,
  readonly: boolean,
  disabled: boolean,
  required: boolean,
  canHandleSuccessState: boolean,
};

@Component({
  selector: 'app-form-field-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsFormFieldComponent,
    IdsLabelDirective,
    IdsInputDirective,
    IdsPrefixDirective,
    IdsSuffixDirective,
    IdsFormFieldActionDirective,
    IdsIconButtonComponent,
    IdsIconComponent,
    IdsHintMessageComponent,
    IdsErrorMessageComponent,
    IdsErrorDefinitionDirective,
    IdsSuccessMessageComponent,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,
  ],
  templateUrl: './form-field-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './form-field-demo.component.scss',
  ],
})
export class FormFieldDemoComponent {
  protected _formFieldInputControlConfig: DemoControlConfig<FormFieldInputControls> = {
    size: {
      description: 'Size of the form field.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Variant of the form field.',
      type: 'IdsFormFieldVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsFormFieldVariant),
    },
  };

  protected _formFieldHelperControlConfig: DemoControlConfig<FormFieldHelperControls> = {
    hasLeadingIcon: {
      description: 'Whether the form field has leading icon or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
    hasPrefix: {
      description: 'Whether the form field has prefix or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
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
      control: DemoControl.CHECKBOX,
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
      control: DemoControl.CHECKBOX,
    },
    hasAction: {
      description: 'Whether the form field has action or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
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
  };

  protected _inputInputControlConfig: DemoControlConfig<InputInputControls> = {
    placeholder: {
      description: 'Input / textarea placeholder.',
      type: 'string',
      default: '-',
      demoDefault: 'Placeholder',
    },
    readonly: {
      description: 'Whether input / textarea is readonly or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
    disabled: {
      description: 'Whether input / textarea is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
      onModelChange: (disable?: boolean) => {
        if (disable) {
          this.textarea.disable();
        } else {
          this.textarea.enable();
        }
      },
    },
    required: {
      description: 'Whether input / textarea is required or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
      onModelChange: (isRequired?: boolean) => {
        if (isRequired) {
          this.textarea.addValidators(Validators.required);
        } else {
          this.textarea.removeValidators(Validators.required);
        }
      },
    },
    canHandleSuccessState: {
      description: 'Whether input / textarea can handle success state with a success state matcher.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
  };

  public formFieldDefaults = getDefaultFromDemoConfig<FormFieldInputControls>(this._formFieldInputControlConfig);
  public formFieldHelperDefaults = getDefaultFromDemoConfig<FormFieldHelperControls>(this._formFieldHelperControlConfig);
  public inputDefaults = getDefaultFromDemoConfig<InputInputControls>(this._inputInputControlConfig);

  public formFieldModel: FormFieldInputControls = { ...this.formFieldDefaults };
  public formFieldHelperModel: FormFieldHelperControls = { ...this.formFieldHelperDefaults };
  public inputModel: InputInputControls = { ...this.inputDefaults };

  public input = '';
  public textarea = new FormControl('');

  public reset(): void {
    this.formFieldModel = { ...this.formFieldDefaults };
    this.formFieldHelperModel = { ...this.formFieldHelperDefaults };
    this.inputModel = { ...this.inputDefaults };

    this.input = '';
    this.textarea.setValue('');
  }
}
