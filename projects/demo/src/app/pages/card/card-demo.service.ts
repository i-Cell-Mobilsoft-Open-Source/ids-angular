import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import {
  IDS_CARD_DEFAULT_CONFIG_FACTORY,
  IdsCardAppearance,
  IdsCardAppearanceType,
  IdsCardVariant,
  IdsCardVariantType,
} from '@i-cell/ids-angular/card';
import { IdsOrientation, IdsOrientationType, IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { TranslateService } from '@ngx-translate/core';

const defaultConfig = IDS_CARD_DEFAULT_CONFIG_FACTORY();

type CardInputControls = {
  appearance: IdsCardAppearanceType;
  size: IdsSizeType;
  variant: IdsCardVariantType;
  orientation: IdsOrientationType;
  disabled: boolean;
};

type CardMediaInputControls = {
  stretch: boolean;
};

type CardHelperControls = {
  clickable: boolean;
};

@Injectable()
export class CardDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);

  public readonly inputControlConfig: DemoControlConfig<CardInputControls> = {
    appearance: {
      description: 'Card appearance.',
      type: 'IdsCardAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsCardAppearance),
    },
    size: {
      description: 'Card size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Card variant.',
      type: 'IdsCardVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsCardVariant),
    },
    orientation: {
      description: 'Card orientation.',
      type: 'IdsOrientationType',
      default: defaultConfig.orientation,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsOrientation),
    },
    disabled: {
      description: 'Whether the card is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly mediaInputControlConfig: DemoControlConfig<CardMediaInputControls> = {
    stretch: {
      description: 'Whether the image is stretchable or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
  };

  public readonly helperControlConfig: DemoControlConfig<CardHelperControls> = {
    clickable: {
      description: 'Whether the card is clickable or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public defaults = getDefaultFromDemoConfig<CardInputControls>(this.inputControlConfig);
  public mediaDefaults = getDefaultFromDemoConfig<CardMediaInputControls>(this.mediaInputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<CardHelperControls>(this.helperControlConfig);

  public model: CardInputControls = { ...this.defaults };
  public mediaModel: CardMediaInputControls = { ...this.mediaDefaults };
  public helperModel: CardHelperControls = { ...this.helperDefaults };

  public onClick(): void {
    alert('Click');
  }

  public reset(): void {
    this.model = { ...this.defaults };
    this.mediaModel = { ...this.mediaDefaults };
    this.helperModel = { ...this.helperDefaults };
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.CARD', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.inputControlConfig,
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.CARD', 'API.PROPERTY_GROUP.MEDIA'),
        config: this.mediaInputControlConfig,
      },
    ];
  }
}
