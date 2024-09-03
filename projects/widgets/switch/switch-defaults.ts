import { SwitchIconPosition, SwitchIconPositionType, SwitchLabelPosition, SwitchLabelPositionType } from './types/switch-positions';
import { SwitchVariant, SwitchVariantType } from './types/switch-variant';

import { InjectionToken } from '@angular/core';
import { Size, SizeType } from '@i-cell/ids-angular/core';

export interface IdsSwitchDefaultConfig {
  size?: SizeType
  variant?: SwitchVariantType
  hasIcon?: boolean
  iconPosition: SwitchIconPositionType
  labelPosition: SwitchLabelPositionType
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
    size: Size.COMPACT,
    variant: SwitchVariant.SURFACE,
    hasIcon: false,
    iconPosition: SwitchIconPosition.ONHANDLE,
    labelPosition: SwitchLabelPosition.RIGHT,
  };
}
