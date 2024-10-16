import { ButtonAppearance, ButtonAppearanceType } from './types/button-appearance.type';

import { InjectionToken } from '@angular/core';
import { Size, SizeType, AllVariants, AllVariantsType } from '@i-cell/ids-angular/core';

export interface IdsButtonDefaultConfig {
  appearance?: ButtonAppearanceType,
  size?: SizeType,
  variant?: AllVariantsType,
}

export const IDS_BUTTON_DEFAULT_CONFIG = new InjectionToken<IdsButtonDefaultConfig>(
  'IDS_BUTTON_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_BUTTON_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_BUTTON_DEFAULT_CONFIG_FACTORY(): Required<IdsButtonDefaultConfig> {
  return {
    appearance: ButtonAppearance.FILLED,
    size: Size.COMFORTABLE,
    variant: AllVariants.PRIMARY,
  };
}

