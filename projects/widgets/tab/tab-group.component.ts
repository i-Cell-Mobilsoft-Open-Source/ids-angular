import { IDS_TAB_GROUP_DEFAULT_CONFIG, IDS_TAB_GROUP_DEFAULT_CONFIG_FACTORY, IdsTabGroupDefaultConfig } from './tab-group-defaults';
import { IdsTabComponent } from './tab.component';
import { IdsTabGroupPositionType } from './types/tab-group-position.type';
import { IdsTabGroupVariantType } from './types/tab-group-variant.type';
import { IdsTabIndicatorPosition, IdsTabIndicatorPositionType } from './types/tab-indicator-position.type';

import { CdkPortalOutlet, PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { AfterContentInit, ChangeDetectionStrategy, Component, computed, contentChildren, inject, input, isDevMode, signal, viewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { coerceBooleanAttribute, ComponentBaseWithDefaults, IdsOrientation, IdsOrientationType, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

const defaultConfig = IDS_TAB_GROUP_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-tab-group',
  imports: [
    PortalModule,
    IdsIconComponent,
  ],
  templateUrl: './tab-group.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsTabGroupComponent extends ComponentBaseWithDefaults<IdsTabGroupDefaultConfig> implements AfterContentInit {
  protected override get _hostName(): string {
    return 'tab-group';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_TAB_GROUP_DEFAULT_CONFIG);

  protected _items = contentChildren<IdsTabComponent>(IdsTabComponent);
  private _portalOutlet = viewChild.required<CdkPortalOutlet>(CdkPortalOutlet);
  private _viewContainerRef = inject(ViewContainerRef);

  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsTabGroupVariantType>(this._defaultConfig.variant);
  public orientation = input<IdsOrientationType>(this._defaultConfig.orientation);
  public stretchTabs = input(this._defaultConfig.stretchTabs, { transform: coerceBooleanAttribute });
  public tabPosition = input<IdsTabGroupPositionType>(this._defaultConfig.tabPosition);
  public indicatorPosition = input<IdsTabIndicatorPositionType>();
  public disabled = input(false, { transform: coerceBooleanAttribute });

  protected _selectedTabIndex = signal<number>(0);

  protected _hostClasses = computed(() => this._getHostClasses([
    this.size(),
    this.variant(),
    this.orientation(),
    this.disabled() ? 'disabled' : null,
    this.stretchTabs() && this.orientation() === IdsOrientation.HORIZONTAL ? 'stretch-tabs' : null,
    this.tabPosition() && !this.stretchTabs() ? this.tabPosition() : null,
    `indicator-${this.indicatorPosition() ?? this._calculatedIndicatorPosition()}`,
  ]));

  private _calculatedIndicatorPosition = computed(() =>
    (this.orientation() === IdsOrientation.HORIZONTAL ? IdsTabIndicatorPosition.BOTTOM : IdsTabIndicatorPosition.LEFT),
  );

  public ngAfterContentInit(): void {
    const items = this._items();
    const orientation = this.orientation();
    const indicatorPosition = this.indicatorPosition();
    const minItemCount = 2;

    if (isDevMode() && (items.length < minItemCount)) {
      throw this._createHostError(`Invalid count of tab items. Minimum item count is ${minItemCount}.`);
    }

    if (isDevMode() && (orientation === IdsOrientation.HORIZONTAL &&
      (indicatorPosition && (indicatorPosition === IdsTabIndicatorPosition.LEFT || indicatorPosition === IdsTabIndicatorPosition.RIGHT)))) {
      throw this._createHostError(`Can not use ${indicatorPosition} indicator position with Horizontal mode`);
    }

    if (isDevMode() && (orientation === IdsOrientation.VERTICAL &&
      (indicatorPosition && (indicatorPosition === IdsTabIndicatorPosition.BOTTOM || indicatorPosition === IdsTabIndicatorPosition.TOP)))) {
      throw this._createHostError(`Can not use ${indicatorPosition} indicator position with Vertical mode`);
    }

    this.selectTab(0);
  }

  public selectTab(index: number): void {
    this._selectedTabIndex.set(index);
    const selectedItem = this._items().at(index);
    const selectedPortal = new TemplatePortal(selectedItem!.content(), this._viewContainerRef);

    if (this._portalOutlet().hasAttached()) {
      this._portalOutlet().detach();
    }

    this._portalOutlet().attach(selectedPortal);
  }
}
