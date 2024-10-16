import { IdsCheckboxVariant, IdsCheckboxVariantType } from './types/checkbox-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsCheckboxDefaultConfig {
  size?: IdsSizeType
  variant?: IdsCheckboxVariantType
}

export const IDS_CHECKBOX_DEFAULT_CONFIG = new InjectionToken<IdsCheckboxDefaultConfig>(
  'IDS_CHECKBOX_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY(): Required<IdsCheckboxDefaultConfig> {
  return {
    size: IdsSize.COMPACT,
    variant: IdsCheckboxVariant.SURFACE,
  };
}
