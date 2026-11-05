import { IDS_BREADCRUMB_DEFAULT_CONFIG, IDS_BREADCRUMB_DEFAULT_CONFIG_FACTORY, IdsBreadcrumbDefaultConfig } from './breadcrumb-defaults';
import { IdsBreadcrumbDividerComponent } from './libs/breadcrumb-divider.component';
import { IdsBreadcrumbLinkDirective } from './libs/breadcrumb-link.directive';
import { IdsBreadcrumbListDirective } from './libs/breadcrumb-list.directive';
import { IdsBreadcrumbPageDirective } from './libs/breadcrumb-page.directive';
import { IdsBreadcrumbTruncationComponent } from './libs/breadcrumb-truncation.component';
import { IdsBreadcrumbDividerType } from './types/breadcrumb-divider.type';
import { IdsBreadcrumbHierarchyType } from './types/breadcrumb-hierarchy.type';
import { IdsBreadcrumbVariantType } from './types/breadcrumb-variant.type';

import { NgTemplateOutlet } from '@angular/common';
import { afterRenderEffect, Component, computed, ElementRef, input, signal, viewChild } from '@angular/core';
import { ComponentBaseWithDefaults, createClassList, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
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
    IdsIconComponent,
  ],
})
export class IdsBreadcrumbComponent extends ComponentBaseWithDefaults<IdsBreadcrumbDefaultConfig> {
  protected override get _hostName(): string {
    return 'breadcrumb';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_BREADCRUMB_DEFAULT_CONFIG);
  public hierarchy = input<IdsBreadcrumbHierarchyType[]>([]);
  public dividerType = input<IdsBreadcrumbDividerType>(this._defaultConfig.dividerType);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsBreadcrumbVariantType>(this._defaultConfig.variant);
  public overlayAppearance = input<IdsOverlayPanelAppearanceType>(this._defaultConfig.overlayAppearance);
  public overlaySize = input<IdsSizeType>(this._defaultConfig.overlaySize);
  public overlayVariant = input<IdsOverlayPanelVariantType>(this._defaultConfig.overlayVariant);

  private _items = computed<(IdsBreadcrumbHierarchyType & { hasTooltip?: boolean })[]>(() =>
    this.hierarchy().map((item) => ({ ...item })),
  );

  // The breadcrumbs that are currently visible in the breadcrumb component
  protected _breadcrumbs = computed<(IdsBreadcrumbHierarchyType & { hasTooltip?: boolean })[]>(() =>
    this._items().slice(this._truncationIndex()),
  );

  // The breadcrumbs that are currently truncated and shown on overlay
  protected _truncation = computed<(IdsBreadcrumbHierarchyType & { hasTooltip?: boolean })[]>(() =>
    this._items().slice(0, this._truncationIndex()),
  );

  private _truncationIndex = signal(0);
  private _container = viewChild.required<ElementRef<HTMLElement>>('container');
  private _measurement = viewChild.required<ElementRef<HTMLOListElement>>('measurement');

  protected _measurementTriggerClasses = computed(() =>
    createClassList('ids-icon-button', [
      'standard',
      this.size(),
      this.variant(),
    ]),
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

  constructor() {
    super();
    afterRenderEffect({
      read: (onCleanup) => {
        this.hierarchy();
        this.size();
        this.dividerType();
        this.variant();
        const container = this._container().nativeElement;
        const measurement = this._measurement().nativeElement;
        const observer = new ResizeObserver(() => this._measure());
        observer.observe(container);
        observer.observe(measurement);
        Array.from(measurement.children).forEach((child) => observer.observe(child));
        onCleanup(() => observer.disconnect());
        this._measure();
      },
    });
  }

  private _measure(): void {
    const container = this._container().nativeElement;
    const measurement = this._measurement().nativeElement;
    const itemCount = this.hierarchy().length;
    if (itemCount < 2) {
      this._truncationIndex.set(0);
      return;
    }

    const style = getComputedStyle(container);
    const availableWidth = parseFloat(style.width) - (style.boxSizing === 'border-box'
      ? parseFloat(style.paddingLeft) + parseFloat(style.paddingRight)
        + parseFloat(style.borderLeftWidth) + parseFloat(style.borderRightWidth)
      : 0);
    if (!Number.isFinite(availableWidth) || availableWidth <= 0) {
      return;
    }

    const gap = parseFloat(getComputedStyle(measurement).columnGap) || 0;
    const widths = Array.from(measurement.children, (child) => child.getBoundingClientRect().width);
    const [
      triggerWidth,
      dividerWidth,
      ...contentWidths
    ] = widths;
    let contentWidth = contentWidths.reduce((total, width) => total + width, 0) + gap * (contentWidths.length - 1);
    if (contentWidth <= availableWidth) {
      this._truncationIndex.set(0);
      return;
    }

    const prefixWidth = triggerWidth + dividerWidth + gap * 2;
    for (let index = 0; index < itemCount - 1; index++) {
      contentWidth -= contentWidths[index * 2] + contentWidths[index * 2 + 1] + gap * 2;
      if (prefixWidth + contentWidth <= availableWidth || index === itemCount - 2) {
        this._truncationIndex.set(index + 1);
        return;
      }
    }
  }
}
