import { IdsTagAppearance, IdsTagAppearanceType } from './types/tag-appearance.type';
import { IdsTagVariant, IdsTagVariantType } from './types/tag-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsTagDefaultConfig {
  appearance?: IdsTagAppearanceType,
  size?: IdsSizeType,
  variant?: IdsTagVariantType,
}

export const IDS_TAG_DEFAULT_CONFIG = new InjectionToken<IdsTagDefaultConfig>(
  'IDS_TAG_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_TAG_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_TAG_DEFAULT_CONFIG_FACTORY(): Required<IdsTagDefaultConfig> {
  return {
    appearance: IdsTagAppearance.FILLED,
    size: IdsSize.COMPACT,
    variant: IdsTagVariant.PRIMARY,
  };
}

