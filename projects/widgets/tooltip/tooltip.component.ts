import { IdsTooltipPositionType } from './types/tooltip-position.type';
import { IdsTooltipVariantType } from './types/tooltip-variant.type';
import { IdsTooltipTextAlign } from './types/tooltip.type';

import { ChangeDetectionStrategy, Component, computed, input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { IdsSizeType, ComponentBase } from '@i-cell/ids-angular/core';
import { Observable, Subject, timer } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ids-tooltip',
  imports: [],
  templateUrl: './tooltip.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(mouseenter)': '_handleMouseEnter()',
    '(mouseleave)': '_handleMouseLeave($event)',
    'aria-hidden': 'true',
    '[class]': 'tooltipClass()',
  },
})
export class IdsTooltipComponent extends ComponentBase implements OnDestroy {
  protected override get _hostName(): string {
    return 'tooltip';
  }

  private readonly _onHide = new Subject<void>();
  private readonly _hideSubject = new Subject<void>();
  private _isHideTimerTicking = false;

  public message = input<string>();
  public position = input<IdsTooltipPositionType>();
  public size = input<IdsSizeType>();
  public variant = input<IdsTooltipVariantType>();
  public textAlign = input<IdsTooltipTextAlign>();
  public mouseLeaveHideDelay = input<number>(0);
  public tooltipClass = input<string>();
  public showPointer = input<boolean>();

  public triggerElement?: HTMLElement;

  protected _hostClasses = computed(() =>
    this._getHostClasses([
      this.size(),
      this.variant(),
      [
        'position',
        this.position(),
      ],
      [
        'text-align',
        this.textAlign(),
      ],
      this.showPointer() ? 'pointered' : null,
    ]),
  );

  public get isHideTimerTicking(): boolean {
    return this._isHideTimerTicking;
  }

  public hide(delay: number): void {
    this._isHideTimerTicking = true;
    timer(delay)
      .pipe(takeUntil(this._hideSubject))
      .subscribe(() => {
        this._isHideTimerTicking = false;
        this._onHide.next();
      });
  }

  public afterHidden(): Observable<void> {
    return this._onHide;
  }

  public abortHide(): void {
    this._hideSubject.next();
    this._isHideTimerTicking = false;
  }

  protected _handleMouseEnter(): void {
    if (this._isHideTimerTicking) {
      this.abortHide();
    }
  }

  protected _handleMouseLeave({ relatedTarget }: MouseEvent): void {
    if (!relatedTarget || !this.triggerElement?.contains(relatedTarget as Node)) {
      this.hide(this.mouseLeaveHideDelay());
    }
  }

  public ngOnDestroy(): void {
    this._hideSubject.complete();
    this._onHide.complete();
  }
}
