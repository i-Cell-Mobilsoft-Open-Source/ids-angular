import { IconButtonAppearance, IconButtonAppearanceType } from './types/icon-button-appearance';

import { InjectionToken } from '@angular/core';
import { Size, SizeType, AllVariants, AllVariantsType } from '@i-cell/ids-angular/core';

export interface IdsIconButtonDefaultConfig {
  appearance?: IconButtonAppearanceType,
  size?: SizeType,
  variant?: AllVariantsType,
}

export const IDS_ICON_BUTTON_DEFAULT_CONFIG = new InjectionToken<IdsIconButtonDefaultConfig>(
  'IDS_ICON_BUTTON_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_ICON_BUTTON_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_ICON_BUTTON_DEFAULT_CONFIG_FACTORY(): Required<IdsIconButtonDefaultConfig> {
  return {
    appearance: IconButtonAppearance.FILLED,
    size: Size.COMFORTABLE,
    variant: AllVariants.PRIMARY,
  };
}

