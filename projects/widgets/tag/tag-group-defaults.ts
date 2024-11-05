import { IdsTagAppearance, IdsTagAppearanceType } from './types/tag-appearance.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsTagGroupDefaultConfig {
  appearance?: IdsTagAppearanceType,
  size?: IdsSizeType,
}

export const IDS_TAG_GROUP_DEFAULT_CONFIG = new InjectionToken<IdsTagGroupDefaultConfig>(
  'IDS_TAG_GROUP_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_TAG_GROUP_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_TAG_GROUP_DEFAULT_CONFIG_FACTORY(): Required<IdsTagGroupDefaultConfig> {
  return {
    appearance: IdsTagAppearance.FILLED,
    size: IdsSize.COMPACT,
  };
}

