import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { UpperCasePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsFormFieldVariant, IdsFormFieldVariantType, IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY, IdsActionDirective, IdsErrorMessageComponent, IdsFormFieldComponent, IdsHintMessageComponent, IdsInputDirective, IdsLabelDirective, IdsPrefixDirective, IdsSuccessMessageComponent, IdsSuffixDirective } from '@i-cell/ids-angular/forms';
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
  standalone: true,
  imports: [
    TryoutComponent,
    ControlTableComponent,
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
  styleUrl: './form-field-demo.component.scss',
})
export class FormFieldDemoComponent {
  protected _formFieldInputControlConfig: DemoControlConfig<FormFieldInputControls> = {
    size: {
      description: 'Size of the form field.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Variant of the form field.',
      type: 'IdsFormFieldVariantType',
      default: defaultConfig.variant,
      control: 'select',
      list: convertEnumToStringArray(IdsFormFieldVariant),
    },
  };

  protected _formFieldHelperControlConfig: DemoControlConfig<FormFieldHelperControls> = {
    hasLeadingIcon: {
      description: 'Whether the form field has leading icon or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
    hasPrefix: {
      description: 'Whether the form field has prefix or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
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
      control: 'checkbox',
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
      control: 'checkbox',
    },
    hasAction: {
      description: 'Whether the form field has action or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
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
      control: 'checkbox',
    },
    disabled: {
      description: 'Whether input / textarea is disabled or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
    required: {
      description: 'Whether input / textarea is required or not.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
    canHandleSuccessState: {
      // eslint-disable-next-line @stylistic/js/max-len
      description: 'Whether input / textarea can handle success state with a success state matcher. This property works only on init, so it can not be chnaged.',
      type: 'boolean',
      default: false,
      control: 'checkbox',
    },
  };

  public formFieldDefaults = getDefaultFromDemoConfig<FormFieldInputControls>(this._formFieldInputControlConfig);
  public formFieldHelperDefaults = getDefaultFromDemoConfig<FormFieldHelperControls>(this._formFieldHelperControlConfig);
  public inputDefaults = getDefaultFromDemoConfig<InputInputControls>(this._inputInputControlConfig);

  public formFieldModel: FormFieldInputControls = { ...this.formFieldDefaults };
  public formFieldHelperModel: FormFieldHelperControls = { ...this.formFieldHelperDefaults };
  public inputModel: InputInputControls = { ...this.inputDefaults };

  public input = '';
  public textarea = '';

  public reset(): void {
    this.formFieldModel = { ...this.formFieldDefaults };
    this.formFieldHelperModel = { ...this.formFieldHelperDefaults };
    this.inputModel = { ...this.inputDefaults };
  }
}
