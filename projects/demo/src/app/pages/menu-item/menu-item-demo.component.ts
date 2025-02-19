import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { CdkMenuBar } from '@angular/cdk/menu';
import { Component, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY, IdsActiveIndicatorDirective, IdsMenuItemAppearance, IdsMenuItemAppearanceType, IdsMenuItemComponent, IdsMenuItemVariant, IdsMenuItemVariantType } from '@i-cell/ids-angular/menu';
import { TranslateModule } from '@ngx-translate/core';

const menuItemDefaultConfig = IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY();

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

@Component({
  selector: 'app-menu-item-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsMenuItemComponent,
    IdsActiveIndicatorDirective,
    IdsIconComponent,
    CdkMenuBar,
    RouterLink,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './menu-item-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './menu-item-demo.component.scss',
  ],
  encapsulation: ViewEncapsulation.None,
})
export class MenuItemDemoComponent {
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
    disabled: {
      description: 'Whether the menu item is disabled or not',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
  };

  protected _menuItemHelperControlConfig: DemoControlConfig<MenuItemHelperControls> = {
    hasLeadingIcon: {
      description: 'Whether the menu item has a leading icon or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.CHECKBOX,
    },
    hasTrailingIcon: {
      description: 'Whether the menu item has a trailing icon or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.CHECKBOX,
    },
    showLabel: {
      description: 'Show or hide the menu item\'s label.',
      type: 'boolean',
      default: menuItemDefaultConfig.showLabel,
      control: DemoControl.CHECKBOX,
    },
    active: {
      description: 'Whether the menu item is active or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
    extraHeight: {
      description: 'Add extra height to the menu item\'s wrapper to distance the active indicator from it (for testing purposes).',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
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

  public menuItemDefaults = getDefaultFromDemoConfig<MenuItemInputControls>(this._menuItemInputControlConfig);
  public menuItemHelperDefaults = getDefaultFromDemoConfig<MenuItemHelperControls>(this._menuItemHelperControlConfig);

  public menuItemModel: MenuItemInputControls = { ...this.menuItemDefaults };
  public menuItemHelperModel: MenuItemHelperControls = { ...this.menuItemHelperDefaults };

  // eslint-disable-next-line no-magic-numbers
  public items = Array(3);

  public reset(): void {
    this.menuItemModel = { ...this.menuItemDefaults };
    this.menuItemHelperModel = { ...this.menuItemHelperDefaults };
  }
}
