import { IdsSegmentedControlAppearance, IdsSegmentedControlAppearanceType } from './types/segmented-control-appearance.type';
import { IdsSegmentedControlVariant, IdsSegmentedControlVariantType } from './types/segmented-control-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsSegmentedControlDefaultConfig {
  appearance?: IdsSegmentedControlAppearanceType
  size?: IdsSizeType
  variant?: IdsSegmentedControlVariantType
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
    appearance: IdsSegmentedControlAppearance.FILLED,
    size: IdsSize.COMFORTABLE,
    variant: IdsSegmentedControlVariant.SURFACE,
  };
}
