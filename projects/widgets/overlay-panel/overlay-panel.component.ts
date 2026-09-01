import {
  IdsNestedBlockScrollStrategy,
  markScrollLockTarget,
  unmarkScrollLockTarget,
} from './nested-block-scroll-strategy';
import {
  IDS_OVERLAY_PANEL_DEFAULT_CONFIG,
  IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY,
  IdsOverlayPanelDefaultConfig,
} from './overlay-panel-defaults';
import { IdsOverlayPanelAppearanceType } from './types/overlay-panel-appearance.type';
import { IdsOverlayPanelVariantType } from './types/overlay-panel-variant.type';

import { A11yModule, CdkTrapFocus } from '@angular/cdk/a11y';
import { CdkMenu } from '@angular/cdk/menu';
import {
  CdkConnectedOverlay,
  CdkOverlayOrigin,
  ConnectedPosition,
  Overlay,
  OverlayModule,
} from '@angular/cdk/overlay';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  computed,
  Component,
  contentChild,
  DestroyRef,
  effect,
  ElementRef,
  inject,
  input,
  model,
  output,
  untracked,
  viewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ComponentBaseWithDefaults, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-overlay-panel',
  imports: [
    OverlayModule,
    A11yModule,
    NgClass,
  ],
  templateUrl: './overlay-panel.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class IdsOverlayPanelComponent extends ComponentBaseWithDefaults<IdsOverlayPanelDefaultConfig> {
  protected override get _hostName(): string {
    return 'overlay-panel';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_OVERLAY_PANEL_DEFAULT_CONFIG);

  private readonly _overlay = inject(Overlay);
  private readonly _overlayPanelDestroyRef = inject(DestroyRef);

  public open = model<boolean>(false);
  public origin = input.required<CdkOverlayOrigin | ElementRef>();
  public positions = input<ConnectedPosition[]>(this._defaultConfig.positions);

  public appearance = input<IdsOverlayPanelAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsOverlayPanelVariantType>(this._defaultConfig.variant);
  public panelClasses = input<string>('');
  public width = input<string | number>();
  public attached = output<void>();
  public readonly overlayDir = viewChild(CdkConnectedOverlay);

  protected readonly _scrollStrategy = new IdsNestedBlockScrollStrategy(this._overlay.scrollStrategies.block());

  protected _hasCdkMenu = computed(() => !!this._cdkMenu());
  private _cdkMenu = contentChild(CdkMenu, { descendants: true });
  private _focusTrap = viewChild(CdkTrapFocus);
  private _markedScrollAncestors: HTMLElement[] = [];

  constructor() {
    super();

    this._overlayPanelDestroyRef.onDestroy(() => this._unmarkOriginScrollAncestors());

    effect(() => {
      if (this._focusTrap()) {
        this._focusTrap()?.focusTrap.focusInitialElementWhenReady({ preventScroll: true });
      }
    });

    effect(() => {
      const overlayRef = this.overlayDir()?.overlayRef;
      const overlayWidth = this.width();

      untracked(() => overlayRef?.updateSize({ width: overlayWidth }));
    });
  }

  public toggle(): void {
    if (this.open()) {
      this._close();

      return;
    }

    this._markOriginScrollAncestors();
    this.open.set(true);
  }

  protected _close(): void {
    if (this.open()) {
      this.open.set(false);
    }

    this._unmarkOriginScrollAncestors();
  }

  protected _overlayAttached(): void {
    this._markOriginScrollAncestors();
    this._scrollStrategy.refresh();
    this.attached.emit();
  }

  private _markOriginScrollAncestors(): void {
    this._unmarkOriginScrollAncestors();

    const scrollableAncestors = this._getScrollableAncestors(this._getOriginElement());

    scrollableAncestors.forEach((element) => markScrollLockTarget(element));
    this._markedScrollAncestors = scrollableAncestors;
    this._scrollStrategy.setScrollLockTargets(scrollableAncestors);
  }

  private _unmarkOriginScrollAncestors(): void {
    this._markedScrollAncestors.forEach((element) => unmarkScrollLockTarget(element));
    this._markedScrollAncestors = [];
    this._scrollStrategy.setScrollLockTargets([]);
  }

  private _getOriginElement(): HTMLElement {
    const origin = this.origin();

    return (origin instanceof CdkOverlayOrigin ? origin.elementRef : origin).nativeElement;
  }

  private _getScrollableAncestors(originElement: HTMLElement): HTMLElement[] {
    const scrollableAncestors: HTMLElement[] = [];
    const body = originElement.ownerDocument.body;
    let currentElement = originElement.parentElement;

    while (currentElement && currentElement !== body) {
      if (this._isScrollable(currentElement)) {
        scrollableAncestors.push(currentElement);
      }

      currentElement = currentElement.parentElement;
    }

    return scrollableAncestors;
  }

  private _isScrollable(element: HTMLElement): boolean {
    const style = getComputedStyle(element);
    const scrollableOverflowValues = [
      'auto',
      'scroll',
      'overlay',
    ];
    const overflowXIsScrollable =
      scrollableOverflowValues.includes(style.overflowX) && element.scrollWidth > element.clientWidth;
    const overflowYIsScrollable =
      scrollableOverflowValues.includes(style.overflowY) && element.scrollHeight > element.clientHeight;

    return overflowXIsScrollable || overflowYIsScrollable;
  }

  protected _panelClasses = computed(() => this._getHostClasses([
    this.appearance(),
    this.size(),
    this.variant(),
    this._hasCdkMenu() ? 'has-menu' : null,
  ]),
  );

  protected _hostClasses = computed(() => '');
}
