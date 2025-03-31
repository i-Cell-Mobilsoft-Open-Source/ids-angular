import { IdsSpinnerVariant, IdsSpinnerVariantType } from './types/spinner-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeCollection, IdsSizeCollectionType, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsSpinnerDefaultConfig {
  size?: IdsSizeType
  sizeCollection?: IdsSizeCollectionType
  variant?: IdsSpinnerVariantType
  isTrack: boolean
}

export const IDS_SPINNER_DEFAULT_CONFIG = new InjectionToken<IdsSpinnerDefaultConfig>(
  'IDS_ICON_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_SPINNER_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_SPINNER_DEFAULT_CONFIG_FACTORY(): Required<IdsSpinnerDefaultConfig> {
  return {
    size: IdsSize.COMPACT,
    sizeCollection: IdsSizeCollection.SMALL,
    variant: IdsSpinnerVariant.SURFACE,
    isTrack: true,
  };
}
