import { CheckboxVariant, CheckboxVariantType } from './types/checkbox-variant';

import { InjectionToken } from '@angular/core';
import { Size, SizeType } from '@i-cell/ids-angular/core';

export interface IdsCheckboxDefaultConfig {
  size?: SizeType
  variant?: CheckboxVariantType
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
    size: Size.COMFORTABLE,
    variant: CheckboxVariant.SURFACE,
  };
}
