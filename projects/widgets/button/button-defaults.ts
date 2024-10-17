import { IdsButtonAppearance, IdsButtonAppearanceType } from './types/button-appearance.type';
import { IdsButtonVariant, IdsButtonVariantType } from './types/button-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsButtonDefaultConfig {
  appearance?: IdsButtonAppearanceType,
  size?: IdsSizeType,
  variant?: IdsButtonVariantType,
}

export const IDS_BUTTON_DEFAULT_CONFIG = new InjectionToken<IdsButtonDefaultConfig>(
  'IDS_BUTTON_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_BUTTON_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_BUTTON_DEFAULT_CONFIG_FACTORY(): Required<IdsButtonDefaultConfig> {
  return {
    appearance: IdsButtonAppearance.FILLED,
    size: IdsSize.COMFORTABLE,
    variant: IdsButtonVariant.PRIMARY,
  };
}

