import { IdsChipAppearance, IdsChipAppearanceType } from './public-api';
import { IdsChipVariant, IdsChipVariantType } from './types/chip-variant.type';

import { InjectionToken } from '@angular/core';
import { Size, SizeType } from '@i-cell/ids-angular/core';

export interface IdsChipDefaultConfig {
  closable: boolean
  appearance?: IdsChipAppearanceType
  size?: SizeType
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
    closable: false,
    appearance: IdsChipAppearance.FILLED,
    size: Size.COMPACT,
    variant: IdsChipVariant.SURFACE,
  };
}
