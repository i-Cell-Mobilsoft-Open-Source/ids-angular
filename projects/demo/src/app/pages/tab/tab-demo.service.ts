import { IconService } from '../../core/services/icon.service';

import { DestroyRef, inject, Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsOrientation, IdsOrientationType, IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_TAB_GROUP_DEFAULT_CONFIG_FACTORY, IdsTabGroupPosition, IdsTabGroupPositionType, IdsTabGroupVariant, IdsTabGroupVariantType, IdsTabIndicatorPosition, IdsTabIndicatorPositionType } from '@i-cell/ids-angular/tab';

const defaultConfig = IDS_TAB_GROUP_DEFAULT_CONFIG_FACTORY();

type TabInputControls = {
  size: IdsSizeType,
  variant: IdsTabGroupVariantType,
  orientation: IdsOrientationType,
  stretchTabs: boolean,
  tabPosition: IdsTabGroupPositionType,
  indicatorPosition: IdsTabIndicatorPositionType,
  disabled: boolean,
};

type TabHelperControls = {
  tabItem1Label: string,
  tabItem1Disabled: boolean,
  tabItem1LeadingIcon: string,
  tabItem1TrailingIcon: string,
  tabItem1Id: string,
  tabItem2Label: string,
  tabItem2Disabled: boolean,
  tabItem2LeadingIcon: string,
  tabItem2TrailingIcon: string,
  tabItem2Id: string,
  tabItem3Label: string,
  tabItem3Disabled: boolean,
  tabItem3LeadingIcon: string,
  tabItem3TrailingIcon: string,
  tabItem3Id: string,
};

type TabMethodControls = {
  selectTab: number;
};
@Injectable({ providedIn: 'root' })
export class TabDemoService {
  private readonly _iconService = inject(IconService);
  private readonly _destroyRef = inject(DestroyRef);
  public isLoaded = signal(false);

  public inputControlConfig: DemoControlConfig<TabInputControls> = {
    size: {
      description: 'Tab size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Tab variant.',
      type: 'IdsTabGroupVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsTabGroupVariant),
    },
    orientation: {
      description: 'Tab orientation.',
      type: 'IdsOrientationType',
      default: defaultConfig.orientation,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsOrientation),
    },
    tabPosition: {
      description: 'Tab header position.',
      type: 'IdsTabGroupPositionType',
      default: defaultConfig.tabPosition,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsTabGroupPosition),
    },
    indicatorPosition: {
      description: 'Tab indicator position.',
      type: 'IdsTabIndicatorPositionType',
      default: defaultConfig.indicatorPosition,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsTabIndicatorPosition),
    },
    stretchTabs: {
      description: 'Whether the tab header is stretched or not.',
      type: 'boolean',
      default: defaultConfig.stretchTabs,
      control: DemoControl.SWITCH,
    },
    disabled: {
      description: 'Whether the tab group is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
  };

  public helperControlConfig = signal<DemoControlConfig<TabHelperControls>>({
    tabItem1Label: {
      description: 'Label of Tab',
      type: 'string',
      default: '-',
      demoDefault: 'Tab Label',
    },
    tabItem1LeadingIcon: {
      description: 'Name of the leading icon.',
      type: 'string',
      default: '-',
      demoDefault: '',
      control: DemoControl.SELECT,
      list: [],
    },
    tabItem1TrailingIcon: {
      description: 'Name of the trailing icon.',
      type: 'string',
      default: '-',
      demoDefault: '',
      control: DemoControl.SELECT,
      list: [],
    },
    tabItem1Disabled: {
      description: 'Whether the tab item is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    tabItem1Id: {
      description: 'Id of Tab Item 1',
      type: 'string',
      default: '-',
      demoDefault: 'tab-1',
    },
    tabItem2Label: {
      description: 'Label of Tab',
      type: 'string',
      default: '-',
      demoDefault: 'Tab Label',
    },
    tabItem2LeadingIcon: {
      description: 'Name of the leading icon.',
      type: 'string',
      default: '-',
      demoDefault: '',
      control: DemoControl.SELECT,
      list: [],
    },
    tabItem2TrailingIcon: {
      description: 'Name of the trailing icon.',
      type: 'string',
      default: '-',
      demoDefault: '',
      control: DemoControl.SELECT,
      list: [],
    },
    tabItem2Disabled: {
      description: 'Whether the tab item is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    tabItem2Id: {
      description: 'Id of Tab Item 2',
      type: 'string',
      default: '-',
      demoDefault: 'tab-2',
    },
    tabItem3Label: {
      description: 'Label of Tab',
      type: 'string',
      default: '-',
      demoDefault: 'Tab Label',
    },
    tabItem3LeadingIcon: {
      description: 'Name of the leading icon.',
      type: 'string',
      default: '-',
      demoDefault: '',
      control: DemoControl.SELECT,
      list: [],
    },
    tabItem3TrailingIcon: {
      description: 'Name of the trailing icon.',
      type: 'string',
      default: '-',
      demoDefault: '',
      control: DemoControl.SELECT,
      list: [],
    },
    tabItem3Disabled: {
      description: 'Whether the tab item is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.SWITCH,
    },
    tabItem3Id: {
      description: 'Id of Tab Item 3',
      type: 'string',
      default: '-',
      demoDefault: 'tab-3',
    },
  });

  public readonly methodControlConfig: DemoMethodConfig<TabMethodControls> = {
    selectTab: {
      name: 'selectTab(index: number)',
      description: 'Tab-group: Selects a tab by its index.',
      returnType: 'number',
      parameters: ['index'],
      parameterTypes: ['number'],
      parameterDescriptions: ['The index of the tab to select.'],
    },
  };

  public defaults = getDefaultFromDemoConfig<TabInputControls>(this.inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<TabHelperControls>(this.helperControlConfig());

  public model: TabInputControls = { ...this.defaults };
  public helperModel: TabHelperControls = { ...this.helperDefaults };

  public loadIcons(): void {
    this._iconService
      .loadIcons()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((list: string[]) => {
        this.helperControlConfig.update((cfg) => ({
          ...cfg,
          tabItem1LeadingIcon: { ...cfg.tabItem1LeadingIcon, list: list },
          tabItem1TrailingIcon: { ...cfg.tabItem1TrailingIcon, list: list },
          tabItem2LeadingIcon: { ...cfg.tabItem2LeadingIcon, list: list },
          tabItem2TrailingIcon: { ...cfg.tabItem2TrailingIcon, list: list },
          tabItem3LeadingIcon: { ...cfg.tabItem3LeadingIcon, list: list },
          tabItem3TrailingIcon: { ...cfg.tabItem3TrailingIcon, list: list },
        }));

        this.helperDefaults = getDefaultFromDemoConfig<TabHelperControls>(this.helperControlConfig());
        this.helperModel = { ...this.helperDefaults };

        this.isLoaded.set(true);
      });
  }

  public reset(): void {
    this.defaults = getDefaultFromDemoConfig<TabInputControls>(this.inputControlConfig);
    this.helperDefaults = getDefaultFromDemoConfig<TabHelperControls>(this.helperControlConfig());

    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
  }

  public getMethodConfig(): DemoMethodConfig<TabMethodControls>[] {
    return [this.methodControlConfig];
  }
}
