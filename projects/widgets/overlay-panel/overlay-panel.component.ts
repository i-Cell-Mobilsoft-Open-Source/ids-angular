import {
  IDS_OVERLAY_PANEL_DEFAULT_CONFIG,
  IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY,
  IdsOverlayPanelDefaultConfig,
} from './overlay-panel-defaults';
import { IdsOverlayPanelAppearanceType } from './types/overlay-panel-appearance.type';
import { IdsOverlayPanelVariantType } from './types/overlay-panel-variant.type';

import { A11yModule, CdkTrapFocus } from '@angular/cdk/a11y';
import { CdkMenu } from '@angular/cdk/menu';
import { OverlayModule, CdkOverlayOrigin, CdkConnectedOverlay, ConnectedPosition, Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input, computed, contentChild,
  ElementRef,
  viewChild,
  untracked,
  effect,
  model,
  inject,
  signal,
} from '@angular/core';
import { IdsSizeType, ComponentBaseWithDefaults } from '@i-cell/ids-angular/core';

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
  private readonly _scrollDispatcher = inject(ScrollDispatcher);

  public open = model<boolean>(false);
  public origin = input.required<CdkOverlayOrigin | ElementRef>();
  public positions = input<ConnectedPosition[]>(this._defaultConfig.positions);

  public appearance = input<IdsOverlayPanelAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsOverlayPanelVariantType>(this._defaultConfig.variant);
  public panelClasses = input<string>('');
  public width = input<string | number>();
  public readonly overlayDir = viewChild(CdkConnectedOverlay);

  protected readonly _scrollStrategy: ScrollStrategy = this._overlay.scrollStrategies.block();

  protected _hasCdkMenu = computed(() => !!this._cdkMenu());
  private _cdkMenu = contentChild(CdkMenu, { descendants: true });
  private _focusTrap = viewChild(CdkTrapFocus);
  protected _originHidden = signal(false);

  constructor() {
    super();

    effect(() => {
      if (this._focusTrap()) {
        this._focusTrap()?.focusTrap.focusInitialElementWhenReady({ preventScroll: true });
      }
    });

    effect(() => {
      const overlayDir = this.overlayDir();
      const overlayWidth = this.width();

      // apply width after the overlay has been rendered
      untracked(() => {
        if (overlayDir && overlayWidth) {
          overlayDir.width = overlayWidth;
        }
      });
    });

    effect((onCleanup) => {
      if (!this.open()) {
        this._originHidden.set(false);
        return;
      }

      const originElementRef = this._getOriginElementRef();
      this._originHidden.set(!this._isOriginVisible(originElementRef));
      const ancestorScrollSubscription = this._scrollDispatcher.ancestorScrolled(originElementRef, 0).subscribe(() => {
        this._handleOriginScroll(originElementRef);
      });

      onCleanup(() => ancestorScrollSubscription.unsubscribe());
    });
  }

  public toggle(): void {
    this.open.update((open) => !open);
  }

  protected _close(): void {
    if (this.open()) {
      this.open.set(false);
    }
  }

  private _getOriginElementRef(): ElementRef<HTMLElement> {
    const origin = this.origin();

    return origin instanceof CdkOverlayOrigin ? origin.elementRef : origin;
  }

  private _handleOriginScroll(originElementRef: ElementRef<HTMLElement>): void {
    this._originHidden.set(!this._isOriginVisible(originElementRef));
    this.overlayDir()?.overlayRef?.updatePosition();
  }

  private _isOriginVisible(originElementRef: ElementRef<HTMLElement>): boolean {
    const originRect = originElementRef.nativeElement.getBoundingClientRect();

    if (originRect.bottom <= 0 || originRect.top >= window.innerHeight || originRect.right <= 0 || originRect.left >= window.innerWidth) {
      return false;
    }

    const scrollableAncestors = this._scrollDispatcher.getAncestorScrollContainers(originElementRef);

    const isInsideScrollableAncestors = scrollableAncestors.every((scrollable) => {
      const containerRect = scrollable.getElementRef().nativeElement.getBoundingClientRect();

      return (
        originRect.bottom > containerRect.top &&
        originRect.top < containerRect.bottom &&
        originRect.right > containerRect.left &&
        originRect.left < containerRect.right
      );
    });

    return isInsideScrollableAncestors && !this._isOriginCovered(originElementRef, originRect);
  }

  private _isOriginCovered(originElementRef: ElementRef<HTMLElement>, originRect: DOMRect): boolean {
    const originElement = originElementRef.nativeElement;
    const originCenterX = originRect.left + originRect.width / 2;
    const originCenterY = originRect.top + originRect.height / 2;
    const elementAtOriginCenter = originElement.ownerDocument.elementFromPoint(originCenterX, originCenterY);
    const overlayElement = this.overlayDir()?.overlayRef?.overlayElement;

    return !!elementAtOriginCenter && !originElement.contains(elementAtOriginCenter) && !overlayElement?.contains(elementAtOriginCenter);
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
