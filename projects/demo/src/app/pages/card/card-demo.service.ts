import { WidgetDocsService } from '../../services/widget-docs.service';

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

const CARD_DOCS_PATH = 'card/card.component.docs.json';
const CARD_MEDIA_DOCS_PATH = 'card/card-media.directive.docs.json';

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
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly inputControlConfig: DemoControlConfig<CardInputControls> = {
    appearance: {
      description: this._widgetDocs.getDescription(CARD_DOCS_PATH, 'appearance', 'Card appearance.'),
      type: 'IdsCardAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsCardAppearance),
    },
    size: {
      description: this._widgetDocs.getDescription(CARD_DOCS_PATH, 'size', 'Card size.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: this._widgetDocs.getDescription(CARD_DOCS_PATH, 'variant', 'Card variant.'),
      type: 'IdsCardVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsCardVariant),
    },
    orientation: {
      description: this._widgetDocs.getDescription(CARD_DOCS_PATH, 'orientation', 'Card orientation.'),
      type: 'IdsOrientationType',
      default: defaultConfig.orientation,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsOrientation),
    },
    disabled: {
      description: this._widgetDocs.getDescription(CARD_DOCS_PATH, 'disabled', 'Whether the card is disabled or not.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly propControlConfig: DemoControlConfig<unknown> = {
    click: {
      description: this._widgetDocs.getDescription(
        CARD_DOCS_PATH,
        'click',
        'Emitted when the card is clicked (only when the card has a click handler attached).',
      ),
      type: 'EventEmitter<void>',
      default: '-',
    },
  };

  public readonly mediaInputControlConfig: DemoControlConfig<CardMediaInputControls> = {
    stretch: {
      description: this._widgetDocs.getDescription(CARD_MEDIA_DOCS_PATH, 'stretch', 'Whether the image is stretchable or not.'),
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
        config: { ...this.inputControlConfig, ...this.propControlConfig },
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.CARD', 'API.PROPERTY_GROUP.MEDIA'),
        config: this.mediaInputControlConfig,
      },
    ];
  }
}
