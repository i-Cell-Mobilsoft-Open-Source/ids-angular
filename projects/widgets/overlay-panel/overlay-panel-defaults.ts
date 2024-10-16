import { IdsOverlayPanelAppearance, IdsOverlayPanelAppearanceType } from './types/overlay-panel-appearance.type';
import { IdsOverlayPanelVariant, IdsOverlayPanelVariantType } from './types/overlay-panel-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsOverlayPanelDefaultConfig {
  appearance?: IdsOverlayPanelAppearanceType,
  size?: IdsSizeType,
  variant?: IdsOverlayPanelVariantType,
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
    appearance: IdsOverlayPanelAppearance.FILLED,
    size: IdsSize.COMFORTABLE,
    variant: IdsOverlayPanelVariant.LIGHT,
  };
}

