import { IdsDividerVariant, IdsDividerVariantType } from './types/divider-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType, IdsOrientationType, IdsOrientation } from '@i-cell/ids-angular/core';

export interface IdsDividerDefaultConfig {
  size?: IdsSizeType,
  variant?: IdsDividerVariantType,
  orientation?: IdsOrientationType,
  width?: string,
  height?: string,
}

export const IDS_DIVIDER_DEFAULT_CONFIG = new InjectionToken<IdsDividerDefaultConfig>(
  'IDS_DIVIDER_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_DIVIDER_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_DIVIDER_DEFAULT_CONFIG_FACTORY(): Required<IdsDividerDefaultConfig> {
  return {
    size: IdsSize.COMPACT,
    variant: IdsDividerVariant.PRIMARY,
    orientation: IdsOrientation.HORIZONTAL,
    width: '100%',
    height: '100%',
  };
}

