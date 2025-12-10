import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY, IdsMenuItemAppearance, IdsMenuItemAppearanceType, IdsMenuItemVariant, IdsMenuItemVariantType } from '@i-cell/ids-angular/menu';

const menuItemDefaultConfig = IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY();
const numberOfItems = 3;

type MenuItemInputControls = {
  appearance: IdsMenuItemAppearanceType,
  size: IdsSizeType,
  variant: IdsMenuItemVariantType,
  disabled: boolean,
};

type MenuItemHelperControls = {
  hasLeadingIcon: boolean,
  hasTrailingIcon: boolean,
  showLabel: boolean;
  active: boolean;
  extraHeight: boolean;
  testBackgroundColor: 'none' | 'dark',
};
@Injectable()
export class MenuItemDemoService {
  public readonly menuItemInputControlConfig: DemoControlConfig<MenuItemInputControls> = {
    appearance: {
      description: 'Menu item appearance.',
      type: 'IdsMenuItemAppearanceType',
      default: menuItemDefaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsMenuItemAppearance),
    },
    size: {
      description: 'Menu item size.',
      type: 'IdsSizeType',
      default: menuItemDefaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Menu item variant.',
      type: 'IdsMenuItemVariantType',
      default: menuItemDefaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsMenuItemVariant),
    },
    disabled: {
      description: 'Whether the menu item is disabled or not',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly menuItemHelperControlConfig: DemoControlConfig<MenuItemHelperControls> = {
    hasLeadingIcon: {
      description: 'Whether the menu item has a leading icon or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
    hasTrailingIcon: {
      description: 'Whether the menu item has a trailing icon or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
    showLabel: {
      description: 'Show or hide the menu item\'s label.',
      type: 'boolean',
      default: menuItemDefaultConfig.showLabel,
      control: DemoControl.SWITCH,
    },
    active: {
      description: 'Whether the menu item is active or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    extraHeight: {
      description: 'Add extra height to the menu item\'s wrapper to distance the active indicator from it (for testing purposes).',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    testBackgroundColor: {
      description: 'Text of button',
      type: 'string',
      default: 'none',
      control: DemoControl.SELECT,
      list: [
        'none',
        'dark',
      ],
    },
  };

  public menuItemDefaults = getDefaultFromDemoConfig<MenuItemInputControls>(this.menuItemInputControlConfig);
  public menuItemHelperDefaults = getDefaultFromDemoConfig<MenuItemHelperControls>(this.menuItemHelperControlConfig);

  public menuItemModel: MenuItemInputControls = { ...this.menuItemDefaults };
  public menuItemHelperModel: MenuItemHelperControls = { ...this.menuItemHelperDefaults };

  public items = Array(numberOfItems);

  public reset(): void {
    this.menuItemModel = { ...this.menuItemDefaults };
    this.menuItemHelperModel = { ...this.menuItemHelperDefaults };
  }
}
