import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IDS_BADGE_DEFAULT_CONFIG_FACTORY, IdsBadgeAppearance, IdsBadgeAppearanceType, IdsBadgeVariant, IdsBadgeVariantType } from '@i-cell/ids-angular/badge';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { TranslateService } from '@ngx-translate/core';

const BADGE_DOCS_PATH = 'badge/badge.component.docs.json';

type BadgeInputControls = {
  appearance: IdsBadgeAppearanceType;
  size: IdsSizeType;
  variant: IdsBadgeVariantType;
  showLeadingElement: boolean;
  label: string;
  limit: number | null;
};

const defaultConfig = IDS_BADGE_DEFAULT_CONFIG_FACTORY();

@Injectable()
export class BadgeDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly inputControlConfig: DemoControlConfig<BadgeInputControls> = {
    appearance: {
      description: this._widgetDocs.getDescription(BADGE_DOCS_PATH, 'appearance', 'Badge appearance.'),
      type: 'IdsBadgeAppearanceType',
      default: defaultConfig.appearance,
      list: Object.values(IdsBadgeAppearance),
      control: 'select',
    },
    size: {
      description: this._widgetDocs.getDescription(BADGE_DOCS_PATH, 'size', 'Badge size.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      list: Object.values(IdsSize),
      control: 'select',
    },
    variant: {
      description: this._widgetDocs.getDescription(BADGE_DOCS_PATH, 'variant', 'Badge variant.'),
      type: 'IdsBadgeVariantType',
      default: defaultConfig.variant,
      list: Object.values(IdsBadgeVariant),
      control: 'select',
    },
    showLeadingElement: {
      description: this._widgetDocs.getDescription(BADGE_DOCS_PATH, 'showLeadingElement', 'Has leading icon.'),
      type: 'boolean',
      control: 'switch',
      default: defaultConfig.showLeadingElement,
    },
    label: {
      description: this._widgetDocs.getDescription(BADGE_DOCS_PATH, 'label', 'Badge text.'),
      type: 'string',
      default: '',
      demoDefault: '1000',
    },
    limit: {
      description: this._widgetDocs.getDescription(BADGE_DOCS_PATH, 'limit', 'Badge limit.'),
      type: 'number',
      default: null,
      demoDefault: 100,
    },
  };

  public defaults = getDefaultFromDemoConfig<BadgeInputControls>(this.inputControlConfig);

  public model: BadgeInputControls = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.BADGE', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.inputControlConfig,
      },
    ];
  }
}
