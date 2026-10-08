import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import {
  IDS_BREADCRUMB_DEFAULT_CONFIG_FACTORY,
  IdsBreadcrumbDivider,
  IdsBreadcrumbDividerType,
  IdsBreadcrumbHierarchyType,
  IdsBreadcrumbVariant,
  IdsBreadcrumbVariantType,
} from '@i-cell/ids-angular/breadcrumb';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import {
  IdsOverlayPanelAppearance,
  IdsOverlayPanelAppearanceType,
  IdsOverlayPanelVariant,
  IdsOverlayPanelVariantType,
} from '@i-cell/ids-angular/overlay-panel';
import { TranslateService } from '@ngx-translate/core';

const BREADCRUMB_DOCS_PATH = 'breadcrumb/breadcrumb.component.docs.json';

type BreadcrumbInputControls = {
  size: IdsSizeType;
  variant: IdsBreadcrumbVariantType;
  dividerType: IdsBreadcrumbDividerType;
};

type OverlayPanelInputControls = {
  overlayAppearance: IdsOverlayPanelAppearanceType;
  overlaySize: IdsSizeType;
  overlayVariant: IdsOverlayPanelVariantType;
};

const breadcrumbDefaultConfig = IDS_BREADCRUMB_DEFAULT_CONFIG_FACTORY();

@Injectable()
export class BreadcrumbDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly breadcrumbInputControlConfig: DemoControlConfig<BreadcrumbInputControls> = {
    size: {
      description: this._widgetDocs.getDescription(BREADCRUMB_DOCS_PATH, 'size', 'Breadcrumb size.'),
      type: 'IdsSizeType',
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
      default: breadcrumbDefaultConfig.size,
    },
    variant: {
      description: this._widgetDocs.getDescription(BREADCRUMB_DOCS_PATH, 'variant', 'Breadcrumb variant.'),
      type: 'IdsBadgeVariantType',
      control: 'select',
      list: convertEnumToStringArray(IdsBreadcrumbVariant),
      default: breadcrumbDefaultConfig.variant,
    },
    dividerType: {
      description: this._widgetDocs.getDescription(BREADCRUMB_DOCS_PATH, 'dividerType', 'Divider type.'),
      type: 'IdsBreadcrumbDividerType',
      control: 'select',
      list: convertEnumToStringArray(IdsBreadcrumbDivider),
      default: breadcrumbDefaultConfig.dividerType,
    },
  };

  public readonly breadcrumbPropControlConfig: DemoControlConfig<unknown> = {
    hierarchy: {
      description: this._widgetDocs.getDescription(
        BREADCRUMB_DOCS_PATH,
        'hierarchy',
        'Array of breadcrumb items (label, path, disabled) describing the navigation hierarchy.',
      ),
      type: 'IdsBreadcrumbHierarchyType[]',
      default: [],
    },
  };

  public readonly overlayPanelInputControlConfig: DemoControlConfig<OverlayPanelInputControls> = {
    overlayAppearance: {
      description: this._widgetDocs.getDescription(BREADCRUMB_DOCS_PATH, 'overlayAppearance', 'Overlay panel appearance.'),
      type: 'IdsOverlayPanelAppearanceType',
      default: breadcrumbDefaultConfig.overlayAppearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsOverlayPanelAppearance),
    },
    overlaySize: {
      description: this._widgetDocs.getDescription(BREADCRUMB_DOCS_PATH, 'overlaySize', 'Overlay panel size.'),
      type: 'IdsSizeType',
      default: breadcrumbDefaultConfig.overlaySize,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    overlayVariant: {
      description: this._widgetDocs.getDescription(BREADCRUMB_DOCS_PATH, 'overlayVariant', 'Overlay panel variant.'),
      type: 'IdsOverlayPanelVariantType',
      default: breadcrumbDefaultConfig.overlayVariant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsOverlayPanelVariant),
    },
  };

  public breadcrumbDefaults = getDefaultFromDemoConfig<BreadcrumbInputControls>(this.breadcrumbInputControlConfig);
  public overlayPanelDefaults = getDefaultFromDemoConfig<OverlayPanelInputControls>(this.overlayPanelInputControlConfig);

  public hierarchy: IdsBreadcrumbHierarchyType[] = [
    {
      label: 'Home',
      path: '/index',
    },
    {
      label: 'Components',
      path: '/components',
    },
    {
      label: 'Breadcrumb',
      path: '/breadcrumb',
    },
  ];

  public scrollTestHierarchy: IdsBreadcrumbHierarchyType[] = [
    {
      label: 'Home',
      path: '/index',
    },
    {
      label: 'Products',
      path: '/products',
    },
    {
      label: 'Design system',
      path: '/products/design-system',
    },
    {
      label: 'Components',
      path: '/products/design-system/components',
    },
    {
      label: 'Navigation',
      path: '/products/design-system/components/navigation',
    },
    {
      label: 'Breadcrumb',
      path: '/products/design-system/components/navigation/breadcrumb',
    },
    {
      label: 'Truncation overlay',
      path: '/products/design-system/components/navigation/breadcrumb/truncation-overlay',
    },
  ];

  public breadcrumbModel: BreadcrumbInputControls = { ...this.breadcrumbDefaults };
  public overlayPanelModel: OverlayPanelInputControls = { ...this.overlayPanelDefaults };

  public reset(): void {
    this.breadcrumbModel = { ...this.breadcrumbDefaults };
    this.overlayPanelModel = { ...this.overlayPanelDefaults };
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.BREADCRUMB', 'API.PROPERTY_GROUP.DEFAULT'),
        config: { ...this.breadcrumbInputControlConfig, ...this.breadcrumbPropControlConfig },
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.OVERLAY_PANEL', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.overlayPanelInputControlConfig,
      },
    ];
  }
}
