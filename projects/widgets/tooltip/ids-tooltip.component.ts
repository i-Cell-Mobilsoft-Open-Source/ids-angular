import { TooltipPositionType } from './types/ids-tooltip-position';
import { TooltipVariantType } from './types/ids-tooltip-variant';
import { TooltipTextAlign } from './types/ids-tooltip.type';
import { extendedPositionToTooltipPosition, tooltipPositionToExtendedPosition } from './utils/converters';

import { DOMRectBase, elementClippedFrom } from '../core/utils/scroll-clip';

import { CdkScrollable } from '@angular/cdk/scrolling';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, ElementRef, HostBinding, HostListener, inject, OnDestroy, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { createClassList, ExtendedHorizontalPosition, ExtendedHorizontalPositionType, ExtendedPositionPairType, ExtendedVerticalPosition, ExtendedVerticalPositionType, HorizontalPosition, Position, PositionType, SizeType, VerticalPosition } from '@i-cell/ids-angular/core';
import { Observable, Subject } from 'rxjs';

let nextUniqueId = 0;

@Component({
  selector: 'ids-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './ids-tooltip.component.html',
  styleUrl: './ids-tooltip.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[id]': 'id',
  },
})
export class IdsTooltipComponent implements AfterViewInit, OnDestroy {
  private readonly _componentClass = 'ids-tooltip';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _onHide: Subject<void> = new Subject();

  private _triggerElement?: HTMLElement;
  private _scrollContainers?: CdkScrollable[];
  private _mouseLeaveHideDelay!: number;
  private _id = this._uniqueId;
  private _message?: string;
  private _size?: SizeType;
  private _variant?: TooltipVariantType;
  private _originalTooltipPosition = signal<TooltipPositionType | null>(null);
  private _originalPositionPair = computed(() => tooltipPositionToExtendedPosition(this._originalTooltipPosition()));
  private _fallbackPositionPair = signal<ExtendedPositionPairType | null>(null);
  private _fallbackTooltipPosition = computed(() => extendedPositionToTooltipPosition(this._fallbackPositionPair()));
  private _textAlign?: TooltipTextAlign;
  private _isVisible = false;
  private _showTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private _hideTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private _tooltipInitated = false;

  private _tooltipElement = viewChild.required<ElementRef<HTMLElement>>('tooltip');

  private _rect = signal<DOMRectBase | null>(null);
  private _positionTop = computed(() => (this._rect() ? `${Math.round(this._rect()!.top)}px` : null));
  private _positionLeft = computed(() => (this._rect() ? `${Math.round(this._rect()!.left)}px` : null));

  private _hostClasses = computed(() => createClassList(
    this._componentClass,
    [
      this._size,
      this._variant,
      [
        'position',
        this._fallbackTooltipPosition() ?? this._originalTooltipPosition(),
      ],
      [
        'text-align',
        this._textAlign,
      ],
    ]),
  );

  public get isVisible(): boolean {
    return this._isVisible;
  }

  public get isHideTimerTicking(): boolean {
    return Boolean(this._hideTimeoutId);
  }

  public get message(): string | undefined {
    return this._message;
  }

  public set message(value: string) {
    this._message = value;
  }

  @HostBinding('class') get hostClasses(): string {
    return this._hostClasses();
  }

  @HostBinding('style.top') get hostPositionTop(): string | null {
    return this._positionTop();
  }

  @HostBinding('style.left') get hostPositionLeft(): string | null {
    return this._positionLeft();
  }

  @HostListener('mouseleave', ['$event']) public handleMouseLeave({ relatedTarget }: MouseEvent): void {
    if (!relatedTarget || !this._triggerElement?.contains(relatedTarget as Node)) {
      if (this._isVisible) {
        this.hide(this._mouseLeaveHideDelay);
      }
    }
  }

  public ngAfterViewInit(): void {
    this._tooltipInitated = true;
    this.doPosition();
  }

  public initValues(
    values: {
      triggerElement: HTMLElement
      scrollContainers?: CdkScrollable[]
      mouseLeaveHideDelay: number
      size?: SizeType
      variant?: TooltipVariantType
      originalPosition?: TooltipPositionType
      textAlign?: TooltipTextAlign
    }): void {
    this._triggerElement = values.triggerElement;
    this._scrollContainers = values.scrollContainers;
    this._mouseLeaveHideDelay = values.mouseLeaveHideDelay;
    this._size = values.size;
    this._variant = values.variant;
    this._originalTooltipPosition.set(values.originalPosition ?? null);
    this._textAlign = values.textAlign;
  }

