import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IDS_AVATAR_DEFAULT_CONFIG_FACTORY, IdsAvatarVariant, IdsAvatarVariantType } from '@i-cell/ids-angular/avatar';
import { IdsSize, IdsSizeCollection, IdsSizeCollectionType, IdsSizeType } from '@i-cell/ids-angular/core';
import { TranslateService } from '@ngx-translate/core';

const AVATAR_DOCS_PATH = 'avatar/avatar.component.docs.json';

const defaultConfig = IDS_AVATAR_DEFAULT_CONFIG_FACTORY();

type AvatarInputControls = {
  initials: string;
  size: IdsSizeType;
  sizeCollection: IdsSizeCollectionType;
  variant: IdsAvatarVariantType;
};

@Injectable()
export class AvatarDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public readonly inputControlConfig: DemoControlConfig<AvatarInputControls> = {
    initials: {
      description: this._widgetDocs.getDescription(AVATAR_DOCS_PATH, 'initials', 'Avatar initials.'),
      type: 'string',
      default: '-',
      demoDefault: 'SJ',
    },
    size: {
      description: this._widgetDocs.getDescription(AVATAR_DOCS_PATH, 'size', 'Avatar size.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    sizeCollection: {
      description: this._widgetDocs.getDescription(AVATAR_DOCS_PATH, 'sizeCollection', 'Avatar sizeCollection.'),
      type: 'IdsSizeCollectionType',
      default: defaultConfig.sizeCollection,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSizeCollection),
    },
    variant: {
      description: this._widgetDocs.getDescription(AVATAR_DOCS_PATH, 'variant', 'Avatar variant.'),
      type: 'IdsAvatarVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsAvatarVariant),
    },
  };

  public defaults = getDefaultFromDemoConfig<AvatarInputControls>(this.inputControlConfig);

  public model: AvatarInputControls = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.AVATAR', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.inputControlConfig,
      },
    ];
  }
}
