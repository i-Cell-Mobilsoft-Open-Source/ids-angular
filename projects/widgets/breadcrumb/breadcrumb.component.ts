import { IDS_BREADCRUMB_DEFAULT_CONFIG, IDS_BREADCRUMB_DEFAULT_CONFIG_FACTORY, IdsBreadcrumbDefaultConfig } from './breadcrumb-defaults';
import { IdsBreadcrumbDividerComponent } from './libs/breadcrumb-divider.component';
import { IdsBreadcrumbLinkDirective } from './libs/breadcrumb-link.directive';
import { IdsBreadcrumbListDirective } from './libs/breadcrumb-list.directive';
import { IdsBreadcrumbPageDirective } from './libs/breadcrumb-page.directive';
import { IdsBreadcrumbTruncationComponent } from './libs/breadcrumb-truncation.component';
import { areWidthsStale, calcTruncationIndex } from './libs/breadcrumb-truncation.util';
import { IdsBreadcrumbDividerType } from './types/breadcrumb-divider.type';
import { IdsBreadcrumbHierarchyType } from './types/breadcrumb-hierarchy.type';
import { IdsBreadcrumbVariantType } from './types/breadcrumb-variant.type';
import { IdsBreadcrumbWidthsType } from './types/breadcrumb-widths.type';

import { NgTemplateOutlet } from '@angular/common';
import { afterRenderEffect, Component, computed, effect, ElementRef, inject, input, linkedSignal, signal, untracked, viewChild } from '@angular/core';
import { ComponentBaseWithDefaults, createClassList, IdsSizeType, ResizeObserverService } from '@i-cell/ids-angular/core';
import { IdsOverlayPanelAppearanceType, IdsOverlayPanelVariantType } from '@i-cell/ids-angular/overlay-panel';
import { IdsTooltipDirective } from '@i-cell/ids-angular/tooltip';

const defaultConfig = IDS_BREADCRUMB_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-breadcrumb',
  standalone: true,
  templateUrl: './breadcrumb.component.html',
  imports: [
    IdsBreadcrumbDividerComponent,
    IdsBreadcrumbLinkDirective,
    IdsBreadcrumbPageDirective,
    IdsBreadcrumbListDirective,
    IdsBreadcrumbTruncationComponent,
    IdsTooltipDirective,
    NgTemplateOutlet,
  ],
})
export class IdsBreadcrumbComponent extends ComponentBaseWithDefaults<IdsBreadcrumbDefaultConfig> {
  protected override get _hostName(): string {
    return 'breadcrumb';
  }

