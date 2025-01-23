import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsActionMenuTriggerDirective, IdsMenuItemComponent, IdsMenuItemAppearance, IdsMenuItemAppearanceType, IdsMenuItemVariant, MenuItemVariantType, IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/menu';
import { IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY } from '@i-cell/ids-angular/overlay-panel';
import { IdsOverlayPanelComponent } from '@i-cell/ids-angular/overlay-panel/overlay-panel.component';
import { IdsOverlayPanelAppearance, IdsOverlayPanelAppearanceType } from '@i-cell/ids-angular/overlay-panel/types/overlay-panel-appearance.type';
import { IdsOverlayPanelVariant, IdsOverlayPanelVariantType } from '@i-cell/ids-angular/overlay-panel/types/overlay-panel-variant.type';
import { TranslateModule } from '@ngx-translate/core';

const overlayPanelDefaultConfig = IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY();
const menuItemDefaultConfig = IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY();

type OverlayPanelInputControls = {
  appearance: IdsOverlayPanelAppearanceType,
  size: IdsSizeType,
  variant: IdsOverlayPanelVariantType,
};

type OverlayPanelHelperControls = {
  testBackgroundColor: 'none' | 'dark',
};

type MenuItemInputControls = {
  appearance: IdsMenuItemAppearanceType,
  size: IdsSizeType,
  variant: MenuItemVariantType,
};

type MenuItemHelperControls = {
  hasLeadingIcon: boolean,
  hasTrailingIcon: boolean,
  hasDisabledItem: boolean,
};

@Component({
  selector: 'app-action-menu-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsActionMenuTriggerDirective,
    IdsOverlayPanelComponent,
    IdsMenuItemComponent,
    IdsButtonComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './action-menu-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './action-menu-demo.component.scss',
  ],
})
export class ActionMenuDemoComponent {
  protected _overlayPanelInputControlConfig: DemoControlConfig<OverlayPanelInputControls> = {
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

  protected _overlayPanelHelperControlConfig: DemoControlConfig<OverlayPanelHelperControls> = {
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

  protected _menuItemInputControlConfig: DemoControlConfig<MenuItemInputControls> = {
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

  protected _menuItemHelperControlConfig: DemoControlConfig<MenuItemHelperControls> = {
    hasLeadingIcon: {
      description: 'Whether the menu items have leading icon or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.CHECKBOX,
    },
    hasTrailingIcon: {
      description: 'Whether the menu items have trailing icon or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.CHECKBOX,
    },
    hasDisabledItem: {
      description: 'Whether one menu item is disabled or not. For testing purposes this is the first menu item.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
  };

  public overlayPanelDefaults = getDefaultFromDemoConfig<OverlayPanelInputControls>(this._overlayPanelInputControlConfig);
  public overlayPanelHelperDefaults = getDefaultFromDemoConfig<OverlayPanelHelperControls>(this._overlayPanelHelperControlConfig);
  public menuItemDefaults = getDefaultFromDemoConfig<MenuItemInputControls>(this._menuItemInputControlConfig);
  public menuItemHelperDefaults = getDefaultFromDemoConfig<MenuItemHelperControls>(this._menuItemHelperControlConfig);

  public overlayPanelModel: OverlayPanelInputControls = { ...this.overlayPanelDefaults };
  public overlayPanelHelperModel: OverlayPanelHelperControls = { ...this.overlayPanelHelperDefaults };
  public menuItemModel: MenuItemInputControls = { ...this.menuItemDefaults };
  public menuItemHelperModel: MenuItemHelperControls = { ...this.menuItemHelperDefaults };

  // eslint-disable-next-line no-magic-numbers
  public items = Array(3);

  public reset(): void {
    this.overlayPanelModel = { ...this.overlayPanelDefaults };
    this.overlayPanelHelperModel = { ...this.overlayPanelHelperDefaults };
    this.menuItemModel = { ...this.menuItemDefaults };
    this.menuItemHelperModel = { ...this.menuItemHelperDefaults };
  }
}
