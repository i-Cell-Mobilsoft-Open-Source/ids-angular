import { IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY, IdsCheckboxDefaultConfig } from './checkbox-defaults';

import { InjectionToken } from '@angular/core';
import { Orientation, OrientationType } from '@i-cell/ids-angular/core';

export interface IdsCheckboxGroupDefaultConfig extends IdsCheckboxDefaultConfig {
  orientation: OrientationType,
  allowParent: boolean,
}

export const IDS_CHECKBOX_GROUP_DEFAULT_CONFIG = new InjectionToken<IdsCheckboxGroupDefaultConfig>(
  'IDS_CHECKBOX_GROUP_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_CHECKBOX_GROUP_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_CHECKBOX_GROUP_DEFAULT_CONFIG_FACTORY(): Required<IdsCheckboxGroupDefaultConfig> {
  return {
    ...IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY(),
    orientation: Orientation.VERTICAL,
    allowParent: true,
  };
}
