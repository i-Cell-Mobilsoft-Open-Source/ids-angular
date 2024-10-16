import { DOMRectBase, elementClippedFrom } from './scroll-clip';

import { IdsExtendedHorizontalPosition, IdsExtendedHorizontalPositionType, IdsExtendedPositionPairType, IdsExtendedVerticalPosition, IdsExtendedVerticalPositionType, IdsHorizontalPosition, IdsPosition, IdsPositionType, IdsVerticalPosition } from '../../types/position.type';

import { CdkScrollable } from '@angular/cdk/scrolling';
import { computed, ElementRef, signal } from '@angular/core';
import { Subject } from 'rxjs';

export class ConnectedPosition {
  private _rect = signal<DOMRectBase | null>(null);
  public positionTop = computed(() => (this._rect() ? `${Math.round(this._rect()!.top)}px` : null));
  public positionLeft = computed(() => (this._rect() ? `${Math.round(this._rect()!.left)}px` : null));
  public fallbackPositionPair = signal<IdsExtendedPositionPairType | null>(null);
  public shouldHide = new Subject<void>();

  constructor(
    private _scrollContainers: CdkScrollable[],
    private _triggerElement: HTMLElement,
    private _positionedElement: ElementRef<HTMLElement>,
    private _originalPositionPair: IdsExtendedPositionPairType,
  ) {}

  public doPosition(): void {
    const newRect = this._getNewRect(this._originalPositionPair);
    const clippedFrom = elementClippedFrom(newRect, this._scrollContainers ?? []);

    if (!clippedFrom) {
      this._rect.set(newRect);
      this.fallbackPositionPair.set(null);
      return;
    }

    const fallbackPositionPair = this._getFallbackPositionPair(clippedFrom);
    if (!fallbackPositionPair || this._shouldHide(fallbackPositionPair)) {
      this.shouldHide.next();
      return;
    }

    this._rect.set(this._getNewRect(fallbackPositionPair!));
    this.fallbackPositionPair.set(fallbackPositionPair);
  }

  // eslint-disable-next-line @stylistic/js/array-element-newline, @stylistic/js/array-bracket-newline
  private _getNewRect([horizontalPosition, verticalPosition]: IdsExtendedPositionPairType): DOMRectBase {
    const triggerEl = this._triggerElement!;
    const triggerRect = triggerEl.getBoundingClientRect();
    const tooltipEl = this._positionedElement.nativeElement;
    const width = tooltipEl.offsetWidth;
    const height = tooltipEl.offsetHeight;
    let left = 0;
    let top = 0;
    switch (horizontalPosition) {
      case IdsExtendedHorizontalPosition.LEFT:
        left = triggerRect.left - tooltipEl.offsetWidth;
        break;
      case IdsExtendedHorizontalPosition.CENTER:
        left = triggerRect.left + triggerEl.clientWidth / 2 - tooltipEl.offsetWidth / 2;
        break;
      case IdsExtendedHorizontalPosition.RIGHT:
        left = triggerRect.right;
        break;
    }
    switch (verticalPosition) {
      case IdsExtendedVerticalPosition.TOP:
        top = triggerRect.top - tooltipEl.offsetHeight;
        break;
      case IdsExtendedVerticalPosition.CENTER:
        top = triggerRect.top + tooltipEl.offsetHeight / 2 - tooltipEl.offsetHeight / 2;
        break;
      case IdsExtendedVerticalPosition.BOTTOM:
        top = triggerRect.bottom;
        break;
    }
    const right = left + width;
    const bottom = top + height;
    return { left, top, height, width, right, bottom };
  }

  private _getFallbackPositionPair(clippedFrom: Set<IdsPositionType>): IdsExtendedPositionPairType | null {
    if (
      (clippedFrom.has(IdsPosition.TOP) && clippedFrom.has(IdsPosition.BOTTOM))
      || (clippedFrom.has(IdsPosition.RIGHT) && clippedFrom.has(IdsPosition.LEFT))
    ) {
      return null;
    }
    const clippedFromHorizontal = clippedFrom.has(IdsPosition.RIGHT) ? IdsPosition.RIGHT : IdsPosition.LEFT;
    const clippedFromVertical = clippedFrom.has(IdsPosition.TOP) ? IdsPosition.TOP : IdsPosition.BOTTOM;
    // eslint-disable-next-line @stylistic/js/array-bracket-newline, @stylistic/js/array-element-newline
    const [currentHorizontal, currentVertical] = this._originalPositionPair!;
    const isClippedHorizontal = Object.values(IdsHorizontalPosition).some((pos) => clippedFrom.has(pos));
    const isClippedVertical = Object.values(IdsVerticalPosition).some((pos) => clippedFrom.has(pos));
    if (isClippedHorizontal && isClippedVertical) {
      // eslint-disable-next-line @stylistic/js/array-bracket-newline, @stylistic/js/array-element-newline
      return [this._getOppositeHorizontalDirection(clippedFromHorizontal), this._getOppositeVerticalDirection(clippedFromVertical)];
    }
    if (isClippedHorizontal) {
      // eslint-disable-next-line @stylistic/js/array-bracket-newline, @stylistic/js/array-element-newline
      return [this._getOppositeHorizontalDirection(clippedFromHorizontal), currentVertical];
    }
    if (isClippedVertical) {
      // eslint-disable-next-line @stylistic/js/array-bracket-newline, @stylistic/js/array-element-newline
      return [currentHorizontal, this._getOppositeVerticalDirection(clippedFromVertical)];
    }
    return null;
  }

  private _getOppositeHorizontalDirection(
    direction: IdsExtendedHorizontalPositionType,
  ): IdsExtendedHorizontalPositionType {
    switch (direction) {
      case IdsExtendedHorizontalPosition.LEFT:
        return IdsExtendedHorizontalPosition.RIGHT;
      case IdsExtendedHorizontalPosition.RIGHT:
        return IdsExtendedHorizontalPosition.LEFT;
      case IdsExtendedHorizontalPosition.CENTER:
        return IdsExtendedHorizontalPosition.CENTER;
    }
  }

  private _getOppositeVerticalDirection(
    direction: IdsExtendedVerticalPositionType,
  ): IdsExtendedVerticalPositionType {
    switch (direction) {
      case IdsExtendedVerticalPosition.CENTER:
        return IdsExtendedVerticalPosition.CENTER;
      case IdsExtendedVerticalPosition.TOP:
        return IdsExtendedVerticalPosition.BOTTOM;
      case IdsExtendedVerticalPosition.BOTTOM:
        return IdsExtendedVerticalPosition.TOP;
    }
  }

  private _shouldHide(fallbackPositionPair: IdsExtendedPositionPairType): boolean {
    const fallbackRect = this._getNewRect(fallbackPositionPair);
    const fallbackClippedFrom = elementClippedFrom(fallbackRect, this._scrollContainers ?? []);
    return Boolean(fallbackClippedFrom);
  }
}
