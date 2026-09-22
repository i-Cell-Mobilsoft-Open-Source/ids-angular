import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_SIDE_NAV_DEFAULT_CONFIG_FACTORY, IdsSideNavAppearance, IdsSideNavAppearanceType, IdsSideNavVariant, IdsSideNavVariantType } from '@i-cell/ids-angular/side-nav';
import { TranslateService } from '@ngx-translate/core';

const SIDE_NAV_DOCS_PATH = 'side-nav/side-nav.component.docs.json';
const SIDE_NAV_ITEM_DOCS_PATH = 'side-nav/side-nav-item.component.docs.json';

type SideNavInputControls = {
  appearance: IdsSideNavAppearanceType;
  size: IdsSizeType;
  variant: IdsSideNavVariantType;
};

type SideNavHelperControls = {
  text: string,
  target: string,
  hasLeadingIcon: boolean,
  hasTrailingIcon: boolean,
  disabled: boolean,
  hasActiveIndicator: boolean,
  hasLabel: boolean,
  hasTooltip: boolean,
};

const sideNavDefaultConfig = IDS_SIDE_NAV_DEFAULT_CONFIG_FACTORY();
@Injectable()
export class SideNavDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly sideNavInputControlConfig: DemoControlConfig<SideNavInputControls> = {
    appearance: {
      description: this._widgetDocs.getDescription(SIDE_NAV_DOCS_PATH, 'appearance', 'Side nav appearance.'),
      type: 'IdsSideNavAppearanceType',
      control: 'select',
      list: convertEnumToStringArray(IdsSideNavAppearance),
      default: sideNavDefaultConfig.appearance,
    },
    size: {
      description: this._widgetDocs.getDescription(SIDE_NAV_DOCS_PATH, 'size', 'Side nav size.'),
      type: 'IdsSizeType',
      control: 'select',
      list: convertEnumToStringArray(IdsSize),
      default: sideNavDefaultConfig.size,
    },
    variant: {
      description: this._widgetDocs.getDescription(SIDE_NAV_DOCS_PATH, 'variant', 'Side nav variant.'),
      type: 'IdsSideNavVariantType',
      control: 'select',
      list: convertEnumToStringArray(IdsSideNavVariant),
      default: sideNavDefaultConfig.variant,
    },
  };

  public readonly helperControlConfig: DemoControlConfig<SideNavHelperControls> = {
    text: {
      description: 'Text of side nav item',
      type: 'string',
      default: '-',
      demoDefault: 'Accordion',
    },
    target: {
      description: 'Router link of side nav item',
      type: 'string',
      default: '-',
      demoDefault: 'components/accordion/demo',
    },
    hasLeadingIcon: {
      description: 'Whether the side nav item has leading icon or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
    hasTrailingIcon: {
      description: 'Whether the side nav item has trailing icon or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    disabled: {
      description: 'Whether the side nav item is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    hasActiveIndicator: {
      description: 'Whether the side nav has active indicator or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    hasLabel: {
      description: 'Whether the side nav has label or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
    hasTooltip: {
      description: 'Whether the side nav item has tooltip or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public sideNavDefaults = getDefaultFromDemoConfig<SideNavInputControls>(this.sideNavInputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<SideNavHelperControls>(this.helperControlConfig);

  public model: SideNavInputControls = { ...this.sideNavDefaults };
  public helperModel: SideNavHelperControls = { ...this.helperDefaults };

  public reset(): void {
    this.model = { ...this.sideNavDefaults };
    this.helperModel = { ...this.helperDefaults };
  }

  public readonly itemPropControlConfig: DemoControlConfig<unknown> = {
    label: {
      description: this._widgetDocs.getDescription(
        SIDE_NAV_ITEM_DOCS_PATH,
        'label',
        'Label of the side nav item (used as the accessible name and tooltip text).',
      ),
      type: 'string',
      default: '-',
    },
    templateChildren: {
      description: this._widgetDocs.getDescription(
        SIDE_NAV_ITEM_DOCS_PATH,
        'templateChildren',
        'Custom template rendered as the content of the side nav item, instead of the default label/icon layout.',
      ),
      type: 'TemplateRef<HTMLElement>',
      default: '-',
    },
    isActiveMatchOptions: {
      description: this._widgetDocs.getDescription(
        SIDE_NAV_ITEM_DOCS_PATH,
        'isActiveMatchOptions',
        'Router "isActive" match options used to determine the active state of the side nav item.',
      ),
      type: 'IsActiveMatchOptions',
      default: '-',
    },
    expanded: {
      description: this._widgetDocs.getDescription(
        SIDE_NAV_ITEM_DOCS_PATH,
        'expanded',
        'Whether the expandable side nav item is expanded initially.',
      ),
      type: 'boolean',
      default: false,
    },
  };

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.SIDE_NAV', 'API.PROPERTY_GROUP.DEFAULT'),
        config: { ...this.sideNavInputControlConfig, ...this.itemPropControlConfig },
      },
    ];
  }
}
