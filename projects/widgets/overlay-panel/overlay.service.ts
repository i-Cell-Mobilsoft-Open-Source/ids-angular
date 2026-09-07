import { IdsNestedBlockScrollStrategy } from './nested-block-scroll-strategy';
import { IdsOverlayRef } from './overlay-ref';
import { IdsOverlayScrollLockService } from './overlay-scroll-lock.service';

import { Direction } from '@angular/cdk/bidi';
import {
  CdkOverlayOrigin,
  ConnectedPosition,
  FlexibleConnectedPositionStrategy,
  Overlay,
  OverlayConfig,
  ScrollStrategy,
} from '@angular/cdk/overlay';
import { ComponentPortal, ComponentType } from '@angular/cdk/portal';
import { ElementRef, Injectable, Injector, StaticProvider, ViewContainerRef, inject } from '@angular/core';

export type IdsOverlayOrigin = CdkOverlayOrigin | ElementRef<HTMLElement>;

export type IdsOverlayScrollStrategy = ScrollStrategy | 'block' | 'close' | 'nested-block' | 'noop' | 'reposition';

export type IdsOverlayOpenConfig = {
  origin: IdsOverlayOrigin;
  positions: ConnectedPosition[];
  panelClass?: string | string[];
  hasBackdrop?: boolean;
  backdropClass?: string | string[];
  direction?: Direction;
  scrollStrategy?: IdsOverlayScrollStrategy;
  viewportMargin?: number;
  lockedPosition?: boolean;
  flexibleDimensions?: boolean;
  transformOriginSelector?: string;
};

export type IdsOverlayOpenComponentConfig = IdsOverlayOpenConfig & {
  viewContainerRef?: ViewContainerRef;
  injector?: Injector;
  providers?: StaticProvider[];
};

@Injectable({
  providedIn: 'root',
})
export class IdsOverlayService {
  private readonly _overlay = inject(Overlay);
  private readonly _injector = inject(Injector);
  private readonly _scrollLock = inject(IdsOverlayScrollLockService);

  public openComponent<TComponent>(
    component: ComponentType<TComponent>,
    config: IdsOverlayOpenComponentConfig,
  ): IdsOverlayRef<TComponent> {
    const scrollLockTargets = this._getScrollLockTargets(config);
    const overlayConfig = this._getOverlayConfig(config, scrollLockTargets);
    const idsOverlayRef = new IdsOverlayRef<TComponent>(
      this._overlay.create(overlayConfig),
      () => this._scrollLock.unmarkScrollLockTargets(scrollLockTargets),
    );
    const injector = this._getInjector(config, idsOverlayRef);

    this._scrollLock.markScrollLockTargets(scrollLockTargets);

    try {
      idsOverlayRef.attachComponent(
        new ComponentPortal(component, config.viewContainerRef, injector),
      );
    } catch(error) {
      idsOverlayRef.close();

      throw error;
    }

    return idsOverlayRef;
  }

  private _getOverlayConfig(config: IdsOverlayOpenConfig, scrollLockTargets: HTMLElement[]): OverlayConfig {
    return {
      positionStrategy: this._getPositionStrategy(config),
      hasBackdrop: config.hasBackdrop,
      backdropClass: config.backdropClass,
      direction: config.direction,
      scrollStrategy: this._getScrollStrategy(config.scrollStrategy, scrollLockTargets),
      panelClass: config.panelClass,
    };
  }

  private _getPositionStrategy(config: IdsOverlayOpenConfig): FlexibleConnectedPositionStrategy {
    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(this._getOriginElementRef(config.origin))
      .withPositions(config.positions);

    if (config.transformOriginSelector) {
      positionStrategy.withTransformOriginOn(config.transformOriginSelector);
    }

    if (config.flexibleDimensions !== undefined) {
      positionStrategy.withFlexibleDimensions(config.flexibleDimensions);
    }

    if (config.viewportMargin !== undefined) {
      positionStrategy.withViewportMargin(config.viewportMargin);
    }

    if (config.lockedPosition) {
      positionStrategy.withLockedPosition();
    }

    return positionStrategy;
  }

  private _getScrollStrategy(scrollStrategy: IdsOverlayScrollStrategy = 'nested-block', scrollLockTargets: HTMLElement[]): ScrollStrategy {
    if (typeof scrollStrategy !== 'string') {
      return scrollStrategy;
    }

    if (scrollStrategy === 'nested-block') {
      const nestedBlockScrollStrategy = new IdsNestedBlockScrollStrategy(this._overlay.scrollStrategies.block(), this._scrollLock);

      nestedBlockScrollStrategy.setScrollLockTargets(scrollLockTargets);

      return nestedBlockScrollStrategy;
    }

    return this._overlay.scrollStrategies[scrollStrategy]();
  }

  private _getScrollLockTargets(config: IdsOverlayOpenConfig): HTMLElement[] {
    return config.scrollStrategy === undefined || config.scrollStrategy === 'nested-block'
      ? this._scrollLock.getScrollableAncestors(config.origin)
      : [];
  }

  private _getInjector<TComponent>(
    config: IdsOverlayOpenComponentConfig,
    overlayRef: IdsOverlayRef<TComponent>,
  ): Injector {
    return Injector.create({
      parent: config.injector ?? this._injector,
      providers: [
        ...(config.providers ?? []),
        {
          provide: IdsOverlayRef,
          useValue: overlayRef,
        },
      ],
    });
  }

  private _getOriginElementRef(origin: IdsOverlayOrigin): ElementRef<HTMLElement> {
    return origin instanceof CdkOverlayOrigin ? origin.elementRef : origin;
  }
}
