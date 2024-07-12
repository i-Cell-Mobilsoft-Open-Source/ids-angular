import { CheckboxVariant, CheckboxVariantType } from './types/checkbox-variant';

import { InjectionToken } from '@angular/core';
import { Size, SizeType } from '@i-cell/ids-angular/core';

export interface IdsCheckboxDefaultOptions {
  size?: SizeType
  variant?: CheckboxVariantType
}

export const IDS_CHECKBOX_DEFAULT_OPTIONS = new InjectionToken<IdsCheckboxDefaultOptions>(
  'ids-checkbox-default-options',
  {
    providedIn: 'root',
    factory: IDS_CHECKBOX_DEFAULT_OPTIONS_FACTORY,
  },
);

export function IDS_CHECKBOX_DEFAULT_OPTIONS_FACTORY(): Required<IdsCheckboxDefaultOptions> {
  return {
    size: Size.COMFORTABLE,
    variant: CheckboxVariant.SURFACE,
  };
}
