import { IDS_TOOLTIP_DEFAULT_OPTIONS, IDS_TOOLTIP_DEFAULT_OPTIONS_FACTORY } from './ids-tooltip-default-options';
import { IdsTooltipComponent } from './ids-tooltip.component';
import { TooltipPositionType } from './types/ids-tooltip-position';
import { TooltipVariantType } from './types/ids-tooltip-variant';
import { TooltipTextAlign, TooltipTouchGestures } from './types/ids-tooltip.type';

import { FocusMonitor } from '@angular/cdk/a11y';
import { normalizePassiveListenerOptions, Platform } from '@angular/cdk/platform';
import { CdkScrollable, ScrollDispatcher } from '@angular/cdk/scrolling';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ComponentRef, computed, Directive, ElementRef, HostBinding, inject, Injector, input, NgZone, OnDestroy, ViewContainerRef } from '@angular/core';
import { coerceStringAttribute, createClassList, SizeType } from '@i-cell/ids-angular/core';
import { filter, Subject, takeUntil } from 'rxjs';

const defaultOptions = IDS_TOOLTIP_DEFAULT_OPTIONS_FACTORY();
const passiveListenerOptions = normalizePassiveListenerOptions({ passive: true });

@Directive({
  selector: '[idsTooltip]',
  standalone: true,
})
export class IdsTooltipDirective implements AfterViewInit, OnDestroy {
  private readonly _componentClass = 'ids-tooltip-trigger';
  private readonly _injector = inject(Injector);
  private readonly _focusMonitor = inject(FocusMonitor);
  private readonly _platform = inject(Platform);
  private readonly _ngZone = inject(NgZone);
  private readonly _elementRef: ElementRef<HTMLElement> = inject(ElementRef<HTMLElement>);
  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _scrollDispatcher = inject(ScrollDispatcher);
  private readonly _document = inject(DOCUMENT);
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...this._injector.get(IDS_TOOLTIP_DEFAULT_OPTIONS, null, { optional: true }),
  };

  private readonly _passiveListeners: (readonly [string, EventListenerOrEventListenerObject])[] = [];
  private readonly _destroyed = new Subject<void>();

  private _componentRef?: ComponentRef<IdsTooltipComponent> | null;
  private _tooltipInstance: IdsTooltipComponent | null = null;
  private _touchstartTimeout?: ReturnType<typeof setTimeout>;
  private _pointerExitEventsInitialized = false;
  private _scrollContainers?: CdkScrollable[];

  public message = input<string, string>(this._defaultOptions.position, { alias: 'idsTooltip', transform: coerceStringAttribute });
  public position = input<TooltipPositionType>(this._defaultOptions.position, { alias: 'idsTooltipPosition' });
  public size = input<SizeType>(this._defaultOptions.size, { alias: 'idsTooltipSize' });
  public variant = input<TooltipVariantType>(this._defaultOptions.variant, { alias: 'idsTooltipVariant' });
  public showDelay = input<number>(this._defaultOptions.showDelay, { alias: 'idsTooltipShowDelay' });
  public hideDelay = input<number>(this._defaultOptions.hideDelay, { alias: 'idsTooltipHideDelay' });
  public disabled = input<boolean>(false, { alias: 'idsTooltipDisabled' });
  public touchGestures = input<TooltipTouchGestures>('auto', { alias: 'idsTooltipTouchGestures' });
  public textAlign = input<TooltipTextAlign | undefined>(undefined, { alias: 'idsTooltipTextAlign' });

  private _hostClasses = computed(() => createClassList(this._componentClass, []),
  );

  @HostBinding('class') get hostClasses(): string {
    return this._hostClasses();
  }

  public ngAfterViewInit(): void {
    this._setupPointerEnterEventsIfNeeded();

    this._scrollDispatcher.ancestorScrolled(this._elementRef, this._defaultOptions.scrollDebounceTime)
      .pipe(
        filter(() => Boolean(this._tooltipInstance)),
        takeUntil(this._destroyed),
      )
      .subscribe(() => {
        this._ngZone.run(() => {
          this._tooltipInstance!.doPosition();
        });
      });

    this._scrollContainers = this._scrollDispatcher.getAncestorScrollContainers(this._elementRef);

    this._focusMonitor
      .monitor(this._elementRef)
      .pipe(takeUntil(this._destroyed))
      .subscribe((origin) => {
        // Note that the focus monitor runs outside the Angular zone.
        if (!origin) {
          this._ngZone.run(() => this.hide(0));
        } else if (origin === 'keyboard') {
          this._ngZone.run(() => this.show());
        }
      });
  }

  public show(delay: number = this.showDelay()): void {
    if (this.disabled() || !this.message() || this._tooltipInstance?.isVisible) {
      return;
    }

    const componentRef = this._viewContainerRef.createComponent(IdsTooltipComponent);
    this._componentRef = componentRef;

    const instance = componentRef.instance;
    this._tooltipInstance = instance;
    instance.initiate({
      triggerElement: this._elementRef.nativeElement,
      scrollContainers: this._scrollContainers,
      size: this.size(),
      variant: this.variant(),
      originalPosition: this.position(),
      textAlign: this.textAlign(),
    });
    instance
      .afterHidden()
      .pipe(takeUntil(this._destroyed))
      .subscribe(() => this._destroyComponent());
    this._updateTooltipMessage();
    instance.show(delay);
  }

  public hide(delay: number = this.hideDelay()): void {
    const instance = this._tooltipInstance;
    if (instance?.isHideTimerTicking) {
      return;
    }

    if (instance) {
      if (instance.isVisible) {
        instance.hide(delay);
      } else {
        this._destroyComponent();
      }
    }
  }

  public toggle(): void {
    this._tooltipInstance?.isVisible ? this.hide() : this.show(undefined);
  }

  private _destroyComponent(): void {
    this._componentRef?.destroy();
    this._tooltipInstance = null;
  }

  private _updateTooltipMessage(): void {
    if (this._tooltipInstance) {
      this._tooltipInstance.message = this.message();
      this._tooltipInstance.markForCheck();
    }
  }

  private _setupPointerEnterEventsIfNeeded(): void {
    // Optimization: Defer hooking up events if there's no message or the tooltip is disabled.
    if (
      this.disabled() || !this.message() || this._passiveListeners.length
    ) {
      return;
    }

    // The mouse events shouldn't be bound on mobile devices, because they can prevent the
    // first tap from firing its click event or can cause the tooltip to open for clicks.
    if (this._platformSupportsMouseEvents()) {
      this._passiveListeners.push([
        'mouseenter',
        (): void => {
          this._setupPointerExitEventsIfNeeded();
          this.show();
        },
      ]);
    } else if (this.touchGestures() !== 'off') {
      this._disableNativeGesturesIfNecessary();

      this._passiveListeners.push([
        'touchstart',
        (): void => {
          // Note that it's important that we don't `preventDefault` here,
          // because it can prevent click events from firing on the element.
          this._setupPointerExitEventsIfNeeded();
          clearTimeout(this._touchstartTimeout);

          this._touchstartTimeout = setTimeout(
            () => this.show(),
            this._defaultOptions.touchLongPressShowDelay,
          );
        },
      ]);
    }

    this._addListeners(this._passiveListeners);
  }

  private _wheelListener(event: WheelEvent): void {
    if (this._tooltipInstance?.isVisible) {
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
          (event): void => this._wheelListener(event as WheelEvent),
        ],
      );
    } else if (this.touchGestures() !== 'off') {
      this._disableNativeGesturesIfNecessary();
      const touchendListener = (): void => {
        clearTimeout(this._touchstartTimeout);
        this.hide(this._defaultOptions.touchendHideDelay);
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

      // If gestures are set to `auto`, we don't disable text selection on inputs and
      // textareas, because it prevents the user from typing into them on iOS Safari.
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
      // this._overlayRef.dispose();
      this._tooltipInstance = null;
    }

    this._passiveListeners.forEach(([
      event,
      listener,
    ]) => {
      nativeElement.removeEventListener(event, listener, passiveListenerOptions);
    });
    this._passiveListeners.length = 0;

    this._destroyed.next();
    this._destroyed.complete();

    this._focusMonitor.stopMonitoring(nativeElement);
  }
}
