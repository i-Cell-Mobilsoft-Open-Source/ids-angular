import { IDS_TAB_GROUP_DEFAULT_CONFIG, IDS_TAB_GROUP_DEFAULT_CONFIG_FACTORY, IdsTabGroupDefaultConfig } from './tab-group-defaults';
import { IdsTabComponent } from './tab.component';
import { IdsTabActivationMode, IdsTabActivationModeType } from './types/tab-activation-mode.type';
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
  public activationMode = input<IdsTabActivationModeType>(this._defaultConfig.activationMode);

  protected _selectedTabIndex = signal<number>(0);
  public selectedTabIndex = this._selectedTabIndex.asReadonly();
  protected _focusedTabIndex = signal<number>(0);

  protected _hostClasses = computed(() => this._getHostClasses([
    this.size(),
    this.variant(),
    this.orientation(),
    this.disabled() ? 'disabled' : null,
    this.stretchTabs() && this.orientation() === IdsOrientation.HORIZONTAL ? 'stretch-tabs' : null,
    this.tabPosition() && !this.stretchTabs() ? this.tabPosition() : null,
    `indicator-${this.indicatorPosition() ?? this._calculatedIndicatorPosition()}`,
    this.activationMode(),
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
    this._focusedTabIndex.set(index);
    const selectedItem = this._items().at(index);
    const selectedPortal = new TemplatePortal(selectedItem!.content(), this._viewContainerRef);

    if (this._portalOutlet().hasAttached()) {
      this._portalOutlet().detach();
    }

    this._portalOutlet().attach(selectedPortal);
  }

  public focusTab(index: number): void {
    if (this.activationMode() === 'automatic') {
      this.selectTab(index);
    }
  }

  protected _onTabListKeydown(event: KeyboardEvent): void {
    if (this.disabled()) {
      return;
    }
    const key = event.key;
    const horizontal = this.orientation() === IdsOrientation.HORIZONTAL;

    if ((key === 'Enter' || key === ' ') && this.activationMode() === IdsTabActivationMode.MANUAL) {
      event.preventDefault();
      this.selectTab(this._focusedTabIndex());
      return;
    }

    let move: 'prev' | 'next' | 'first' | 'last' | null = null;
    if (key === 'Home') {
      move = 'first';
    } else if (key === 'End') {
      move = 'last';
    } else if (horizontal && key === 'ArrowLeft') {
      move = 'prev';
    } else if (horizontal && key === 'ArrowRight') {
      move = 'next';
    } else if (!horizontal && key === 'ArrowUp') {
      move = 'prev';
    } else if (!horizontal && key === 'ArrowDown') {
      move = 'next';
    }

    if (!move) {
      return;
    }

    event.preventDefault();

    const items = this._items();
    const len = items.length;
    if (len === 0) {
      return;
    }

    const current = this._focusedTabIndex();
    let nextIndex = current;

    if (move === 'first') {
      const first = items.findIndex((tab) => !tab.parentOrSelfDisabled());
      if (first < 0) {
        return;
      }
      nextIndex = first;
    } else if (move === 'last') {
      let last = -1;
      for (let i = len - 1; i >= 0; i--) {
        if (!items[i].parentOrSelfDisabled()) {
          last = i;
          break;
        }
      }
      if (last < 0) {
        return;
      }
      nextIndex = last;
    } else {
      const delta = move === 'next' ? 1 : -1;
      nextIndex = this._nextEnabledTabIndex(current, delta);
    }

    if (this.activationMode() === IdsTabActivationMode.AUTOMATIC) {
      this.selectTab(nextIndex);
    } else {
      this._focusedTabIndex.set(nextIndex);
    }
    this._focusTabElement(nextIndex);
  }

  private _nextEnabledTabIndex(from: number, delta: number): number {
    const items = this._items();
    const len = items.length;
    if (len === 0) {
      return from;
    }
    let i = from;
    for (let step = 0; step < len; step++) {
      i = (i + delta + len) % len;
      if (!items[i].parentOrSelfDisabled()) {
        return i;
      }
    }
    return from;
  }

  private _focusTabElement(index: number): void {
    const id = this._items().at(index)?.id();
    if (!id) {
      return;
    }
    queueMicrotask(() => document.getElementById(id)?.focus());
  }
}
