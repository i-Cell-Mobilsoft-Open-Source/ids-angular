import { MenuItemAppearance, MenuItemAppearanceType } from './types/menu-item-appearance.type';
import { MenuItemVariant, MenuItemVariantType } from './types/menu-item-variant.type';

import { InjectionToken } from '@angular/core';
import { Size, SizeType } from '@i-cell/ids-angular/core';

export interface IdsMenuItemDefaultConfig {
  appearance?: MenuItemAppearanceType,
  size?: SizeType,
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
    appearance: MenuItemAppearance.TEXT,
    size: Size.COMFORTABLE,
    variant: MenuItemVariant.SURFACE,
  };
}

