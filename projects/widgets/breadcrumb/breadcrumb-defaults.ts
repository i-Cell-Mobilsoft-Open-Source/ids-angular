import { IdsBreadcrumbDividerType, IdsBreadcrumbDivider } from './types/breadcrumb-divider.type';
import { IdsBreadcrumbHierarchyType } from './types/breadcrumb-hierarchy.type';
import { IdsBreadcrumbVariantType, IdsBreadcrumbVariant } from './types/breadcrumb-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSizeType, IdsSize } from '@i-cell/ids-angular/core';
import { IdsOverlayPanelAppearance, IdsOverlayPanelAppearanceType, IdsOverlayPanelVariant, IdsOverlayPanelVariantType } from '@i-cell/ids-angular/overlay-panel';

export interface IdsBreadcrumbDefaultConfig {
  hierarchy: IdsBreadcrumbHierarchyType[];
  size?: IdsSizeType;
  variant?: IdsBreadcrumbVariantType;
  dividerType?: IdsBreadcrumbDividerType;
  overlayAppearance?: IdsOverlayPanelAppearanceType;
  overlaySize?: IdsSizeType;
  overlayVariant?: IdsOverlayPanelVariantType;
}

export const IDS_BREADCRUMB_DEFAULT_CONFIG = new InjectionToken<IdsBreadcrumbDefaultConfig>('IDS_BADGE_DEFAULT_CONFIG', {
  providedIn: 'root',
  factory: IDS_BREADCRUMB_DEFAULT_CONFIG_FACTORY,
});

export function IDS_BREADCRUMB_DEFAULT_CONFIG_FACTORY(): Required<IdsBreadcrumbDefaultConfig> {
  return {
    hierarchy: [],
    size: IdsSize.COMPACT,
    variant: IdsBreadcrumbVariant.SURFACE,
    dividerType: IdsBreadcrumbDivider.ICON,
    overlayAppearance: IdsOverlayPanelAppearance.ELEVATED,
    overlaySize: IdsSize.COMPACT,
    overlayVariant: IdsOverlayPanelVariant.LIGHT,
  };
}
