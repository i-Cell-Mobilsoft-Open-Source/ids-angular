import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoSlotConfig } from '@demo-types/demo-slot.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY, IdsMenuItemAppearance, IdsMenuItemAppearanceType, IdsMenuItemVariant, IdsMenuItemVariantType } from '@i-cell/ids-angular/menu';
import { TranslateService } from '@ngx-translate/core';

const MENU_ITEM_DOCS_PATH = 'menu/menu-item/menu-item.component.docs.json';
const ACTIVE_INDICATOR_DOCS_PATH = 'menu/active-indicator/active-indicator.directive.docs.json';
const MENU_ITEM_SLOTS_DOCS_PATH = 'menu/menu-item/menu-item.component.slots.docs.json';

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
  extraHeight: boolean;
  testBackgroundColor: 'none' | 'dark',
};

type ActiveIndicatorInputControls = {
  active: boolean;
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

  public readonly activeIndicatorInputControlConfig: DemoControlConfig<ActiveIndicatorInputControls> = {
    active: {
      description: this._widgetDocs.getDescription(
        ACTIVE_INDICATOR_DOCS_PATH,
        'active',
        'Whether the active indicator is shown as active or not. Required.',
      ),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public menuItemDefaults = getDefaultFromDemoConfig<MenuItemInputControls>(this.menuItemInputControlConfig);
  public menuItemHelperDefaults = getDefaultFromDemoConfig<MenuItemHelperControls>(this.menuItemHelperControlConfig);
  public activeIndicatorDefaults = getDefaultFromDemoConfig<ActiveIndicatorInputControls>(this.activeIndicatorInputControlConfig);

  public menuItemModel: MenuItemInputControls = { ...this.menuItemDefaults };
  public menuItemHelperModel: MenuItemHelperControls = { ...this.menuItemHelperDefaults };
  public activeIndicatorModel: ActiveIndicatorInputControls = { ...this.activeIndicatorDefaults };

  public items = Array(numberOfItems);

  public reset(): void {
    this.menuItemModel = { ...this.menuItemDefaults };
    this.menuItemHelperModel = { ...this.menuItemHelperDefaults };
    this.activeIndicatorModel = { ...this.activeIndicatorDefaults };
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.MENU_ITEM', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.menuItemInputControlConfig,
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.MENU_ITEM', 'API.PROPERTY_GROUP.ACTIVE_INDICATOR'),
        config: this.activeIndicatorInputControlConfig,
      },
    ];
  }

  public readonly slotControlConfig: DemoSlotConfig = [
    {
      name: 'iconLeading',
      selector: 'ids-icon[icon-leading]',
      description: this._widgetDocs.getDescription(
        MENU_ITEM_SLOTS_DOCS_PATH,
        'iconLeading',
        'Content projected before the label (marked with the icon-leading attribute), typically an ids-icon.',
      ),
    },
    {
      name: 'iconTrailing',
      selector: 'ids-icon[icon-trailing]',
      description: this._widgetDocs.getDescription(
        MENU_ITEM_SLOTS_DOCS_PATH,
        'iconTrailing',
        'Content projected after the label (marked with the icon-trailing attribute), typically an ids-icon.',
      ),
    },
  ];

  public getSlotConfig(): DemoSlotConfig[] {
    return [this.slotControlConfig];
  }

  public getSlotTitles(): string[] {
    return ['Menu item'];
  }
}
