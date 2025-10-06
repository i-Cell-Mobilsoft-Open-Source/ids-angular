import { IdsSideNavAppearance, IdsSideNavAppearanceType } from './types/side-nav-appearance.type';
import { IdsSideNavVariant, IdsSideNavVariantType } from './types/side-nav-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsSideNavDefaultConfig {
  appearance?: IdsSideNavAppearanceType,
  size?: IdsSizeType,
  variant?: IdsSideNavVariantType,
  hasActiveIndicator?: boolean,
  hasLabel?: boolean,
  hasTooltip?: boolean,
}

export const IDS_SIDE_NAV_DEFAULT_CONFIG = new InjectionToken<IdsSideNavDefaultConfig>(
  'IDS_SIDE_NAV_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_SIDE_NAV_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_SIDE_NAV_DEFAULT_CONFIG_FACTORY(): Required<IdsSideNavDefaultConfig> {
  return {
    appearance: IdsSideNavAppearance.STANDARD,
    size: IdsSize.COMPACT,
    variant: IdsSideNavVariant.SURFACE,
    hasActiveIndicator: false,
    hasLabel: true,
    hasTooltip: false,
  };
}

