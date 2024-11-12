import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsButtonGroupDefaultConfig {
  size?: IdsSizeType,
}

export const IDS_BUTTON_GROUP_DEFAULT_CONFIG = new InjectionToken<IdsButtonGroupDefaultConfig>(
  'IDS_BUTTON_GROUP_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_BUTTON_GROUP_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_BUTTON_GROUP_DEFAULT_CONFIG_FACTORY(): Required<IdsButtonGroupDefaultConfig> {
  return {
    size: IdsSize.COMPACT,
  };
}