  private _getNewRect([
    horizontalPosition,
    verticalPosition]:
  ExtendedPositionPairType): DOMRectBase {
    const triggerEl = this._triggerElement!;
    const triggerRect = triggerEl.getBoundingClientRect();
    const tooltipEl = this._tooltipElement().nativeElement;
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

  public doPosition(): void {
    if (!this._tooltipInitated) {
      return;
    }

    const newRect = this._getNewRect(this._originalPositionPair()!);
    const clippedFrom = elementClippedFrom(newRect, this._scrollContainers ?? []);

    if (!clippedFrom) {
      this._rect.set(newRect);
      this._fallbackPositionPair.set(null);
      return;
    }

    const fallbackPositionPair = this._getfallbackPositionPair(clippedFrom);
    if (!fallbackPositionPair || this._shouldHide(fallbackPositionPair)) {
      this._hideImmadiately();
      return;
    }

    this._rect.set(this._getNewRect(fallbackPositionPair!));
    this._fallbackPositionPair.set(fallbackPositionPair);
  }

  private _getfallbackPositionPair(clippedFrom: Set<PositionType>): ExtendedPositionPairType | null {
    if (
      (clippedFrom.has(Position.TOP) && clippedFrom.has(Position.BOTTOM))
      || (clippedFrom.has(Position.RIGHT) && clippedFrom.has(Position.LEFT))
    ) {
      return null;
    }
    const clippedFromHorizontal = clippedFrom.has(Position.RIGHT) ? Position.RIGHT : Position.LEFT;
    const clippedFromVertical = clippedFrom.has(Position.TOP) ? Position.TOP : Position.BOTTOM;
    // eslint-disable-next-line @stylistic/array-bracket-newline, @stylistic/array-element-newline
    const [currentHorizontal, currentVertical] = this._originalPositionPair()!;
    const isClippedHorizontal = Object.values(HorizontalPosition).some((pos) => clippedFrom.has(pos));
    const isClippedVertical = Object.values(VerticalPosition).some((pos) => clippedFrom.has(pos));
    if (isClippedHorizontal && isClippedVertical) {
      // eslint-disable-next-line @stylistic/array-bracket-newline, @stylistic/array-element-newline
      return [this._getOppositeHorizontalDirection(clippedFromHorizontal), this._getOppositeVerticalDirection(clippedFromVertical)];
    }
    if (isClippedHorizontal) {
      // eslint-disable-next-line @stylistic/array-bracket-newline, @stylistic/array-element-newline
      return [this._getOppositeHorizontalDirection(clippedFromHorizontal), currentVertical];
    }
    if (isClippedVertical) {
      // eslint-disable-next-line @stylistic/array-bracket-newline, @stylistic/array-element-newline
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

  public show(delay: number): void {
    if (this._hideTimeoutId != null) {
      clearTimeout(this._hideTimeoutId);
    }

    this._showTimeoutId = setTimeout(() => {
      this._setVisibility(true);
      this._showTimeoutId = undefined;
    }, delay);
  }

  public hide(delay: number): void {
    if (this._showTimeoutId != null) {
      clearTimeout(this._showTimeoutId);
    }

    this._hideTimeoutId = setTimeout(() => {
      this._setVisibility(false);
      this._hideTimeoutId = undefined;
      this._onHide.next();
    }, delay);
  }

  private _hideImmadiately(): void {
    this._setVisibility(false);
    clearTimeout(this._hideTimeoutId);
    this._hideTimeoutId = undefined;
    this._onHide.next();
  }

  private _setVisibility(isVisible: boolean): void {
    this._isVisible = isVisible;

    if (isVisible) {
      this.markForCheck();
    }
  }

  public markForCheck(): void {
    this._changeDetectorRef.markForCheck();
  }

  public afterHidden(): Observable<void> {
    return this._onHide;
  }

  public ngOnDestroy(): void {
    this._onHide.complete();
    this._triggerElement = undefined;
  }
}
