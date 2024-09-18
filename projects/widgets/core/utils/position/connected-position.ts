import { DOMRectBase, elementClippedFrom } from './scroll-clip';

import { ExtendedHorizontalPosition, ExtendedHorizontalPositionType, ExtendedPositionPairType, ExtendedVerticalPosition, ExtendedVerticalPositionType, HorizontalPosition, Position, PositionType, VerticalPosition } from '../../types/position.type';

import { CdkScrollable } from '@angular/cdk/scrolling';
import { computed, ElementRef, signal } from '@angular/core';
import { Subject } from 'rxjs';

export class ConnectedPosition {
  private _rect = signal<DOMRectBase | null>(null);
  public positionTop = computed(() => (this._rect() ? `${Math.round(this._rect()!.top)}px` : null));
  public positionLeft = computed(() => (this._rect() ? `${Math.round(this._rect()!.left)}px` : null));
  public fallbackPositionPair = signal<ExtendedPositionPairType | null>(null);
  public shouldHide = new Subject<void>();

  constructor(
    private _scrollContainers: CdkScrollable[],
    private _triggerElement: HTMLElement,
    private _positionedElement: ElementRef<HTMLElement>,
    private _originalPositionPair: ExtendedPositionPairType,
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
  private _getNewRect([horizontalPosition, verticalPosition]: ExtendedPositionPairType): DOMRectBase {
    const triggerEl = this._triggerElement!;
    const triggerRect = triggerEl.getBoundingClientRect();
    const tooltipEl = this._positionedElement.nativeElement;
    const width = tooltipEl.offsetWidth;
    const height = tooltipEl.offsetHeight;
    let left = 0;
    let top = 0;
    switch (horizontalPosition) {
      case ExtendedHorizontalPosition.LEFT:
        left = triggerRect.left - tooltipEl.offsetWidth;
        break;
      case ExtendedHorizontalPosition.CENTER:
        left = triggerRect.left + triggerEl.clientWidth / 2 - tooltipEl.offsetWidth / 2;
        break;
      case ExtendedHorizontalPosition.RIGHT:
        left = triggerRect.right;
        break;
    }
    switch (verticalPosition) {
      case ExtendedVerticalPosition.TOP:
        top = triggerRect.top - tooltipEl.offsetHeight;
        break;
      case ExtendedVerticalPosition.CENTER:
        top = triggerRect.top + tooltipEl.offsetHeight / 2 - tooltipEl.offsetHeight / 2;
        break;
      case ExtendedVerticalPosition.BOTTOM:
        top = triggerRect.bottom;
        break;
    }
    const right = left + width;
    const bottom = top + height;
    return { left, top, height, width, right, bottom };
  }

  private _getFallbackPositionPair(clippedFrom: Set<PositionType>): ExtendedPositionPairType | null {
    if (
      (clippedFrom.has(Position.TOP) && clippedFrom.has(Position.BOTTOM))
      || (clippedFrom.has(Position.RIGHT) && clippedFrom.has(Position.LEFT))
    ) {
      return null;
    }
    const clippedFromHorizontal = clippedFrom.has(Position.RIGHT) ? Position.RIGHT : Position.LEFT;
    const clippedFromVertical = clippedFrom.has(Position.TOP) ? Position.TOP : Position.BOTTOM;
    // eslint-disable-next-line @stylistic/js/array-bracket-newline, @stylistic/js/array-element-newline
    const [currentHorizontal, currentVertical] = this._originalPositionPair!;
    const isClippedHorizontal = Object.values(HorizontalPosition).some((pos) => clippedFrom.has(pos));
    const isClippedVertical = Object.values(VerticalPosition).some((pos) => clippedFrom.has(pos));
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
    direction: ExtendedHorizontalPositionType,
  ): ExtendedHorizontalPositionType {
    switch (direction) {
      case ExtendedHorizontalPosition.LEFT:
        return ExtendedHorizontalPosition.RIGHT;
      case ExtendedHorizontalPosition.RIGHT:
        return ExtendedHorizontalPosition.LEFT;
      case ExtendedHorizontalPosition.CENTER:
        return ExtendedHorizontalPosition.CENTER;
    }
  }

  private _getOppositeVerticalDirection(
    direction: ExtendedVerticalPositionType,
  ): ExtendedVerticalPositionType {
    switch (direction) {
      case ExtendedVerticalPosition.CENTER:
        return ExtendedVerticalPosition.CENTER;
      case ExtendedVerticalPosition.TOP:
        return ExtendedVerticalPosition.BOTTOM;
      case ExtendedVerticalPosition.BOTTOM:
        return ExtendedVerticalPosition.TOP;
    }
  }

  private _shouldHide(fallbackPositionPair: ExtendedPositionPairType): boolean {
    const fallbackRect = this._getNewRect(fallbackPositionPair);
    const fallbackClippedFrom = elementClippedFrom(fallbackRect, this._scrollContainers ?? []);
    return Boolean(fallbackClippedFrom);
  }
}
