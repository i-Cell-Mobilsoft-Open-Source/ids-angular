import { IdsRadioVariant, IdsRadioVariantType } from './types/radio-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsOrientation, IdsOrientationType, IdsPosition, IdsPositionType, IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsRadioDefaultConfig {
  size?: IdsSizeType
  variant?: IdsRadioVariantType
  orientation?: IdsOrientationType
  labelPosition?: IdsPositionType
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
    size: IdsSize.COMFORTABLE,
    variant: IdsRadioVariant.SURFACE,
    orientation: IdsOrientation.VERTICAL,
    labelPosition: IdsPosition.RIGHT,
  };
}
