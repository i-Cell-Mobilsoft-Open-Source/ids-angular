import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IDS_BADGE_DEFAULT_CONFIG_FACTORY, IdsBadgeVariant, IdsBadgeVariantType } from '@i-cell/ids-angular/badge';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { TranslateService } from '@ngx-translate/core';

type BadgeInputControls = {
  size: IdsSizeType;
  variant: IdsBadgeVariantType;
  hasLeadingIcon: boolean;
  label: string;
  limit: number | null;
};

const defaultConfig = IDS_BADGE_DEFAULT_CONFIG_FACTORY();

@Injectable()
export class BadgeDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);

  public readonly inputControlConfig: DemoControlConfig<BadgeInputControls> = {
    size: {
      description: 'Badge size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      list: Object.values(IdsSize),
      control: 'select',
    },
    variant: {
      description: 'Badge variant.',
      type: 'IdsBadgeVariantType',
      default: defaultConfig.variant,
      list: Object.values(IdsBadgeVariant),
      control: 'select',
    },
    hasLeadingIcon: {
      description: 'Has leading icon.',
      type: 'boolean',
      control: 'switch',
      default: defaultConfig.showLeadingElement,
    },
    label: {
      description: 'Badge text.',
      type: 'string',
      default: '',
      demoDefault: '1000',
    },
    limit: {
      description: 'Badge limit.',
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
