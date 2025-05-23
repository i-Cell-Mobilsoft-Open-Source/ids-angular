import { IdsTabGroupComponent } from '../../../../../widgets/tab/tab-group.component';
import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';
import { IconService } from '../../core/services/icon.service';

import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsOrientation, IdsOrientationType, IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_TAB_GROUP_DEFAULT_CONFIG_FACTORY, IdsTabComponent, IdsTabGroupPosition, IdsTabGroupPositionType, IdsTabGroupVariant, IdsTabGroupVariantType, IdsTabIndicatorPosition, IdsTabIndicatorPositionType } from '@i-cell/ids-angular/tab';
import { TranslateModule } from '@ngx-translate/core';

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

@Component({
  selector: 'app-tab-demo',
  imports: [
    TryoutComponent,
    ControlTableComponent,
    IdsTabGroupComponent,
    IdsTabComponent,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './tab-demo.component.html',
  styleUrls: [
    '../demo-page.scss',
    './tab-demo.component.scss',
  ],
})
export class TabsDemoComponent implements OnInit {
  private readonly _iconService = inject(IconService);
  private readonly _destroyRef = inject(DestroyRef);
  protected _inputControlConfig: DemoControlConfig<TabInputControls> = {
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
      control: DemoControl.CHECKBOX,
    },
    disabled: {
      description: 'Whether the tab group is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
  };

  protected _helperControlConfig: DemoControlConfig<TabHelperControls> = {
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
      control: DemoControl.CHECKBOX,
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
      control: DemoControl.CHECKBOX,
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
      control: DemoControl.CHECKBOX,
    },
    tabItem3Id: {
      description: 'Id of Tab Item 3',
      type: 'string',
      default: '-',
      demoDefault: 'tab-3',
    },
  };

  public ngOnInit(): void {
    this._loadIcons();
  }

  private _loadIcons(): void {
    this._iconService.loadIcons().pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((list: string[]) => {
      this._helperControlConfig = {
        ...this._helperControlConfig,
        tabItem1LeadingIcon: { ...this._helperControlConfig.tabItem1LeadingIcon, list },
        tabItem1TrailingIcon: { ...this._helperControlConfig.tabItem1TrailingIcon, list },
        tabItem2LeadingIcon: { ...this._helperControlConfig.tabItem2LeadingIcon, list },
        tabItem2TrailingIcon: { ...this._helperControlConfig.tabItem2TrailingIcon, list },
        tabItem3LeadingIcon: { ...this._helperControlConfig.tabItem3LeadingIcon, list },
        tabItem3TrailingIcon: { ...this._helperControlConfig.tabItem3TrailingIcon, list },
      };
    });
  }

  public defaults = getDefaultFromDemoConfig<TabInputControls>(this._inputControlConfig);
  public helperDefaults = getDefaultFromDemoConfig<TabHelperControls>(this._helperControlConfig);

  public model: TabInputControls = { ...this.defaults };
  public helperModel: TabHelperControls = { ...this.helperDefaults };

  public reset(): void {
    this.model = { ...this.defaults };
    this.helperModel = { ...this.helperDefaults };
  }
}
