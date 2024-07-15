import { InjectionToken } from '@angular/core';
import { ChipAppearance, ChipAppearanceType, Size, SizeType, SurfaceVariant, SurfaceVariantType } from '@i-cell/ids-angular/core';

export interface IdsChipDefaultOptions {
  appearance?: ChipAppearanceType
  size?: SizeType
  variant?: SurfaceVariantType
}

export const IDS_CHIP_DEFAULT_OPTIONS = new InjectionToken<IdsChipDefaultOptions>(
  'ids-chip-default-options',
  {
    providedIn: 'root',
    factory: IDS_CHIP_DEFAULT_OPTIONS_FACTORY,
  },
);

export function IDS_CHIP_DEFAULT_OPTIONS_FACTORY(): Required<IdsChipDefaultOptions> {
  return {
    appearance: ChipAppearance.FILLED,
    size: Size.COMPACT,
    variant: SurfaceVariant.SURFACE,
  };
}