  // Must be declared before the inputs that use it
  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_BREADCRUMB_DEFAULT_CONFIG);

  public hierarchy = input<IdsBreadcrumbHierarchyType[]>([]);
  public dividerType = input<IdsBreadcrumbDividerType>(this._defaultConfig.dividerType);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsBreadcrumbVariantType>(this._defaultConfig.variant);
  public overlayAppearance = input<IdsOverlayPanelAppearanceType>(this._defaultConfig.overlayAppearance);
  public overlaySize = input<IdsSizeType>(this._defaultConfig.overlaySize);
  public overlayVariant = input<IdsOverlayPanelVariantType>(this._defaultConfig.overlayVariant);

  // While measuring, every item is rendered so that its natural width can be read
  protected _measuring = signal(true);

  // Items whose label is clipped and therefore needs a tooltip; entries of removed items are dropped
  protected _clippedItems = linkedSignal<IdsBreadcrumbHierarchyType[], ReadonlySet<IdsBreadcrumbHierarchyType>>({
    source: this.hierarchy,
    computation: (hierarchy, previous) => new Set([...(previous?.value ?? [])].filter((item) => hierarchy.includes(item))),
  });

  // The breadcrumbs that are currently visible in the breadcrumb component
  protected _breadcrumbs = computed<IdsBreadcrumbHierarchyType[]>(() =>
    this.hierarchy().slice(this._effectiveTruncationIndex()),
  );

  // The breadcrumbs that are currently truncated and shown on overlay
  protected _truncation = computed<IdsBreadcrumbHierarchyType[]>(() =>
    this.hierarchy().slice(0, this._effectiveTruncationIndex()),
  );

  protected _hostClasses = computed(() => this._getHostClasses([
    this.size(),
    this.variant(),
    this.dividerType(),
  ]));

  protected _overlayClasses = computed(() =>
    createClassList('ids-overlay-panel', [
      this.overlayAppearance(),
      this.overlayVariant(),
      this.overlaySize(),
    ]),
  );

  private _truncationIndex = signal(0);
  private _effectiveTruncationIndex = computed(() => (this._measuring() ? 0 : this._truncationIndex()));

  // Item widths depend only on these, so a new hierarchy array with the same labels does not need a new measurement
  private _measurementKey = computed(() => [
    this.hierarchy().map((item) => item.label).join('\u0000'),
    this.size(),
    this.dividerType(),
    this.variant(),
  ].join('|'));

  private _widths: IdsBreadcrumbWidthsType | null = null;
  private _resizeObserver = inject(ResizeObserverService);
  private _container = viewChild.required<ElementRef<HTMLElement>>('container');
  private _list = viewChild.required<ElementRef<HTMLOListElement>>('list');

  constructor() {
    super();
    effect(() => {
      this._measurementKey();
      untracked(() => this._measuring.set(true));
    });

    // Re-runs only when the measuring phase or the truncation changes, which also changes the rendered elements
    afterRenderEffect({
      read: (onCleanup) => {
        const measuring = this._measuring();
        this._truncationIndex();
        untracked(() => (measuring ? this._measure() : this._observe(onCleanup)));
      },
    });
  }

  protected _setClipped(item: IdsBreadcrumbHierarchyType, clipped: boolean): void {
    this._clippedItems.update((items) => {
      const next = new Set(items);
      clipped ? next.add(item) : next.delete(item);
      return next;
    });
  }

  private _measure(): void {
    this._captureWidths(this._list().nativeElement);
    this._layout();
    this._measuring.set(false);
  }

  // Resizing the container only re-layouts, while a resized item (e.g. font or theme change) triggers a new measurement
  private _observe(onCleanup: (cleanupFn: () => void) => void): void {
    const targets = [
      this._container().nativeElement,
      ...Array.from(this._list().nativeElement.children),
    ];
    const subscriptions = targets.map((target) => this._resizeObserver.observe(target).subscribe(() => this._handleResize()));
    onCleanup(() => {
      subscriptions.forEach((subscription) => subscription.unsubscribe());
      targets.forEach((target) => this._resizeObserver.unobserve(target));
    });
  }

  private _captureWidths(list: HTMLOListElement): void {
    const [
      trigger,
      divider,
      ...content
    ] = Array.from(list.children, (child) => child.getBoundingClientRect().width);
    this._widths = {
      gap: parseFloat(getComputedStyle(list).columnGap) || 0,
      trigger,
      divider,
      content,
    };
  }

  private _handleResize(): void {
    if (this._measuring()) {
      return;
    }
    const widths = this._widths;
    const renderedWidths = Array.from(this._list().nativeElement.children, (child) => child.getBoundingClientRect().width);
    if (!widths || areWidthsStale(widths, renderedWidths, this._truncationIndex())) {
      this._measuring.set(true);
    } else {
      this._layout();
    }
  }

  private _layout(): void {
    const widths = this._widths;
    const itemCount = this.hierarchy().length;
    if (!widths || itemCount < 2) {
      this._truncationIndex.set(0);
      return;
    }

    const style = getComputedStyle(this._container().nativeElement);
    const availableWidth = parseFloat(style.width) - (style.boxSizing === 'border-box'
      ? parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
        + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth)
      : 0);
    if (!Number.isFinite(availableWidth) || availableWidth <= 0) {
      return;
    }

    this._truncationIndex.set(calcTruncationIndex(widths, itemCount, availableWidth));
  }
}
