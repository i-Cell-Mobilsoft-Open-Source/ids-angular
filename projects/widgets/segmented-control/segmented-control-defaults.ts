import { SegmentedControlAppearance, SegmentedControlAppearanceType } from './types/segmented-control-appearance.type';
import { SegmentedControlVariant, SegmentedControlVariantType } from './types/segmented-control-variant.type';

import { InjectionToken } from '@angular/core';
import { Size, SizeType } from '@i-cell/ids-angular/core';

export interface IdsSegmentedControlDefaultConfig {
  appearance?: SegmentedControlAppearanceType
  size?: SizeType
  variant?: SegmentedControlVariantType
}

export const IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG = new InjectionToken<IdsSegmentedControlDefaultConfig>(
  'IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG_FACTORY(): Required<IdsSegmentedControlDefaultConfig> {
  return {
    appearance: SegmentedControlAppearance.FILLED,
    size: Size.COMFORTABLE,
    variant: SegmentedControlVariant.SURFACE,
  };
}
