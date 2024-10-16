import { IdsSwitchIconPosition, IdsSwitchIconPositionType, IdsSwitchLabelPosition, IdsSwitchLabelPositionType } from './types/switch-positions.type';
import { IdsSwitchVariant, IdsSwitchVariantType } from './types/switch-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsSwitchDefaultConfig {
  size?: IdsSizeType
  variant?: IdsSwitchVariantType
  hasIcon?: boolean
  iconPosition: IdsSwitchIconPositionType
  labelPosition: IdsSwitchLabelPositionType
}

export const IDS_SWITCH_DEFAULT_CONFIG = new InjectionToken<IdsSwitchDefaultConfig>(
  'IDS_SWITCH_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_SWITCH_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_SWITCH_DEFAULT_CONFIG_FACTORY(): Required<IdsSwitchDefaultConfig> {
  return {
    size: IdsSize.COMPACT,
    variant: IdsSwitchVariant.SURFACE,
    hasIcon: false,
    iconPosition: IdsSwitchIconPosition.ONHANDLE,
    labelPosition: IdsSwitchLabelPosition.RIGHT,
  };
}
