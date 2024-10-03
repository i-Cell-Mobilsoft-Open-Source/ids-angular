import { FormFieldVariant, FormFieldVariantType } from '../form-field/types/form-field-variant.type';

import { InjectionToken } from '@angular/core';
import { Size, SizeType } from '@i-cell/ids-angular/core';

export interface IdsFieldsetDefaultConfig {
  size?: SizeType
  variant?: FormFieldVariantType,
}

export const IDS_FIELDSET_DEFAULT_CONFIG = new InjectionToken<IdsFieldsetDefaultConfig>(
  'IDS_FIELDSET_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_FIELDSET_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_FIELDSET_DEFAULT_CONFIG_FACTORY(): Required<IdsFieldsetDefaultConfig> {
  return {
    size: Size.COMPACT,
    variant: FormFieldVariant.SURFACE,
  };
}

