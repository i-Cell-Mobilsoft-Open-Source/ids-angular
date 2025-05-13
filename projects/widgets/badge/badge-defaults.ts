import { IdsBadgeAppearanceType, IdsBadgeAppearance } from './types/badge-appearance.type';
import { IdsBadgeVariantType, IdsBadgeVariant } from './types/badge-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSizeType, IdsSize } from '@i-cell/ids-angular/core';

export interface IdsBadgeDefaultConfig {
  appearance?: IdsBadgeAppearanceType;
  size?: IdsSizeType;
  variant?: IdsBadgeVariantType;
  showLeadingElement?: boolean;
  label?: string;
}

export const IDS_BADGE_DEFAULT_CONFIG = new InjectionToken<IdsBadgeDefaultConfig>(
  'IDS_BADGE_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_BADGE_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_BADGE_DEFAULT_CONFIG_FACTORY(): Required<IdsBadgeDefaultConfig> {
  return {
    appearance: IdsBadgeAppearance.FILLED,
    size: IdsSize.COMPACT,
    variant: IdsBadgeVariant.SURFACE,
    showLeadingElement: false,
    label: '',
  };
}
