import { IdsIconButtonAppearance, IdsIconButtonAppearanceType } from '../types/icon-button-appearance.type';
import { IdsIconButtonVariant, IdsIconButtonVariantType } from '../types/icon-button-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsIconButtonDefaultConfig {
  appearance?: IdsIconButtonAppearanceType,
  size?: IdsSizeType,
  variant?: IdsIconButtonVariantType,
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
    size: IdsSize.COMPACT,
    variant: IdsIconButtonVariant.PRIMARY,
  };
}

