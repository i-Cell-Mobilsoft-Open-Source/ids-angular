import { IdsTooltipPositionType } from './types/tooltip-position.type';
import { IdsTooltipVariantType } from './types/tooltip-variant.type';
import { IdsTooltipTextAlign } from './types/tooltip.type';

import { ChangeDetectionStrategy, Component, computed, input, OnDestroy, ViewEncapsulation } from '@angular/core';
import { IdsSizeType, ComponentBase } from '@i-cell/ids-angular/core';
import { Observable, Subject } from 'rxjs';

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

  public message = input<string>();
  public position = input<IdsTooltipPositionType>();
  public size = input<IdsSizeType>();
  public variant = input<IdsTooltipVariantType>();
  public textAlign = input<IdsTooltipTextAlign>();
  public mouseLeaveHideDelay = input<number>(0);
  public tooltipClass = input<string>();
  public showPointer = input<boolean>();

  public triggerElement?: HTMLElement;
  private _hideTimeout?: ReturnType<typeof setTimeout>;

  protected _hostClasses = computed(() => this._getHostClasses([
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
  ]));

  public get isHideTimerTicking(): boolean {
    return Boolean(this._hideTimeout);
  }

  public hide(delay: number): void {
    this._hideTimeout = setTimeout(() => {
      this._hideTimeout = undefined;
      this._onHide.next();
    }, delay);
  }

  public afterHidden(): Observable<void> {
    return this._onHide;
  }

  public abortHide(): void {
    clearTimeout(this._hideTimeout);
    this._hideTimeout = undefined;
  }

  private _handleMouseEnter(): void {
    if (this._hideTimeout) {
      this.abortHide();
    }
  }

  private _handleMouseLeave({ relatedTarget }: MouseEvent): void {
    if (!relatedTarget || !this.triggerElement?.contains(relatedTarget as Node)) {
      this.hide(this.mouseLeaveHideDelay());
    }
  }

  public ngOnDestroy(): void {
    this._onHide.complete();
  }
}
