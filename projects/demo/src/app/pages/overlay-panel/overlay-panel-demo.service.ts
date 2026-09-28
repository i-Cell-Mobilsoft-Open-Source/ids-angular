import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY, IdsMenuItemAppearance, IdsMenuItemAppearanceType, IdsMenuItemVariant, IdsMenuItemVariantType } from '@i-cell/ids-angular/menu';
import { IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY, IdsOverlayPanelAppearance, IdsOverlayPanelAppearanceType, IdsOverlayPanelVariant, IdsOverlayPanelVariantType } from '@i-cell/ids-angular/overlay-panel';
import { TranslateService } from '@ngx-translate/core';

const OVERLAY_PANEL_DOCS_PATH = 'overlay-panel/overlay-panel.component.docs.json';
const MENU_ITEM_DOCS_PATH = 'menu/menu-item/menu-item.component.docs.json';

const overlayPanelDefaultConfig = IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY();
const menuItemDefaultConfig = IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY();
const numberOfItems = 3;

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
};
@Injectable()
export class OverlayPanelDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly overlayPanelInputControlConfig: DemoControlConfig<OverlayPanelInputControls> = {
    appearance: {
      description: this._widgetDocs.getDescription(OVERLAY_PANEL_DOCS_PATH, 'appearance', 'Overlay panel appearance.'),
      type: 'IdsOverlayPanelAppearanceType',
      default: overlayPanelDefaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsOverlayPanelAppearance),
    },
    size: {
      description: this._widgetDocs.getDescription(OVERLAY_PANEL_DOCS_PATH, 'size', 'Overlay panel size.'),
      type: 'IdsSizeType',
      default: overlayPanelDefaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: this._widgetDocs.getDescription(OVERLAY_PANEL_DOCS_PATH, 'variant', 'Overlay panel variant.'),
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
  };

  public readonly overlayPanelControlConfig: DemoMethodConfig = [
    {
      name: 'toggle()',
      description: 'Toggles the visibility of the overlay panel.',
      returnType: 'void',
    },
  ];

  public readonly overlayPanelPropControlConfig: DemoControlConfig<unknown> = {
    open: {
      description: this._widgetDocs.getDescription(
        OVERLAY_PANEL_DOCS_PATH,
        'open',
        'Whether the overlay panel is open or not. Two-way bindable.',
      ),
      type: 'boolean',
      default: false,
    },
    origin: {
      description: this._widgetDocs.getDescription(
        OVERLAY_PANEL_DOCS_PATH,
        'origin',
        'The element the overlay panel is anchored/connected to.',
      ),
      type: 'CdkOverlayOrigin | ElementRef',
      default: '-',
    },
    positions: {
      description: this._widgetDocs.getDescription(
        OVERLAY_PANEL_DOCS_PATH,
        'positions',
        'Array of connected positions used to position the overlay panel relative to its origin.',
      ),
      type: 'ConnectedPosition[]',
      default: '-',
    },
    panelClasses: {
      description: this._widgetDocs.getDescription(
        OVERLAY_PANEL_DOCS_PATH,
        'panelClasses',
        'Additional CSS class(es) applied to the overlay panel.',
      ),
      type: 'string',
      default: '',
    },
    width: {
      description: this._widgetDocs.getDescription(OVERLAY_PANEL_DOCS_PATH, 'width', 'Width of the overlay panel.'),
      type: 'string | number',
      default: '-',
    },
    attached: {
      description: this._widgetDocs.getDescription(
        OVERLAY_PANEL_DOCS_PATH,
        'attached',
        'Emitted when the overlay panel has been attached to the DOM.',
      ),
      type: 'EventEmitter<void>',
      default: '-',
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

  public getMethodConfig(): DemoMethodConfig[] {
    return [this.overlayPanelControlConfig];
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.OVERLAY_PANEL', 'API.PROPERTY_GROUP.DEFAULT'),
        config: { ...this.overlayPanelInputControlConfig, ...this.overlayPanelPropControlConfig },
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.MENU_ITEM', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.menuItemInputControlConfig,
      },
    ];
  }
}
