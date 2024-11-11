import { IdsTabGroupPosition, IdsTabGroupPositionType } from './types/tab-group-position.type';
import { IdsTabGroupVariant, IdsTabGroupVariantType } from './types/tab-group-variant.type';
import { IdsTabIndicatorPosition, IdsTabIndicatorPositionType } from './types/tab-indicator-position.type';

import { InjectionToken } from '@angular/core';
import { IdsOrientation, IdsOrientationType, IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsTabGroupDefaultConfig {
  size?: IdsSizeType,
  variant?: IdsTabGroupVariantType,
  orientation?: IdsOrientationType,
  stretchTabs?: boolean,
  tabPosition?: IdsTabGroupPositionType,
  indicatorPosition?: IdsTabIndicatorPositionType,
}

export const IDS_TAB_GROUP_DEFAULT_CONFIG = new InjectionToken<IdsTabGroupDefaultConfig>(
  'IDS_TAB_GROUP_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_TAB_GROUP_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_TAB_GROUP_DEFAULT_CONFIG_FACTORY(): Required<IdsTabGroupDefaultConfig> {
  return {
    size: IdsSize.COMPACT,
    variant: IdsTabGroupVariant.PRIMARY,
    orientation: IdsOrientation.HORIZONTAL,
    stretchTabs: true,
    tabPosition: IdsTabGroupPosition.START,
    indicatorPosition: IdsTabIndicatorPosition.BOTTOM,
  };
}
