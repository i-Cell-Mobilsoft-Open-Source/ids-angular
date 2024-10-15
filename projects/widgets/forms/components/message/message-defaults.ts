import { MessageVariant, MessageVariantType } from './types/message-variant.type';

import { InjectionToken } from '@angular/core';
import { Size, SizeType } from '@i-cell/ids-angular/core';

export interface IdsMessageDefaultConfig {
  size?: SizeType,
  variant?: MessageVariantType,
}

export const IDS_MESSAGE_DEFAULT_CONFIG = new InjectionToken<IdsMessageDefaultConfig>(
  'IDS_MESSAGE_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_MESSAGE_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_MESSAGE_DEFAULT_CONFIG_FACTORY(): Required<IdsMessageDefaultConfig> {
  return {
    size: Size.COMFORTABLE,
    variant: MessageVariant.SURFACE,
  };
}

