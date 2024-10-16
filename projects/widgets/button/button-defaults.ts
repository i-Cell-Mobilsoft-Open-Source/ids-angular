import { IdsButtonAppearance, IdsButtonAppearanceType } from './types/button-appearance.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType, IdsAllVariants, IdsAllVariantsType } from '@i-cell/ids-angular/core';

export interface IdsButtonDefaultConfig {
  appearance?: IdsButtonAppearanceType,
  size?: IdsSizeType,
  variant?: IdsAllVariantsType,
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
    variant: IdsAllVariants.PRIMARY,
  };
}

