import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY, IdsMenuItemAppearance, IdsMenuItemAppearanceType, IdsMenuItemVariant, IdsMenuItemVariantType } from '@i-cell/ids-angular/menu';
import { TranslateService } from '@ngx-translate/core';

const MENU_ITEM_DOCS_PATH = 'menu/menu-item/menu-item.component.docs.json';

const menuItemDefaultConfig = IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY();
const numberOfItems = 3;

type MenuItemInputControls = {
  appearance: IdsMenuItemAppearanceType,
  size: IdsSizeType,
  variant: IdsMenuItemVariantType,
  disabled: boolean,
  label: string,
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
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly menuItemInputControlConfig: DemoControlConfig<MenuItemInputControls> = {
    appearance: {
      description: this._widgetDocs.getDescription(MENU_ITEM_DOCS_PATH, 'appearance', 'Menu item appearance.'),
      type: 'IdsMenuItemAppearanceType',
      default: menuItemDefaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsMenuItemAppearance),
    },
    size: {
      description: this._widgetDocs.getDescription(MENU_ITEM_DOCS_PATH, 'size', 'Menu item size.'),
      type: 'IdsSizeType',
      default: menuItemDefaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: this._widgetDocs.getDescription(MENU_ITEM_DOCS_PATH, 'variant', 'Menu item variant.'),
      type: 'IdsMenuItemVariantType',
      default: menuItemDefaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsMenuItemVariant),
    },
    disabled: {
      description: this._widgetDocs.getDescription(MENU_ITEM_DOCS_PATH, 'disabled', 'Whether the menu item is disabled or not'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    label: {
      description: this._widgetDocs.getDescription(MENU_ITEM_DOCS_PATH, 'label', 'Label text of the menu item.'),
      type: 'string',
      default: 'Menu item label',
      control: DemoControl.TEXT,
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

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.MENU_ITEM', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.menuItemInputControlConfig,
      },
    ];
  }
}
