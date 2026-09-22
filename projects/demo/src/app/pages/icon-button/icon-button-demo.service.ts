import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import {
  IDS_ICON_BUTTON_DEFAULT_CONFIG_FACTORY,
  IdsIconButtonAppearance,
  IdsIconButtonAppearanceType,
  IdsIconButtonVariant,
  IdsIconButtonVariantType,
} from '@i-cell/ids-angular/icon-button';
import { TranslateService } from '@ngx-translate/core';

const ICON_BUTTON_DOCS_PATH = 'icon-button/icon-button.component.docs.json';

const defaultConfig = IDS_ICON_BUTTON_DEFAULT_CONFIG_FACTORY();

type IconButtonInputControls = {
  size: IdsSizeType;
  variant: IdsIconButtonVariantType;
  appearance: IdsIconButtonAppearanceType;
  disabled: boolean;
  allowCustomContent: boolean;
};

type IconButtonHelperControls = {
  asLink: boolean;
};

@Injectable()
export class IconButtonDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly inputControlConfig: DemoControlConfig<IconButtonInputControls> = {
    size: {
      description: this._widgetDocs.getDescription(ICON_BUTTON_DOCS_PATH, 'size', 'Icon Button size.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: this._widgetDocs.getDescription(ICON_BUTTON_DOCS_PATH, 'variant', 'Icon Button variant.'),
      type: 'IdsIconButtonVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsIconButtonVariant),
    },
    appearance: {
      description: this._widgetDocs.getDescription(ICON_BUTTON_DOCS_PATH, 'appearance', 'Icon Button appearance.'),
      type: 'IdsIconButtonAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsIconButtonAppearance),
    },
    disabled: {
      description: this._widgetDocs.getDescription(ICON_BUTTON_DOCS_PATH, 'disabled', 'Whether the icon button is disabled or not.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    allowCustomContent: {
      description: this._widgetDocs.getDescription(
        ICON_BUTTON_DOCS_PATH,
        'allowCustomContent',
        'Whether the icon button allows arbitrary projected content instead of only ids-icon.',
      ),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly helperControlConfig: DemoControlConfig<IconButtonHelperControls> = {
    asLink: {
      description: 'Whether the idsIconButton is a link (or button).',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public onClick(buttonName: string): void {
    console.info(`${buttonName} icon button clicked`);
  }

  public defaults = getDefaultFromDemoConfig<IconButtonInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<IconButtonHelperControls>(this.helperControlConfig);

  public model: IconButtonInputControls = { ...this.defaults };
  public helperModel: IconButtonHelperControls = { ...this.helperDefaults };

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.ICON_BUTTON', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.inputControlConfig,
      },
    ];
  }
}
