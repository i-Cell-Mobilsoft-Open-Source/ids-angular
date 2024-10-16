import { IdsFormFieldVariant, IdsFormFieldVariantType } from './types/form-field-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsFormFieldDefaultConfig {
  size?: IdsSizeType
  variant?: IdsFormFieldVariantType
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
    size: IdsSize.COMPACT,
    variant: IdsFormFieldVariant.SURFACE,
  };
}
