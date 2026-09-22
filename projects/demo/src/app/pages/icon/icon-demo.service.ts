import { IconService } from '../../core/services/icon.service';
import { WidgetDocsService } from '../../services/widget-docs.service';

import { inject, Injectable, signal, DestroyRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { IdsSize, IdsSizeCollection, IdsSizeCollectionType, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_ICON_DEFAULT_CONFIG_FACTORY, IdsIconVariant, IdsIconVariantType } from '@i-cell/ids-angular/icon';
import { TranslateService } from '@ngx-translate/core';

const ICON_DOCS_PATH = 'icon/icon.component.docs.json';

const defaultConfig = IDS_ICON_DEFAULT_CONFIG_FACTORY();

type IconInputControls = {
  size: IdsSizeType;
  sizeCollection: IdsSizeCollectionType;
  variant: IdsIconVariantType;
  fontIcon: string;
  svgIcon: string;
  'aria-hidden': boolean;
};
@Injectable()
export class IconDemoService {
  private readonly _apiTitleTranslate = inject(TranslateService);
  private readonly _widgetDocs = inject(WidgetDocsService);

  private readonly _iconService = inject(IconService);
  private readonly _destroyRef = inject(DestroyRef);

  public isLoaded = signal(false);

  public inputControlConfig = signal<DemoControlConfig<IconInputControls>>({
    size: {
      description: this._widgetDocs.getDescription(ICON_DOCS_PATH, 'size', 'Icon size.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    sizeCollection: {
      description: this._widgetDocs.getDescription(ICON_DOCS_PATH, 'sizeCollection', 'Icon size collection.'),
      type: 'IdsSizeCollectionType',
      default: defaultConfig.sizeCollection,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSizeCollection),
    },
    variant: {
      description: this._widgetDocs.getDescription(ICON_DOCS_PATH, 'variant', 'Icon variant.'),
      type: 'IdsIconVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsIconVariant),
    },
    fontIcon: {
      description: this._widgetDocs.getDescription(ICON_DOCS_PATH, 'fontIcon', 'Name of font icon.'),
      type: 'string',
      default: '-',
      demoDefault: 'key',
      control: DemoControl.SELECT,
      list: [],
    },
    svgIcon: {
      description: this._widgetDocs.getDescription(ICON_DOCS_PATH, 'svgIcon', 'Name of svg icon file'),
      type: 'IdsIconVariantType',
      default: '-',
      demoDefault: 'key',
      control: DemoControl.SELECT,
      list: [],
    },
    'aria-hidden': {
      description: this._widgetDocs.getDescription(
        ICON_DOCS_PATH,
        'aria-hidden',
        'Determinate whether the component is hidden or not for screen readers.',
      ),
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  });

  public loadIcons(): void {
    this._iconService
      .loadIcons()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((list: string[]) => {
        this.inputControlConfig.update((currentConfig) => ({
          ...currentConfig,
          fontIcon: { ...currentConfig.fontIcon, list: list },
          svgIcon: { ...currentConfig.svgIcon, list: list },
        }));

        const currentDefaults = getDefaultFromDemoConfig<IconInputControls>(this.inputControlConfig());
        this.model = { ...currentDefaults };

        this.isLoaded.set(true);
      });
  }

  public defaults = getDefaultFromDemoConfig<IconInputControls>(this.inputControlConfig());

  public model: IconInputControls = { ...this.defaults };

  public reset(): void {
    this.defaults = getDefaultFromDemoConfig<IconInputControls>(this.inputControlConfig());
    this.model = { ...this.defaults };
  }

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this._apiTitleTranslate, 'COMPONENTS.ICON', 'API.PROPERTY_GROUP.DEFAULT'),
        config: this.inputControlConfig(),
      },
    ];
  }
}
