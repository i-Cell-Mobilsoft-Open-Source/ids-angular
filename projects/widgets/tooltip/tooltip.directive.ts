import { IDS_TOOLTIP_DEFAULT_CONFIG, IDS_TOOLTIP_DEFAULT_CONFIG_FACTORY, IdsTooltipDefaultConfig } from './tooltip-defaults';
import { setTooltipFlexibleConnectedPositionStrategy } from './tooltip-position-strategies';
import { IdsTooltipComponent } from './tooltip.component';
import { IdsTooltipPositionType } from './types/tooltip-position.type';
import { IdsTooltipVariantType } from './types/tooltip-variant.type';
import { IdsTooltipTextAlign, IdsTooltipTouchGestures } from './types/tooltip.type';
import { connectedPositionPairToTooltipPosition } from './utils/tooltip-converters';

import { FocusMonitor } from '@angular/cdk/a11y';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { ConnectionPositionPair, FlexibleConnectedPositionStrategy, Overlay, OverlayRef } from '@angular/cdk/overlay';
import { normalizePassiveListenerOptions, Platform } from '@angular/cdk/platform';
import { ComponentPortal } from '@angular/cdk/portal';
import { ScrollDispatcher } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ComponentRef, computed, Directive, effect, ElementRef, inject, input, NgZone, OnDestroy, signal, ViewContainerRef } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { coerceStringAttribute, DirectiveBaseWithDefaults, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_TOOLTIP_DEFAULT_CONFIG_FACTORY();
const passiveListenerOptions = normalizePassiveListenerOptions({ passive: true });

@Directive({
  selector: '[idsTooltip]',
  standalone: true,
})
export class IdsTooltipDirective extends DirectiveBaseWithDefaults<IdsTooltipDefaultConfig> implements AfterViewInit, OnDestroy {
  protected override get _hostName(): string {
    return 'tooltip-trigger';
  }

  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _platform = inject(Platform);
  private readonly _ngZone = inject(NgZone);
  private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _scrollDispatcher = inject(ScrollDispatcher);
  private readonly _overlay = inject(Overlay);
  private readonly _document = inject(DOCUMENT);
  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_TOOLTIP_DEFAULT_CONFIG);

  private readonly _passiveListeners: (readonly [string, EventListenerOrEventListenerObject])[] = [];

  private _overlayRef: OverlayRef | null = null;
  private _portal?: ComponentPortal<IdsTooltipComponent>;
  private _componentRef?: ComponentRef<IdsTooltipComponent> | null;
  private _tooltipInstance: IdsTooltipComponent | null = null;
  private _touchstartTimeout?: ReturnType<typeof setTimeout>;
  private _showTimeout?: ReturnType<typeof setTimeout>;
  private _pointerExitEventsInitialized = false;
  private _viewportMargin = this._defaultConfig.viewPortMargin;
  private _currentPosition = signal<IdsTooltipPositionType | null>(null);

  public message = input<string, string>('', { alias: 'idsTooltip', transform: coerceStringAttribute });
  public position = input<IdsTooltipPositionType>(this._defaultConfig.position, { alias: 'idsTooltipPosition' });
  public size = input<IdsSizeType>(this._defaultConfig.size, { alias: 'idsTooltipSize' });
  public variant = input<IdsTooltipVariantType>(this._defaultConfig.variant, { alias: 'idsTooltipVariant' });
  public showDelay = input<number>(this._defaultConfig.showDelay, { alias: 'idsTooltipShowDelay' });
  public hideDelay = input<number>(this._defaultConfig.hideDelay, { alias: 'idsTooltipHideDelay' });
  public disabled = input<boolean>(false, { alias: 'idsTooltipDisabled' });
  public touchGestures = input<IdsTooltipTouchGestures>('auto', { alias: 'idsTooltipTouchGestures' });
  public textAlign = input<IdsTooltipTextAlign>('auto', { alias: 'idsTooltipTextAlign' });
  public tooltipClass = input<string | undefined>(undefined, { alias: 'idsTooltipClass' });
  public showPointer = input<boolean>(this._defaultConfig.showPointer, { alias: 'idsTooltipShowPointer' });

  protected _hostClasses = computed(() => this._getHostClasses([]));

  private _tooltipClassEffect = effect(() => {
    this._setTooltipInputs(
      this.message(),
      this._currentPosition() ?? this.position(),
      this.size(),
      this.variant(),
      this.textAlign(),
      this.hideDelay(),
      this.tooltipClass(),
      this.showPointer(),
    );
  });

  public ngAfterViewInit(): void {
    this._setupPointerEnterEventsIfNeeded();

    this._focusMonitor
      .monitor(this._elementRef)
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((origin) => {
        if (!origin) {
          this._ngZone.run(() => this.hide(0));
        } else if (origin === 'keyboard') {
          this._ngZone.run(() => this.show());
        }
      });
  }

  public show(): void {
    if (this.disabled() || !this.message() || this._tooltipInstance) {
      this._tooltipInstance?.abortHide();
      return;
    }

    const overlayRef = this._createOverlay();
    this._portal =
        this._portal || new ComponentPortal(IdsTooltipComponent, this._viewContainerRef);
    this._componentRef = overlayRef.attach(this._portal);
    this._tooltipInstance = this._componentRef.instance;
    const instance = this._tooltipInstance;
    instance.triggerElement = this._elementRef.nativeElement;
    this._setTooltipInputs(
      this.message(),
      this._currentPosition() ?? this.position(),
      this.size(),
      this.variant(),
      this.textAlign(),
      this.hideDelay(),
      this.tooltipClass(),
      this.showPointer(),
    );
    instance
      .afterHidden()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => {
        this._detach();
      });
  }

  public hide(delay: number = this.hideDelay()): void {
    if (this._showTimeout) {
      clearTimeout(this._showTimeout);
      this._showTimeout = undefined;
      return;
    }

    const instance = this._tooltipInstance;
    if (instance?.isHideTimerTicking) {
      return;
    }

    if (instance) {
      instance.hide(delay);
    }
  }

  public toggle(): void {
    this._tooltipInstance ? this.hide() : this.show();
  }

  private _createOverlay(): OverlayRef {
    if (this._overlayRef) {
      this._detach();
    }

    const scrollableAncestors = this._scrollDispatcher.getAncestorScrollContainers(
      this._elementRef,
    );

    const strategy = this._overlay
      .position()
      .flexibleConnectedTo(this._elementRef)
      .withFlexibleDimensions(false)
      .withViewportMargin(this._viewportMargin)
      .withScrollableContainers(scrollableAncestors);

    strategy.positionChanges.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((change) => {
      this._updateCurrentPositionClass(change.connectionPair);

      if (change.scrollableViewProperties.isOverlayClipped && this._tooltipInstance) {
        this._ngZone.run(() => this.hide(0));
      }
    });

    this._overlayRef = this._overlay.create({
      positionStrategy: strategy,
      panelClass: 'ids-tooltip-panel',
      scrollStrategy: this._overlay.scrollStrategies.reposition({ scrollThrottle: this._defaultConfig.scrollDebounceTime }),
    });

    this._updatePosition(this._overlayRef);

    this._overlayRef
      .detachments()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this._detach());

    this._overlayRef
      .outsidePointerEvents()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe(() => this._tooltipInstance?.hide(0));

    this._overlayRef
      .keydownEvents()
      .pipe(takeUntilDestroyed(this._destroyRef))
      .subscribe((event) => {
        if (this._tooltipInstance && event.key === 'Escape' && !hasModifierKey(event)) {
          event.preventDefault();
          event.stopPropagation();
          this._ngZone.run(() => this.hide(0));
        }
      });

    return this._overlayRef;
  }

  private _detach(): void {
    if (this._overlayRef && this._overlayRef.hasAttached()) {
      this._overlayRef.detach();
    }
    this._componentRef?.destroy();
    this._tooltipInstance = null;
  }

  private _updatePosition(overlayRef: OverlayRef): void {
    const position = overlayRef.getConfig().positionStrategy as FlexibleConnectedPositionStrategy;
    setTooltipFlexibleConnectedPositionStrategy(position, this.position());
  }

  private _updateCurrentPositionClass(connectionPair: ConnectionPositionPair): void {
    const newPosition: IdsTooltipPositionType = connectedPositionPairToTooltipPosition(connectionPair);

    if (newPosition !== this._currentPosition()) {
      const overlayRef = this._overlayRef;

      if (overlayRef) {
        const positionClassPrefix = 'is-tooltip-panel-position-';
        overlayRef.removePanelClass(positionClassPrefix + this._currentPosition());
        overlayRef.addPanelClass(positionClassPrefix + newPosition);
      }

      this._currentPosition.set(newPosition);
    }
  }

  private _setTooltipInputs(
    message: string,
    position: IdsTooltipPositionType,
    size: IdsSizeType,
    variant: IdsTooltipVariantType,
    textAlign: IdsTooltipTextAlign,
    hideDelay: number,
    tooltipClass: string | undefined,
    showPointer: boolean,
  ): void {
    if (this._tooltipInstance) {
      this._componentRef?.setInput('message', message);
      this._componentRef?.setInput('position', position);
      this._componentRef?.setInput('size', size);
      this._componentRef?.setInput('variant', variant);
      this._componentRef?.setInput('textAlign', textAlign);
      this._componentRef?.setInput('mouseLeaveHideDelay', hideDelay);
      this._componentRef?.setInput('tooltipClass', tooltipClass);
      this._componentRef?.setInput('showPointer', showPointer);
    }
  }

  private _setupPointerEnterEventsIfNeeded(): void {
    if (
      this.disabled() || !this.message() || this._passiveListeners.length
    ) {
      return;
    }

    if (this._platformSupportsMouseEvents()) {
      this._passiveListeners.push([
        'mouseenter',
        (): void => {
          this._setupPointerExitEventsIfNeeded();
          this._showTimeout = setTimeout(() => {
            this._showTimeout = undefined;
            this.show();
          }, this.showDelay());
        },
      ]);
    } else if (this.touchGestures() !== 'off') {
      this._disableNativeGesturesIfNecessary();

      this._passiveListeners.push([
        'touchstart',
        (): void => {
          this._setupPointerExitEventsIfNeeded();
          clearTimeout(this._touchstartTimeout);

          this._touchstartTimeout = setTimeout(
            () => this.show(),
            this._defaultConfig.touchLongPressShowDelay,
          );
        },
      ]);
    }

    this._addListeners(this._passiveListeners);
  }

  private _wheelListener(event: WheelEvent): void {
    if (this._tooltipInstance) {
      const elementUnderPointer = this._document.elementFromPoint(event.clientX, event.clientY);
      const element = this._elementRef.nativeElement;

      if (elementUnderPointer !== element && !element.contains(elementUnderPointer)) {
        this.hide();
      }
    }
  }

  private _setupPointerExitEventsIfNeeded(): void {
    if (this._pointerExitEventsInitialized) {
      return;
    }
    this._pointerExitEventsInitialized = true;

    const exitListeners: (readonly [string, EventListenerOrEventListenerObject])[] = [];
    if (this._platformSupportsMouseEvents()) {
      exitListeners.push(
        [
          'mouseleave',
          (): void => {
            this.hide();
          },
        ],
        [
          'wheel',
          (event): void => {
            this._wheelListener(event as WheelEvent);
          },
        ],
      );
    } else if (this.touchGestures() !== 'off') {
      this._disableNativeGesturesIfNecessary();
      const touchendListener = (): void => {
        clearTimeout(this._touchstartTimeout);
        this.hide(this._defaultConfig.touchendHideDelay);
      };

      exitListeners.push([
        'touchend',
        touchendListener,
      ], [
        'touchcancel',
        touchendListener,
      ]);
    }

    this._addListeners(exitListeners);
    this._passiveListeners.push(...exitListeners);
  }

  private _addListeners(listeners: (readonly [string, EventListenerOrEventListenerObject])[]): void {
    listeners.forEach(([
      event,
      listener,
    ]) => {
      this._elementRef.nativeElement.addEventListener(event, listener, passiveListenerOptions);
    });
  }

  private _disableNativeGesturesIfNecessary(): void {
    const gestures = this.touchGestures();

    if (gestures !== 'off') {
      const element = this._elementRef.nativeElement;
      const style = element.style;

      if (gestures === 'on' || (element.nodeName !== 'INPUT' && element.nodeName !== 'TEXTAREA')) {
        style.userSelect = 'none';
      }

      style.touchAction = 'none';
    }
  }

  private _platformSupportsMouseEvents(): boolean {
    return !this._platform.IOS && !this._platform.ANDROID;
  }

  public ngOnDestroy(): void {
    const nativeElement = this._elementRef.nativeElement;

    clearTimeout(this._touchstartTimeout);

    if (this._componentRef) {
      this._tooltipInstance = null;
    }

    this._passiveListeners.forEach(([
      event,
      listener,
    ]) => {
      nativeElement.removeEventListener(event, listener, passiveListenerOptions);
    });
    this._passiveListeners.length = 0;

    this._focusMonitor.stopMonitoring(nativeElement);
  }
}
