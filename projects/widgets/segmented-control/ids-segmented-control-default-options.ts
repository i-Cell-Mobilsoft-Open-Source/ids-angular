import { SegmentedControlAppearance, SegmentedControlAppearanceType } from './types/ids-semneted-control-appearance';
import { SegmentedControlVariant, SegmentedControlVariantType } from './types/ids-semneted-control-variant';

import { InjectionToken } from '@angular/core';
import { Size, SizeType } from '@i-cell/ids-angular/core';

export interface IdsSegmentedControlDefaultOptions {
  appearance?: SegmentedControlAppearanceType
  size?: SizeType
  variant?: SegmentedControlVariantType
}

export const IDS_SEGMENTED_CONTROL_DEFAULT_OPTIONS = new InjectionToken<IdsSegmentedControlDefaultOptions>(
  'IDS_SEGMENTED_CONTROL_DEFAULT_OPTIONS',
  {
    providedIn: 'root',
    factory: IDS_SEGMENTED_CONTROL_DEFAULT_OPTIONS_FACTORY,
  },
);

export function IDS_SEGMENTED_CONTROL_DEFAULT_OPTIONS_FACTORY(): Required<IdsSegmentedControlDefaultOptions> {
  return {
    appearance: SegmentedControlAppearance.FILLED,
    size: Size.COMFORTABLE,
    variant: SegmentedControlVariant.SURFACE,
  };
}
