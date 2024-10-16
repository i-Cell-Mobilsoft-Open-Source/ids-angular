import { IdsFormFieldVariant, IdsFormFieldVariantType } from '../form-field/types/form-field-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsFieldsetDefaultConfig {
  size?: IdsSizeType
  variant?: IdsFormFieldVariantType,
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
    size: IdsSize.COMPACT,
    variant: IdsFormFieldVariant.SURFACE,
  };
}

