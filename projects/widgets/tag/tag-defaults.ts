import { TagAppearance, TagAppearanceType } from './types/tag-appearance';

import { InjectionToken } from '@angular/core';
import { Size, SizeType, AllVariants, AllVariantsType } from '@i-cell/ids-angular/core';

export interface IdsTagDefaultConfig {
  appearance?: TagAppearanceType,
  size?: SizeType,
  variant?: AllVariantsType,
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
    appearance: TagAppearance.FILLED,
    size: Size.COMFORTABLE,
    variant: AllVariants.PRIMARY,
  };
}

