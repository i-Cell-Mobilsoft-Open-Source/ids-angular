import { IDS_BREADCRUMB_DEFAULT_CONFIG, IDS_BREADCRUMB_DEFAULT_CONFIG_FACTORY, IdsBreadcrumbDefaultConfig } from './breadcrumb-defaults';
import { IdsBreadcrumbDividerComponent } from './libs/breadcrumb-divider.component';
import { IdsBreadcrumbLinkDirective } from './libs/breadcrumb-link.directive';
import { IdsBreadcrumbListDirective } from './libs/breadcrumb-list.directive';
import { IdsBreadcrumbPageDirective } from './libs/breadcrumb-page.directive';
import { IdsBreadcrumbTruncationComponent } from './libs/breadcrumb-truncation.component';
import { IdsBreadcrumbDivider, IdsBreadcrumbDividerType } from './types/breadcrumb-divider.type';
import { IdsBreadcrumbHierarchyType } from './types/breadcrumb-hierarchy.type';
import { IdsBreadcrumbVariantType } from './types/breadcrumb-variant.type';

import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, ElementRef, inject, input, signal } from '@angular/core';
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

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_BREADCRUMB_DEFAULT_CONFIG);
  public hierarchy = input<IdsBreadcrumbHierarchyType[]>([]);
  public dividerType = input<IdsBreadcrumbDividerType>(this._defaultConfig.dividerType);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsBreadcrumbVariantType>(this._defaultConfig.variant);
  public overlayAppearance = input<IdsOverlayPanelAppearanceType>(this._defaultConfig.overlayAppearance);
  public overlaySize = input<IdsSizeType>(this._defaultConfig.overlaySize);
  public overlayVariant = input<IdsOverlayPanelVariantType>(this._defaultConfig.overlayVariant);

  // The breadcrumbs that are currently visible in the breadcrumb component
  protected _breadcrumbs = computed<(IdsBreadcrumbHierarchyType & { hasTooltip?: boolean })[]>(() =>
    this.hierarchy().slice(this._truncationIndex()),
  );

  // The breadcrumbs that are currently truncated and shown on overlay
  protected _truncation = computed<(IdsBreadcrumbHierarchyType & { hasTooltip?: boolean })[]>(() =>
    this.hierarchy().slice(0, this._truncationIndex()),
  );

  // The maximum number of breadcrumbs that can be shown (without truncation)
  private _maxLength = signal<number>(0);

  // The index at which the breadcrumb truncation starts
  private _truncationIndex = computed(() => {
    const hierarchyLength = this.hierarchy().length;
    const maxLength = this._maxLength();
    return hierarchyLength > maxLength ? Math.min(hierarchyLength - maxLength, hierarchyLength - 1) : 0;
  });

  private _hostElement = inject(ElementRef).nativeElement;
  private _resizeObserver = inject(ResizeObserverService);

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
    this._resizeObserver.observe(this._hostElement.parentElement).subscribe(() => this._calcmaxLength());
  }

  private _calcmaxLength(): void {
    const containerElementWidth = this._hostElement.parentElement.clientWidth;
    const breadcrumbElementMaxWidth = this._getCssVariableValue(`--ids-comp-breadcrumb-navigation-link-size-max-width-${this.size()}`);
    const dividerWidth =
      this.dividerType() === IdsBreadcrumbDivider.ICON
        ? this._getCssVariableValue(`--ids-comp-icon-size-smallcollection-width-${this.size()}`)
        : { dense: 4, compact: 5, comfortable: 6, spacious: 7 }[this.size()];
    const gapWidth = this._getCssVariableValue(`--ids-comp-breadcrumb-size-gap-${this.size()}`);
    const breadcrumbItemMaxWidth = breadcrumbElementMaxWidth + (gapWidth * 2 + dividerWidth) / 2;
    this._maxLength.set(Math.floor(containerElementWidth / breadcrumbItemMaxWidth));
  }

  private _getCssVariableValue(variableName: string): number {
    const host = getComputedStyle(this._hostElement);
    return parseInt(host.getPropertyValue(variableName).replace('px', ''), 10);
  }
}
