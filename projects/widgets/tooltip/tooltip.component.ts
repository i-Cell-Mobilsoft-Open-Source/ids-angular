import { IdsTooltipPositionType } from './types/tooltip-position.type';
import { IdsTooltipVariantType } from './types/tooltip-variant.type';
import { IdsTooltipTextAlign } from './types/tooltip.type';
import { extendedPositionToTooltipPosition, tooltipPositionToExtendedPosition } from './utils/converters';

import { CdkScrollable } from '@angular/cdk/scrolling';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, ElementRef, inject, OnDestroy, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ConnectedPosition, IdsSizeType, ComponentBase } from '@i-cell/ids-angular/core';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'ids-tooltip',
  standalone: true,
  imports: [],
  templateUrl: './tooltip.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.top]': '_hostPositionTop()',
    '[style.left]': '_hostPositionLeft()',
  },
})
export class IdsTooltipComponent extends ComponentBase implements AfterViewInit, OnDestroy {
  protected override get _hostName(): string {
    return 'tooltip';
  }

  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _onHide: Subject<void> = new Subject();
  private readonly _tooltipElement = inject<ElementRef<HTMLElement>>(ElementRef);

  private _connectedPosition?: ConnectedPosition;
  private _message?: string;
  private _size?: IdsSizeType;
  private _variant?: IdsTooltipVariantType;
  private _originalTooltipPosition: IdsTooltipPositionType | null = null;
  private _fallbackTooltipPosition = computed(() =>
    extendedPositionToTooltipPosition(this._connectedPosition?.fallbackPositionPair()),
  );

  private _textAlign?: IdsTooltipTextAlign;
  private _isVisible = false;
  private _showTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private _hideTimeoutId: ReturnType<typeof setTimeout> | undefined;
  private _tooltipInitiated = false;

  protected _hostClasses = computed(() => this._getHostClasses([
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
  ]));

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

  private _hostPositionTop = computed(() => this._connectedPosition?.positionTop());

  private _hostPositionLeft = computed(() => this._connectedPosition?.positionLeft());

  public ngAfterViewInit(): void {
    this._tooltipInitiated = true;
    this.doPosition();
  }

  public initiate(
    values: {
      triggerElement: HTMLElement
      scrollContainers?: CdkScrollable[]
      size?: IdsSizeType
      variant?: IdsTooltipVariantType
      originalPosition?: IdsTooltipPositionType
      textAlign?: IdsTooltipTextAlign
    }): void {
    this._size = values.size;
    this._variant = values.variant;
    this._originalTooltipPosition = values.originalPosition ?? null;
    this._textAlign = values.textAlign;
    const originalPositionPair = tooltipPositionToExtendedPosition(this._originalTooltipPosition)!;

    if (values.scrollContainers) {
      this._connectedPosition = new ConnectedPosition(
        values.scrollContainers,
        values.triggerElement,
        this._tooltipElement,
        originalPositionPair,
      );
      this._connectedPosition.shouldHide.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => this._hideImmediately());
    }
  }

  public doPosition(): void {
    if (!this._tooltipInitiated) {
      return;
    }

    this._connectedPosition?.doPosition();
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
  }
}
