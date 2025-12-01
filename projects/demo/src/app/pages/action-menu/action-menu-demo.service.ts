import { Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import {
  IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY,
  IdsMenuItemAppearance,
  IdsMenuItemAppearanceType,
  IdsMenuItemVariant,
  IdsMenuItemVariantType,
} from '@i-cell/ids-angular/menu';
import {
  IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY,
  IdsOverlayPanelAppearance,
  IdsOverlayPanelAppearanceType,
  IdsOverlayPanelVariant,
  IdsOverlayPanelVariantType,
} from '@i-cell/ids-angular/overlay-panel';

const overlayPanelDefaultConfig = IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY();
const menuItemDefaultConfig = IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY();
const numberOfItems = 3;

type OverlayPanelInputControls = {
  appearance: IdsOverlayPanelAppearanceType;
  size: IdsSizeType;
  variant: IdsOverlayPanelVariantType;
};

type OverlayPanelHelperControls = {
  testBackgroundColor: 'none' | 'dark';
};

type MenuItemInputControls = {
  appearance: IdsMenuItemAppearanceType;
  size: IdsSizeType;
  variant: IdsMenuItemVariantType;
};

type MenuItemHelperControls = {
  hasLeadingIcon: boolean;
  hasTrailingIcon: boolean;
  hasDisabledItem: boolean;
  showFirstItemLabel: boolean;
};

@Injectable()
export class ActionMenuDemoService {
  public readonly overlayPanelInputControlConfig: DemoControlConfig<OverlayPanelInputControls> = {
    appearance: {
      description: 'Overlay panel appearance.',
      type: 'IdsOverlayPanelAppearanceType',
      default: overlayPanelDefaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsOverlayPanelAppearance),
    },
    size: {
      description: 'Overlay panel size.',
      type: 'IdsSizeType',
      default: overlayPanelDefaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Overlay panel variant.',
      type: 'IdsOverlayPanelVariantType',
      default: overlayPanelDefaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsOverlayPanelVariant),
    },
  };

  public readonly overlayPanelHelperControlConfig: DemoControlConfig<OverlayPanelHelperControls> = {
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
  };

  public readonly menuItemHelperControlConfig: DemoControlConfig<MenuItemHelperControls> = {
    hasLeadingIcon: {
      description: 'Whether the menu items have leading icon or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
    hasTrailingIcon: {
      description: 'Whether the menu items have trailing icon or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
    hasDisabledItem: {
      description: 'Whether one menu item is disabled or not. For testing purposes this is the first menu item.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    showFirstItemLabel: {
      description: 'Show or hide the menu item\'s label. For testing purposes this is the first menu item.',
      type: 'boolean',
      default: menuItemDefaultConfig.showLabel,
      control: DemoControl.SWITCH,
    },
  };

  public overlayPanelDefaults = getDefaultFromDemoConfig<OverlayPanelInputControls>(this.overlayPanelInputControlConfig);
  public overlayPanelHelperDefaults = getDefaultFromDemoConfig<OverlayPanelHelperControls>(this.overlayPanelHelperControlConfig);
  public menuItemDefaults = getDefaultFromDemoConfig<MenuItemInputControls>(this.menuItemInputControlConfig);
  public menuItemHelperDefaults = getDefaultFromDemoConfig<MenuItemHelperControls>(this.menuItemHelperControlConfig);

  public overlayPanelModel: OverlayPanelInputControls = { ...this.overlayPanelDefaults };
  public overlayPanelHelperModel: OverlayPanelHelperControls = { ...this.overlayPanelHelperDefaults };
  public menuItemModel: MenuItemInputControls = { ...this.menuItemDefaults };
  public menuItemHelperModel: MenuItemHelperControls = { ...this.menuItemHelperDefaults };

  public items = Array(numberOfItems);

  public reset(): void {
    this.overlayPanelModel = { ...this.overlayPanelDefaults };
    this.overlayPanelHelperModel = { ...this.overlayPanelHelperDefaults };
    this.menuItemModel = { ...this.menuItemDefaults };
    this.menuItemHelperModel = { ...this.menuItemHelperDefaults };
  }
}
