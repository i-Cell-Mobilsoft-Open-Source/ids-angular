import { CardAppearance, CardAppearanceType } from './types/card-appearances.type';

import { InjectionToken } from '@angular/core';
import { Size, SizeType, AllVariants, AllVariantsType, OrientationType, Orientation } from '@i-cell/ids-angular/core';

export interface IdsCardDefaultConfig {
  appearance?: CardAppearanceType,
  size?: SizeType,
  variant?: AllVariantsType,
  orientation?: OrientationType,
}

export const IDS_CARD_DEFAULT_CONFIG = new InjectionToken<IdsCardDefaultConfig>(
  'IDS_CARD_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_CARD_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_CARD_DEFAULT_CONFIG_FACTORY(): Required<IdsCardDefaultConfig> {
  return {
    appearance: CardAppearance.FILLED,
    size: Size.COMFORTABLE,
    variant: AllVariants.SURFACE,
    orientation: Orientation.VERTICAL,
  };
}

