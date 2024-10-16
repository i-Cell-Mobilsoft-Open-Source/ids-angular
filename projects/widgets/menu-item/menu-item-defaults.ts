import { IdsMenuItemAppearance, IdsMenuItemAppearanceType } from './types/menu-item-appearance.type';
import { MenuItemVariant, MenuItemVariantType } from './types/menu-item-variant.type';

import { InjectionToken } from '@angular/core';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';

export interface IdsMenuItemDefaultConfig {
  appearance?: IdsMenuItemAppearanceType,
  size?: IdsSizeType,
  variant?: MenuItemVariantType,
}

export const IDS_MENU_ITEM_DEFAULT_CONFIG = new InjectionToken<IdsMenuItemDefaultConfig>(
  'IDS_MENU_ITEM_DEFAULT_CONFIG',
  {
    providedIn: 'root',
    factory: IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY,
  },
);

export function IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY(): Required<IdsMenuItemDefaultConfig> {
  return {
    appearance: IdsMenuItemAppearance.TEXT,
    size: IdsSize.COMFORTABLE,
    variant: MenuItemVariant.SURFACE,
  };
}

