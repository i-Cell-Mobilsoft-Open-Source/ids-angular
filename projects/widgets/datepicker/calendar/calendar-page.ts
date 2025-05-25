import { IdsDatepickerIntl } from '../datepicker-intl';

import { afterNextRender, AfterViewInit, ChangeDetectorRef, Directive, ElementRef, inject, Injector, input, model, output, Signal } from '@angular/core';
import { takeUntilDestroyed, toObservable } from '@angular/core/rxjs-interop';

@Directive()
export abstract class IdsCalendarPage implements AfterViewInit {
  private readonly _calendarButtonSelector = '.ids-calendar-button-focused';
  public abstract headerLabel: Signal<string>;

  protected _element = inject(ElementRef);
  private _injector = inject(Injector);
  private _cdRef = inject(ChangeDetectorRef);
  protected _intl = inject(IdsDatepickerIntl);

  public value = input<Date | null>(null);
  public focusedDate = model.required<Date>();
  public min = input<Date | null>(null);
  public max = input<Date | null>(null);

  public selected = output<Date>();

  public abstract hasPreviousPage(): boolean;
  public abstract gotoPreviousPage(): void;
  public abstract hasNextPage(): boolean;
  public abstract gotoNextPage(): void;

  protected readonly _today = new Date();

  constructor() {
    toObservable(this.focusedDate).pipe(takeUntilDestroyed()).subscribe(() => this._moveFocusToCurrent());
    this._intl.changes.pipe(takeUntilDestroyed()).subscribe(() => this._cdRef.markForCheck());
  }

  public ngAfterViewInit(): void {
    this._moveFocusToCurrent();
  }

  private _moveFocusToCurrent(): void {
    afterNextRender(() => {
      const focusedDayButton = this._element.nativeElement.querySelector(this._calendarButtonSelector) as HTMLButtonElement;
      if (focusedDayButton) {
        focusedDayButton.focus();
      }
    }, { injector: this._injector });
  }
}
