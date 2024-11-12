import { IdsSegmentedControlToggleAppearance, IdsSegmentedControlToggleAppearanceType } from './types/segmented-control-toggle-appearance.type';
import { IdsSegmentedControlToggleButtonVariant, IdsSegmentedControlToggleButtonVariantType, IdsSegmentedControlToggleVariant, IdsSegmentedControlToggleVariantType } from './types/segmented-control-toggle-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsSegmentedControlToggleDefaultConfig {
  appearance?: IdsSegmentedControlToggleAppearanceType
  size?: IdsSizeType
  variant?: IdsSegmentedControlToggleVariantType
  buttonVariant?: IdsSegmentedControlToggleButtonVariantType
}

export const IDS_SEGMENTED_CONTROL_TOGGLE_DEFAULT_CONFIG = new InjectionToken<IdsSegmentedControlToggleDefaultConfig>(
  'IDS_SEGMENTED_CONTROL_TOGGLE_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_SEGMENTED_CONTROL_TOGGLE_DEFAULT_CONFIG_FACTORY,
  },
);

// eslint-disable-next-line id-length
export function IDS_SEGMENTED_CONTROL_TOGGLE_DEFAULT_CONFIG_FACTORY(): Required<IdsSegmentedControlToggleDefaultConfig> {
  return {
    appearance: IdsSegmentedControlToggleAppearance.FILLED,
    size: IdsSize.COMPACT,
    variant: IdsSegmentedControlToggleVariant.SURFACE,
    buttonVariant: IdsSegmentedControlToggleButtonVariant.SURFACE,
  };
}
