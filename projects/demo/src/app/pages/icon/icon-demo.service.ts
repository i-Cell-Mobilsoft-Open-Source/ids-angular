import { IconService } from '../../core/services/icon.service';

import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsSize, IdsSizeCollection, IdsSizeCollectionType, IdsSizeType } from '@i-cell/ids-angular/core';
import {
  IDS_ICON_DEFAULT_CONFIG_FACTORY, IdsIconFontSet,
  IdsIconFontSetType,
  IdsIconVariant,
  IdsIconVariantType,
} from '@i-cell/ids-angular/icon';

const defaultConfig = IDS_ICON_DEFAULT_CONFIG_FACTORY();

type IconInputControls = {
  size: IdsSizeType,
  sizeCollection: IdsSizeCollectionType,
  variant: IdsIconVariantType,
  fontSet: IdsIconFontSetType,
  fontIcon: string
  svgIcon: string,
  'aria-hidden': boolean,
};
@Injectable()
export class IconDemoService {
  private readonly _iconService = inject(IconService);
  private readonly _destroyRef = inject(DestroyRef);

  public isLoaded = signal(false);

  public inputControlConfig = signal<DemoControlConfig<IconInputControls>>({
    size: {
      description: 'Icon size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    sizeCollection: {
      description: 'Icon size collection.',
      type: 'IdsSizeCollectionType',
      default: defaultConfig.sizeCollection,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSizeCollection),
    },
    variant: {
      description: 'Icon variant.',
      type: 'IdsIconVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsIconVariant),
    },
    fontSet: {
      description: 'Icon font set.',
      type: 'IdsIconFontSetType',
      default: defaultConfig.fontSet,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsIconFontSet),
    },
    fontIcon: {
      description: 'Name of font icon.',
      type: 'string',
      default: '-',
      demoDefault: 'chevron_right',
      control: DemoControl.TEXT,
      list: [],
    },
    svgIcon: {
      description: 'Name of svg icon file',
      type: 'IdsIconVariantType',
      default: '-',
      demoDefault: 'key',
      control: DemoControl.SELECT,
      list: [],
    },
    'aria-hidden': {
      description: 'Determinate whether the component is hidden or not for screen readers.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  });

  public loadIcons(): void {
    this._iconService.loadIcons().pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((list: string[]) => {

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

  public model: IconInputControls = { ...this.defaults  };

  public reset(): void {
    this.defaults = getDefaultFromDemoConfig<IconInputControls>(this.inputControlConfig());
    this.model = { ...this.defaults };
  }
}
