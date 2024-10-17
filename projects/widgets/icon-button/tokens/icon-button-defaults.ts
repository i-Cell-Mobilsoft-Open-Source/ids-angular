import { IdsIconButtonAppearance, IdsIconButtonAppearanceType } from '../types/icon-button-appearance.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType, IdsAllVariants, IdsAllVariantsType } from '@i-cell/ids-angular/core';

export interface IdsIconButtonDefaultConfig {
  appearance?: IdsIconButtonAppearanceType,
  size?: IdsSizeType,
  variant?: IdsAllVariantsType,
}

export const IDS_ICON_BUTTON_DEFAULT_CONFIG = new InjectionToken<IdsIconButtonDefaultConfig>(
  'IDS_ICON_BUTTON_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_ICON_BUTTON_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_ICON_BUTTON_DEFAULT_CONFIG_FACTORY(): Required<IdsIconButtonDefaultConfig> {
  return {
    appearance: IdsIconButtonAppearance.FILLED,
    size: IdsSize.COMFORTABLE,
    variant: IdsAllVariants.PRIMARY,
  };
}

