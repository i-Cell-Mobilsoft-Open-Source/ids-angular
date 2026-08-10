import { IDS_TAB_GROUP_DEFAULT_CONFIG, IDS_TAB_GROUP_DEFAULT_CONFIG_FACTORY, IdsTabGroupDefaultConfig } from './tab-group-defaults';
import { IdsTabComponent } from './tab.component';
import { IdsTabActivationMode, IdsTabActivationModeType } from './types/tab-activation-mode.type';
import { IdsTabGroupAlignmentType } from './types/tab-group-alignment.type';
import { IdsTabGroupPositionType } from './types/tab-group-position.type';
import { IdsTabGroupVariantType } from './types/tab-group-variant.type';
import { IdsTabIndicatorPosition, IdsTabIndicatorPositionType } from './types/tab-indicator-position.type';

import { CdkPortalOutlet, PortalModule, TemplatePortal } from '@angular/cdk/portal';
import { NgTemplateOutlet } from '@angular/common';
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, Component, computed, contentChildren, effect, ElementRef, inject, input, isDevMode, OnDestroy, output, signal, untracked, viewChild, viewChildren, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { coerceBooleanAttribute, ComponentBaseWithDefaults, IdsOrientation, IdsOrientationType, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

const defaultConfig = IDS_TAB_GROUP_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-tab-group',
  imports: [
    NgTemplateOutlet,
    PortalModule,
    IdsIconComponent,
    IdsIconButtonComponent,
  ],
  templateUrl: './tab-group.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsTabGroupComponent
  extends ComponentBaseWithDefaults<IdsTabGroupDefaultConfig>
  implements AfterContentInit, AfterViewInit, OnDestroy {
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
  public tabAlignment = input<IdsTabGroupAlignmentType>(this._defaultConfig.tabAlignment);
  public tabPosition = input<IdsTabGroupPositionType>(this._defaultConfig.tabPosition);
  public indicatorPosition = input<IdsTabIndicatorPositionType>();
  public disabled = input(false, { transform: coerceBooleanAttribute });
  public activationMode = input<IdsTabActivationModeType>(this._defaultConfig.activationMode);
  /**
   * Optionally set the tabindex for the tab-group after initialization.
   */
  public setTabIndex = input<number>();
  /**
   * Emits the index of the selected tab whenever the selected tab changes.
   */
  public selectedTabChange = output<number>();

  protected _selectedTabIndex = signal<number>(0);
  public selectedTabIndex = this._selectedTabIndex.asReadonly();
  protected _focusedTabIndex = signal<number>(0);

  protected _hostClasses = computed(() => this._getHostClasses([
    this.size(),
    this.variant(),
    this.orientation(),
    this.disabled() ? 'disabled' : null,
    this.stretchTabs() && this.orientation() === IdsOrientation.HORIZONTAL ? 'stretch-tabs' : null,
    this.tabAlignment() && !this.stretchTabs() ? this.tabAlignment() : null,
    `indicator-${this.indicatorPosition() ?? this._calculatedIndicatorPosition()}`,
    this._verticalTabPosition(),
    this.activationMode(),
  ]));

  private _calculatedIndicatorPosition = computed(() =>
    (this.orientation() === IdsOrientation.HORIZONTAL ? IdsTabIndicatorPosition.BOTTOM : IdsTabIndicatorPosition.LEFT),
  );

  private readonly _scrollViewport =
    viewChild.required<ElementRef<HTMLElement>>('tabScrollViewport');

  private readonly _tabList =
    viewChild.required<ElementRef<HTMLUListElement>>('tabList');

  private readonly _tabElements =
    viewChildren<ElementRef<HTMLElement>>('tabElement');

  protected readonly _hasOverflow = signal(false);
  protected readonly _canScrollPrevious = signal(false);
  protected readonly _canScrollNext = signal(false);

  private _resizeObserver?: ResizeObserver;

  private readonly _scrollBoundaryTolerance = 1;

  constructor() {
    super();

    effect(() => {
      const selectedTabIndex = this._selectedTabIndex();

      untracked(() => {
        this.selectedTabChange.emit(selectedTabIndex);
      });
    });
  }

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

    const setTabIndex = this.setTabIndex();
    if (setTabIndex !== null && setTabIndex !== undefined) {
      this.selectTab(setTabIndex);
      return;
    }

    this.selectTab(0);
  }

  public ngAfterViewInit(): void {
    const viewport = this._scrollViewport().nativeElement;
    const tabList = this._tabList().nativeElement;

    this._resizeObserver = new ResizeObserver(() => {
      this._updateScrollState();
    });

    this._resizeObserver.observe(viewport);
    this._resizeObserver.observe(tabList);

    queueMicrotask(() => {
      this._updateScrollState();
      this._scrollTabIntoView(this._selectedTabIndex(), false);
    });
  }

  public ngOnDestroy(): void {
    this._resizeObserver?.disconnect();
  }

  public selectTab(index: number): void {
    const selectedItem = this._items().at(index);
    if (!selectedItem || selectedItem.parentOrSelfDisabled()) {
      return;
    }
    this._selectedTabIndex.set(index);
    this._focusedTabIndex.set(index);
    const selectedPortal = new TemplatePortal(
      selectedItem.content(),
      this._viewContainerRef,
    );
    const portalOutlet = this._portalOutlet();
    if (portalOutlet.hasAttached()) {
      portalOutlet.detach();
    }
    portalOutlet.attach(selectedPortal);
    queueMicrotask(() => {
      this._scrollTabIntoView(index);
      this._updateScrollState();
    });
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
    let nextIndex: number;

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

  private _verticalTabPosition = computed(() => {
    if (this.orientation() !== IdsOrientation.VERTICAL) {
      return null;
    }

    return this.tabPosition();
  });

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
    queueMicrotask(() => {
      const tab = document.getElementById(id);
      tab?.focus();
      tab?.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    });
  }

  protected _scrollTabs(direction: -1 | 1): void {
    if (this.disabled()) {
      return;
    }
    const viewport = this._scrollViewport().nativeElement;
    const horizontal = this.orientation() === IdsOrientation.HORIZONTAL;

    const viewportSize = horizontal
      ? viewport.clientWidth
      : viewport.clientHeight;

    const scrollFactor = 0.8;
    const distance = Math.max(viewportSize * scrollFactor, 1);

    this._tabList().nativeElement.scrollBy({
      left: horizontal ? distance * direction : 0,
      top: horizontal ? 0 : distance * direction,
      behavior: 'smooth',
    });
  }

  protected _updateScrollState(): void {
    const viewport = this._tabList().nativeElement;
    const horizontal = this.orientation() === IdsOrientation.HORIZONTAL;
    const tolerance = this._scrollBoundaryTolerance;

    if (horizontal) {
      const maxScroll = Math.max(
        viewport.scrollWidth - viewport.clientWidth,
        0,
      );

      this._hasOverflow.set(maxScroll > tolerance);
      this._canScrollPrevious.set(viewport.scrollLeft > tolerance);
      this._canScrollNext.set(
        viewport.scrollLeft < maxScroll - tolerance,
      );

      return;
    }

    const maxScroll = Math.max(
      viewport.scrollHeight - viewport.clientHeight,
      0,
    );

    this._hasOverflow.set(maxScroll > tolerance);
    this._canScrollPrevious.set(viewport.scrollTop > tolerance);
    this._canScrollNext.set(
      viewport.scrollTop < maxScroll - tolerance,
    );
  }

  private _scrollTabIntoView(
    index: number,
    smooth = true,
  ): void {
    const viewport = this._scrollViewport().nativeElement;
    const tab = this._tabElements().at(index)?.nativeElement;

    if (!tab) {
      return;
    }

    const horizontal = this.orientation() === IdsOrientation.HORIZONTAL;

    if (horizontal) {
      const viewportStart = viewport.scrollLeft;
      const viewportEnd = viewportStart + viewport.clientWidth;

      const tabStart = tab.offsetLeft;
      const tabEnd = tabStart + tab.offsetWidth;

      if (tabStart < viewportStart) {
        viewport.scrollTo({
          left: tabStart,
          behavior: smooth ? 'smooth' : 'auto',
        });
      } else if (tabEnd > viewportEnd) {
        viewport.scrollTo({
          left: tabEnd - viewport.clientWidth,
          behavior: smooth ? 'smooth' : 'auto',
        });
      }

      return;
    }

    const viewportStart = viewport.scrollTop;
    const viewportEnd = viewportStart + viewport.clientHeight;

    const tabStart = tab.offsetTop;
    const tabEnd = tabStart + tab.offsetHeight;

    if (tabStart < viewportStart) {
      viewport.scrollTo({
        top: tabStart,
        behavior: smooth ? 'smooth' : 'auto',
      });
    } else if (tabEnd > viewportEnd) {
      viewport.scrollTo({
        top: tabEnd - viewport.clientHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }
  }
}
