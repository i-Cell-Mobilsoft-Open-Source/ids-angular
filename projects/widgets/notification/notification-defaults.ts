import { IdsNotificationAppearance, IdsNotificationAppearanceType } from './types/notification-appearance.type';
import { IdsNotificationVariant, IdsNotificationVariantType } from './types/notification-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsButtonAppearance, IdsButtonAppearanceType } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsNotificationDefaultConfig {
  appearance?: IdsNotificationAppearanceType,
  size?: IdsSizeType,
  variant?: IdsNotificationVariantType,
  closeButtonSize?: IdsSizeType,
  closeLabelButtonAppearance?: IdsButtonAppearanceType,
}

export const IDS_NOTIFICATION_DEFAULT_CONFIG = new InjectionToken<IdsNotificationDefaultConfig>(
  'IDS_NOTIFICATION_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_NOTIFICATION_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_NOTIFICATION_DEFAULT_CONFIG_FACTORY(): Required<IdsNotificationDefaultConfig> {
  return {
    appearance: IdsNotificationAppearance.OUTLINED,
    size: IdsSize.COMPACT,
    variant: IdsNotificationVariant.DARK,
    closeButtonSize: IdsSize.COMPACT,
    closeLabelButtonAppearance: IdsButtonAppearance.OUTLINED,
  };
}

