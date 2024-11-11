import { IdsChipAppearance, IdsChipAppearanceType } from './types/chip-appearance.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsChipGroupDefaultConfig {
  appearance?: IdsChipAppearanceType
  size?: IdsSizeType
}

export const IDS_CHIP_GROUP_DEFAULT_CONFIG = new InjectionToken<IdsChipGroupDefaultConfig>(
  'IDS_CHIP_GROUP_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_CHIP_GROUP_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_CHIP_GROUP_DEFAULT_CONFIG_FACTORY(): Required<IdsChipGroupDefaultConfig> {
  return {
    appearance: IdsChipAppearance.FILLED,
    size: IdsSize.COMPACT,
  };
}
