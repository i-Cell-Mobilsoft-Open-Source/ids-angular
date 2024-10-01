import { RadioVariant, RadioVariantType } from './types/radio-variant';

import { InjectionToken } from '@angular/core';
import { Orientation, OrientationType, Position, PositionType, Size, SizeType } from '@i-cell/ids-angular/core';

export interface IdsRadioDefaultConfig {
  size?: SizeType
  variant?: RadioVariantType
  orientation?: OrientationType
  labelPosition?: PositionType
}

export const IDS_RADIO_DEFAULT_CONFIG = new InjectionToken<IdsRadioDefaultConfig>(
  'IDS_RADIO_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_RADIO_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_RADIO_DEFAULT_CONFIG_FACTORY(): Required<IdsRadioDefaultConfig> {
  return {
    size: Size.COMFORTABLE,
    variant: RadioVariant.SURFACE,
    orientation: Orientation.VERTICAL,
    labelPosition: Position.RIGHT,
  };
}
