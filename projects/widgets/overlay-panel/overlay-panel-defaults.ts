import { OverlayPanelAppearance, OverlayPanelAppearanceType } from './types/overlay-panel-appearance.type';
import { OverlayPanelVariant, OverlayPanelVariantType } from './types/overlay-panel-variant.type';

import { InjectionToken } from '@angular/core';
import { Size, SizeType } from '@i-cell/ids-angular/core';

export interface IdsOverlayPanelDefaultConfig {
  appearance?: OverlayPanelAppearanceType,
  size?: SizeType,
  variant?: OverlayPanelVariantType,
}

export const IDS_OVERLAY_PANEL_DEFAULT_CONFIG = new InjectionToken<IdsOverlayPanelDefaultConfig>(
  'IDS_OVERLAY_PANEL_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY(): Required<IdsOverlayPanelDefaultConfig> {
  return {
    appearance: OverlayPanelAppearance.FILLED,
    size: Size.COMFORTABLE,
    variant: OverlayPanelVariant.LIGHT,
  };
}

