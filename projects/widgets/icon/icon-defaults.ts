import { IconSizeCollection, IconSizeCollectionType } from './types/icon-size-collection.type';
import { IconVariant, IconVariantType } from './types/icon-variant.type';

import { InjectionToken } from '@angular/core';
import { Size, SizeType } from '@i-cell/ids-angular/core';

export interface IdsIconDefaultConfig {
  size?: SizeType
  sizeCollection?: IconSizeCollectionType
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
    sizeCollection: IconSizeCollection.SMALL,
    variant: IconVariant.SURFACE,
    iconAssetsPath: '',
  };
}
