import { IdsCardAppearance, IdsCardAppearanceType } from './types/card-appearances.type';
import { IdsCardVariant, IdsCardVariantType } from './types/card-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType, IdsOrientationType, IdsOrientation } from '@i-cell/ids-angular/core';

export interface IdsCardDefaultConfig {
  appearance?: IdsCardAppearanceType,
  size?: IdsSizeType,
  variant?: IdsCardVariantType,
  orientation?: IdsOrientationType,
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
    appearance: IdsCardAppearance.FILLED,
    size: IdsSize.COMPACT,
    variant: IdsCardVariant.SURFACE,
    orientation: IdsOrientation.VERTICAL,
  };
}

