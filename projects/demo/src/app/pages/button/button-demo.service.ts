import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoSlotConfig } from '@demo-types/demo-slot.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import {
  IDS_BUTTON_DEFAULT_CONFIG_FACTORY,
  IDS_BUTTON_GROUP_DEFAULT_CONFIG_FACTORY,
  IdsButtonAppearance,
  IdsButtonAppearanceType,
  IdsButtonVariant,
  IdsButtonVariantType,
} from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { TranslateService } from '@ngx-translate/core';

const BUTTON_DOCS_PATH = 'button/button.component.docs.json';
const BUTTON_GROUP_DOCS_PATH = 'button/button-group.component.docs.json';
const BUTTON_SLOTS_DOCS_PATH = 'button/button.component.slots.docs.json';

const defaultConfig = IDS_BUTTON_DEFAULT_CONFIG_FACTORY();
const defaultGroupConfig = IDS_BUTTON_GROUP_DEFAULT_CONFIG_FACTORY();

export type ButtonInputControls = {
  appearance: IdsButtonAppearanceType;
  size: IdsSizeType;
  variant: IdsButtonVariantType;
  disabled: boolean;
};

export type ButtonHelperControls = {
  text: string;
  hasLeadingIcon: boolean;
  hasTrailingIcon: boolean;
  asLink: boolean;
};

export type ButtonGroupInputControls = {
  size: IdsSizeType;
};

@Injectable()
export class ButtonDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly inputControlConfig: DemoControlConfig<ButtonInputControls> = {
    appearance: {
      description: this._widgetDocs.getDescription(BUTTON_DOCS_PATH, 'appearance', 'Button appearance.'),
      type: 'IdsButtonAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsButtonAppearance),
    },
    size: {
      description: this._widgetDocs.getDescription(BUTTON_DOCS_PATH, 'size', 'Button size.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: this._widgetDocs.getDescription(BUTTON_DOCS_PATH, 'variant', 'Button variant.'),
      type: 'IdsButtonVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsButtonVariant),
    },
    disabled: {
      description: this._widgetDocs.getDescription(BUTTON_DOCS_PATH, 'disabled', 'Whether the button is disabled or not.'),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly helperControlConfig: DemoControlConfig<ButtonHelperControls> = {
    text: {
      description: 'Text of button',
      type: 'string',
      default: '-',
      demoDefault: 'Sample button',
      list: convertEnumToStringArray(IdsButtonAppearance),
    },
    hasLeadingIcon: {
      description: 'Whether the button has leading icon or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
    hasTrailingIcon: {
      description: 'Whether the button has trailing icon or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.SWITCH,
    },
    asLink: {
      description: 'Whether the idsButton is a link (or button).',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly groupInputControlConfig: DemoControlConfig<ButtonGroupInputControls> = {
    size: {
      description: this._widgetDocs.getDescription(BUTTON_GROUP_DOCS_PATH, 'size', 'Size of the buttons in the group.'),
      type: 'IdsSizeType',
      default: defaultGroupConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
  };

  public defaults = getDefaultFromDemoConfig<ButtonInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<ButtonHelperControls>(this.helperControlConfig);
  public groupDefaults = getDefaultFromDemoConfig<ButtonGroupInputControls>(this.groupInputControlConfig);

  public model: ButtonInputControls = { ...this.defaults };
  public helperModel: ButtonHelperControls = { ...this.helperDefaults };
  public groupModel: ButtonGroupInputControls = { ...this.groupDefaults };

  public onClick(buttonName: string): void {
    console.info(`${buttonName} button clicked`);
  }

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
    this.groupModel = { ...this.groupDefaults };
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.BUTTON', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.inputControlConfig,
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.BUTTON', 'API.PROPERTY_GROUP.GROUP'),
        config: this.groupInputControlConfig,
      },
    ];
  }

  public readonly slotControlConfig: DemoSlotConfig = [
    {
      name: 'iconLeading',
      selector: '[icon-leading]',
      description: this._widgetDocs.getDescription(
        BUTTON_SLOTS_DOCS_PATH,
        'iconLeading',
        'Content projected before the label (marked with the icon-leading attribute), typically an icon.',
      ),
    },
    {
      name: 'content',
      description: this._widgetDocs.getDescription(
        BUTTON_SLOTS_DOCS_PATH,
        'content',
        'Default content of the button, i.e. the button\'s label.',
      ),
    },
    {
      name: 'iconTrailing',
      selector: '[icon-trailing]',
      description: this._widgetDocs.getDescription(
        BUTTON_SLOTS_DOCS_PATH,
        'iconTrailing',
        'Content projected after the label (marked with the icon-trailing attribute), typically an icon.',
      ),
    },
  ];

  public getSlotConfig(): DemoSlotConfig[] {
    return [this.slotControlConfig];
  }

  public getSlotTitles(): string[] {
    return ['Button'];
  }
}
