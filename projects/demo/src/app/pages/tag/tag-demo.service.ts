import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_TAG_DEFAULT_CONFIG_FACTORY, IDS_TAG_GROUP_DEFAULT_CONFIG_FACTORY, IdsTagAppearance, IdsTagAppearanceType, IdsTagVariant, IdsTagVariantType } from '@i-cell/ids-angular/tag';
import { TranslateService } from '@ngx-translate/core';

const TAG_DOCS_PATH = 'tag/tag.component.docs.json';
const TAG_GROUP_DOCS_PATH = 'tag/tag-group.component.docs.json';

const defaultConfig = IDS_TAG_DEFAULT_CONFIG_FACTORY();
const defaultGroupConfig = IDS_TAG_GROUP_DEFAULT_CONFIG_FACTORY();

type TagInputControls = {
  appearance: IdsTagAppearanceType,
  size: IdsSizeType,
  variant: IdsTagVariantType,
};

type TagHelperControls = {
  hasLeadingIcon: boolean,
  hasTrailingIcon: boolean,
};

type TagGroupInputControls = {
  appearance: IdsTagAppearanceType,
  size: IdsSizeType,
};
@Injectable()
export class TagDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly inputControlConfig: DemoControlConfig<TagInputControls> = {
    appearance: {
      description: this._widgetDocs.getDescription(TAG_DOCS_PATH, 'appearance', 'Appearance of the tag.'),
      type: 'IdsTagAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsTagAppearance),
    },
    size: {
      description: this._widgetDocs.getDescription(TAG_DOCS_PATH, 'size', 'Size of the tag.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: this._widgetDocs.getDescription(TAG_DOCS_PATH, 'variant', 'Variant of the tag.'),
      type: 'IdsTagVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsTagVariant),
    },
  };

  public readonly helperControlConfig: DemoControlConfig<TagHelperControls> = {
    hasLeadingIcon: {
      description: 'Whether the tag has leading icon or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    hasTrailingIcon: {
      description: 'Whether the tag has trailing icon or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public readonly groupInputControlConfig: DemoControlConfig<TagGroupInputControls> = {
    appearance: {
      description: this._widgetDocs.getDescription(TAG_GROUP_DOCS_PATH, 'appearance', 'Appearance of the tag group.'),
      type: 'IdsTagAppearanceType',
      default: defaultGroupConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsTagAppearance),
    },
    size: {
      description: this._widgetDocs.getDescription(TAG_GROUP_DOCS_PATH, 'size', 'Size of the tag group.'),
      type: 'IdsSizeType',
      default: defaultGroupConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
  };

  public defaults = getDefaultFromDemoConfig<TagInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<TagHelperControls>(this.helperControlConfig);
  public groupDefaults = getDefaultFromDemoConfig<TagGroupInputControls>(this.groupInputControlConfig);

  public model: TagInputControls = { ...this.defaults };
  public helperModel: TagHelperControls = { ...this.helperDefaults };
  public groupModel: TagGroupInputControls = { ...this.groupDefaults };

  public onClick(tagName: string): void {
    console.info(`${tagName} tag clicked`);
  }

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
    this.groupModel = { ...this.groupDefaults };
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.TAG', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.inputControlConfig,
      },
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.TAG', 'API.PROPERTY_GROUP.GROUP'),
        config: this.groupInputControlConfig,
      },
    ];
  }
}
