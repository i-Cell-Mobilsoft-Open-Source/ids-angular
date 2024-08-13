import { TooltipPositionType } from './types/ids-tooltip-position';
import { TooltipVariantType } from './types/ids-tooltip-variant';
import { TooltipTextAlign } from './types/ids-tooltip.type';
import { extendedPositionToTooltipPosition, tooltipPositionToExtendedPosition } from './utils/converters';

import { CdkScrollable } from '@angular/cdk/scrolling';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, ElementRef, HostBinding, inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { createClassList, FlexibleConnectedPosition, SizeType } from '@i-cell/ids-angular/core';
import { Observable, Subject, Subscription } from 'rxjs';

let nextUniqueId = 0;

@Component({
  selector: 'ids-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './ids-tooltip.component.html',
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
  private readonly _tooltipElement = inject<ElementRef<HTMLElement>>(ElementRef);

  private _flexibleConnectedPosition?: FlexibleConnectedPosition;
  public id = this._uniqueId;
  private _message?: string;
  private _size?: SizeType;
  private _variant?: TooltipVariantType;
  private _originalTooltipPosition: TooltipPositionType | null = null;
  private _fallbackTooltipPosition = computed(() =>
    extendedPositionToTooltipPosition(this._flexibleConnectedPosition?.fallbackPositionPair()),
  );

  private _textAlign?: TooltipTextAlign;
  private _isVisible = false;
  private _showTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private _hideTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private _tooltipInitiated = false;
  private _shouldHideSubscription?: Subscription;

  private _hostClasses = computed(() => createClassList(
    this._componentClass,
    [
      this._size,
      this._variant,
      [
        'position',
        this._fallbackTooltipPosition() ?? this._originalTooltipPosition,
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

  @HostBinding('style.top') get hostPositionTop(): string | null | undefined {
    return this._flexibleConnectedPosition?.positionTop();
  }

  @HostBinding('style.left') get hostPositionLeft(): string | null | undefined {
    return this._flexibleConnectedPosition?.positionLeft();
  }

  public ngAfterViewInit(): void {
    this._tooltipInitiated = true;
    this.doPosition();
  }

  public initiate(
    values: {
      triggerElement: HTMLElement
      scrollContainers?: CdkScrollable[]
      size?: SizeType
      variant?: TooltipVariantType
      originalPosition?: TooltipPositionType
      textAlign?: TooltipTextAlign
    }): void {
    this._size = values.size;
    this._variant = values.variant;
    this._originalTooltipPosition = values.originalPosition ?? null;
    this._textAlign = values.textAlign;
    const originalPositionPair = tooltipPositionToExtendedPosition(this._originalTooltipPosition)!;

    if (values.scrollContainers) {
      this._flexibleConnectedPosition = new FlexibleConnectedPosition(
        values.scrollContainers,
        values.triggerElement,
        this._tooltipElement,
        originalPositionPair,
      );
      this._shouldHideSubscription = this._flexibleConnectedPosition.shouldHide.subscribe(() => this._hideImmediately());
    }
  }

  public doPosition(): void {
    if (!this._tooltipInitiated) {
      return;
    }

    this._flexibleConnectedPosition?.doPosition();
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

  private _hideImmediately(): void {
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
    this._shouldHideSubscription?.unsubscribe();
  }
}
