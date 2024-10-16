import { IdsTagAppearance, IdsTagAppearanceType } from './types/tag-appearance.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType, IdsAllVariants, IdsAllVariantsType } from '@i-cell/ids-angular/core';

export interface IdsTagDefaultConfig {
  appearance?: IdsTagAppearanceType,
  size?: IdsSizeType,
  variant?: IdsAllVariantsType,
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
    size: IdsSize.COMFORTABLE,
    variant: IdsAllVariants.PRIMARY,
  };
}

