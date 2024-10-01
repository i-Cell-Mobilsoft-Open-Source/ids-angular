import { FormFieldVariant, FormFieldVariantType } from './types/form-field-variant.type';

import { InjectionToken } from '@angular/core';
import { Size, SizeType } from '@i-cell/ids-angular/core';

export interface IdsFormFieldDefaultOptions {
  size?: SizeType
  variant?: FormFieldVariantType
}

export const IDS_FORM_FIELD_DEFAULT_OPTIONS = new InjectionToken<IdsFormFieldDefaultOptions>(
  'IDS_FORM_FIELD_DEFAULT_OPTIONS',
  {
    providedIn: 'root',
    factory: IDS_FORM_FIELD_DEFAULT_OPTIONS_FACTORY,
  },
);

export function IDS_FORM_FIELD_DEFAULT_OPTIONS_FACTORY(): Required<IdsFormFieldDefaultOptions> {
  return {
    size: Size.COMPACT,
    variant: FormFieldVariant.SURFACE,
  };
}
