import { IconVariant, IconVariantType } from './types/icon-variant.type';

import { InjectionToken } from '@angular/core';
import { Size, SizeCollection, SizeCollectionType, SizeType } from '@i-cell/ids-angular/core';

export interface IdsIconDefaultConfig {
  size?: SizeType
  sizeCollection?: SizeCollectionType
  variant?: IconVariantType
  iconAssetsPath: string
}

export const IDS_ICON_DEFAULT_CONFIG = new InjectionToken<IdsIconDefaultConfig>(
  'IDS_ICON_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_ICON_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_ICON_DEFAULT_CONFIG_FACTORY(): Required<IdsIconDefaultConfig> {
  return {
    size: Size.COMFORTABLE,
    sizeCollection: SizeCollection.SMALL,
    variant: IconVariant.SURFACE,
    iconAssetsPath: '',
  };
}
