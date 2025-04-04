import { IdsIconVariant, IdsIconVariantType } from './types/icon-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeCollection, IdsSizeCollectionType, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsIconDefaultConfig {
  size?: IdsSizeType
  sizeCollection?: IdsSizeCollectionType
  variant?: IdsIconVariantType
  iconAssetsPath: string
  fontNameMappings?: Record<string, string>
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
    size: IdsSize.COMPACT,
    sizeCollection: IdsSizeCollection.SMALL,
    variant: IdsIconVariant.SURFACE,
    iconAssetsPath: '',
    fontNameMappings: {},
  };
}
