import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY, IdsFormFieldVariant, IdsFormFieldVariantType } from '@i-cell/ids-angular/forms';

const defaultConfig = IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY();

export type FormFieldInputControls = {
  size: IdsSizeType,
  variant: IdsFormFieldVariantType,
};

export type FormFieldInputHelperControls = {
  hasLeadingIcon: boolean,
  hasPrefix: boolean,
  prefix: string,
  hasSuffix: boolean,
  suffix: string,
  hasTrailingIcon: boolean,
  hasAction: boolean,
  label: string,
  hintMessage: string,
  dynamicRequired: boolean,
};

export type FormFieldTextareaHelperControls = {
  label: string,
  hintMessage: string,
};

export type InputInputControls = {
  placeholder: string,
  readonly: boolean,
  disabled: boolean,
  required: boolean,
  canHandleSuccessState: boolean,
};

export const formFieldInputControlConfig: DemoControlConfig<FormFieldInputControls> = {
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

export const formFieldMethodControlConfig: DemoMethodConfig = [
  {
    name: 'getConnectedOverlayOrigin()',
    description: 'Gets the connected overlay origin element. This is the element to which the overlay will be connected.',
    returnType: 'ElementRef',
  },
  {
    name: 'containerClick(event: MouseEvent)',
    description: 'Simulates a click on the form field container. ' +
                ' This is used to test if the form field can handle clicks on the container.',
    returnType: 'void',
    parameters: ['event'],
    parameterTypes: ['MouseEvent'],
    parameterDescriptions: ['The click event.'],
  },
];

export const formFieldDefaults = getDefaultFromDemoConfig<FormFieldInputControls>(formFieldInputControlConfig);
