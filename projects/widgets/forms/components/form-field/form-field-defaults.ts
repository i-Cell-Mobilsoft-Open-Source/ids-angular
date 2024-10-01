import { FormFieldVariant, FormFieldVariantType } from './types/form-field-variant.type';

import { InjectionToken } from '@angular/core';
import { Size, SizeType } from '@i-cell/ids-angular/core';

export interface IdsFormFieldDefaultConfig {
  size?: SizeType
  variant?: FormFieldVariantType
}

export const IDS_FORM_FIELD_DEFAULT_CONFIG = new InjectionToken<IdsFormFieldDefaultConfig>(
  'IDS_FORM_FIELD_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_FORM_FIELD_DEFAULT_CONFIG_FACTORY(): Required<IdsFormFieldDefaultConfig> {
  return {
    size: Size.COMPACT,
    variant: FormFieldVariant.SURFACE,
  };
}
