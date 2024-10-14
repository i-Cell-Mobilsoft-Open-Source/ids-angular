import { InjectionToken } from '@angular/core';
import { Size, SizeType, AllVariants, AllVariantsType, OrientationType, Orientation } from '@i-cell/ids-angular/core';

export interface IdsDividerDefaultConfig {
  size?: SizeType,
  variant?: AllVariantsType,
  orientation?: OrientationType,
}

export const IDS_DIVIDER_DEFAULT_CONFIG = new InjectionToken<IdsDividerDefaultConfig>(
  'IDS_DIVIDER_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_DIVIDER_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_DIVIDER_DEFAULT_CONFIG_FACTORY(): Required<IdsDividerDefaultConfig> {
  return {
    size: Size.COMFORTABLE,
    variant: AllVariants.PRIMARY,
    orientation: Orientation.HORIZONTAL,
  };
}

