import { IdsChipAppearance, IdsChipAppearanceType } from './public-api';
import { IdsChipVariant, IdsChipVariantType } from './types/chip-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsChipDefaultConfig {
  removable: boolean
  appearance?: IdsChipAppearanceType
  size?: IdsSizeType
  variant?: IdsChipVariantType
}

export const IDS_CHIP_DEFAULT_CONFIG = new InjectionToken<IdsChipDefaultConfig>(
  'IDS_CHIP_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_CHIP_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_CHIP_DEFAULT_CONFIG_FACTORY(): Required<IdsChipDefaultConfig> {
  return {
    removable: false,
    appearance: IdsChipAppearance.FILLED,
    size: IdsSize.COMPACT,
    variant: IdsChipVariant.SURFACE,
  };
}
