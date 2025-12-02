import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { CdkMenu } from '@angular/cdk/menu';
import { OverlayModule } from '@angular/cdk/overlay';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsChipComponent } from '@i-cell/ids-angular/chip';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsPrefixDirective } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import {
  IdsMenuItemAppearance,
  IdsMenuItemAppearanceType,
  IdsMenuItemVariant,
  IdsMenuItemVariantType,
  IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY, IdsMenuItemComponent, IdsActiveIndicatorDirective,
} from '@i-cell/ids-angular/menu';
import {
  IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY, IdsOverlayPanelComponent,
} from '@i-cell/ids-angular/overlay-panel';
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
  contentType: 'menuItems' | 'customContent',
};

type MenuItemInputControls = {
  appearance: IdsMenuItemAppearanceType,
  size: IdsSizeType,
  variant: IdsMenuItemVariantType,
};

type MenuItemHelperControls = {
  hasLeadingIcon: boolean,
  hasTrailingIcon: boolean,
  hasDisabledItem: boolean,
  showFirstItemLabel: boolean;
};

@Component({
  selector: 'app-overlay-panel-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsIconComponent,
    TranslateModule,
    FormsModule,
    IdsButtonComponent,
    OverlayModule,
    IdsChipComponent,
    IdsPrefixDirective,
    IdsOverlayPanelComponent,
    IdsMenuItemComponent,
    IdsActiveIndicatorDirective,
    CdkMenu,

  ],
  templateUrl: './overlay-panel-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './overlay-panel-demo.component.scss',
  ],
})
export class OverlayPanelDemoComponent {
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
    contentType: {
      description: 'Type of content inside the overlay panel.',
      type: 'string',
      default: 'menuItems',
      control: DemoControl.SELECT,
      list: [
        'menuItems',
        'customContent',
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
    showFirstItemLabel: {
      // eslint-disable-next-line @stylistic/js/max-len
      description: 'Whether to show the label of the first menu item or not. This is useful for testing purposes when the first item is disabled and has no leading icon.',
      type: 'boolean',
      default: true,
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

  protected _overlayOpen = false;

  public toggleOverlay(): void {
    this._overlayOpen = !this._overlayOpen;
  }

  public reset(): void {
    this.overlayPanelModel = { ...this.overlayPanelDefaults };
    this.overlayPanelHelperModel = { ...this.overlayPanelHelperDefaults };
    this.menuItemModel = { ...this.menuItemDefaults };
    this.menuItemHelperModel = { ...this.menuItemHelperDefaults };
  }

  protected _contentBtnTest(nr: string):void {
    alert(`Button in overlay panel clicked! ${nr}`);
  }
}
