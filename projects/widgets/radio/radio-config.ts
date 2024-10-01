import { RadioVariant, RadioVariantType } from './types/radio-variant';

import { InjectionToken } from '@angular/core';
import { Orientation, OrientationType, Position, PositionType, Size, SizeType } from '@i-cell/ids-angular/core';

export interface IdsRadioDefaultOptions {
  size?: SizeType
  variant?: RadioVariantType
  orientation?: OrientationType
  labelPosition?: PositionType
}

export const IDS_RADIO_DEFAULT_OPTIONS = new InjectionToken<IdsRadioDefaultOptions>(
  'IDS_RADIO_DEFAULT_OPTIONS',
  {
    providedIn: 'root',
    factory: IDS_RADIO_DEFAULT_OPTIONS_FACTORY,
  },
);

export function IDS_RADIO_DEFAULT_OPTIONS_FACTORY(): Required<IdsRadioDefaultOptions> {
  return {
    size: Size.COMFORTABLE,
    variant: RadioVariant.SURFACE,
    orientation: Orientation.VERTICAL,
    labelPosition: Position.RIGHT,
  };
}
