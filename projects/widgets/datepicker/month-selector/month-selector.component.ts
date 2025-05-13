import { IdsCalendarPage } from '../calendar/calendar-page';

import { ChangeDetectionStrategy, Component, computed, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { addMonths, addYears, clampDate, compareDates, createNormalizedDate, endOfMonth, isValidDate, startOfMonth } from '@i-cell/ids-angular/core';
import { map, startWith } from 'rxjs';

const monthsPerRow = 4;
const lastMonth = 11;

@Component({
  selector: 'ids-month-selector',
  imports: [],
  templateUrl: './month-selector.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: IdsCalendarPage,
      useExisting: IdsMonthSelectorComponent,
    },
  ],
  host: {
    'class': 'ids-month-selector',
    '(keydown)': '_handleKeydown($event)',
  },
})
export class IdsMonthSelectorComponent extends IdsCalendarPage {
  protected _focusedYear = computed<number>(() => this.focusedDate().getFullYear());

  protected _monthLabels = toSignal(this._intl.changes.pipe(startWith(null), map(() => {
    const currentYear = new Date().getFullYear();
    const monthLabels = Array.from({ length: 12 })
      .map((nil, month) => this._intl.getMonthLabel(createNormalizedDate(currentYear, month, 1)) ?? '');
    return monthLabels;
  })));

  public override headerLabel = computed<string>(() => String(this._focusedYear()));

  public override hasPreviousPage(): boolean {
    const min = this.min();

    if (!isValidDate(min)) {
      return true;
    }

    const startOfYear = createNormalizedDate(this._focusedYear(), 0, 1);

    return compareDates(min, startOfYear) === -1;
  }

  public override gotoPreviousPage(): void {
    this.focusedDate.set(createNormalizedDate(this._focusedYear() - 1, lastMonth, 1));
  }

  public override hasNextPage(): boolean {
    const max = this.max();

    if (!isValidDate(max)) {
      return true;
    }

    // eslint-disable-next-line no-magic-numbers
    const endOfYear = createNormalizedDate(this._focusedYear(), 11, 31);

    return compareDates(max, endOfYear) === 1;
  }

  public override gotoNextPage(): void {
    this.focusedDate.set(createNormalizedDate(this._focusedYear() + 1, 0, 1));
  }

  protected _selectMonth(event: MouseEvent, month: number): void {
    event.stopPropagation();
    event.preventDefault();

    const currentFocusedDate = this.focusedDate();
    const nextFocusedDate = createNormalizedDate(currentFocusedDate.getFullYear(), month, currentFocusedDate.getDate());

    this.selected.emit(clampDate(nextFocusedDate, this.min(), this.max()));
  }

  protected _isMonthFocused(month: number): boolean {
    return month === this.focusedDate().getMonth();
  }

  protected _isMonthSelected(month: number): boolean {
    const selectedYear = this.value()?.getFullYear();
    const selectedMonth = this.value()?.getMonth();

    return this._focusedYear() === selectedYear && month === selectedMonth;
  }

  protected _isCurrentMonth(month: number): boolean {
    return this._focusedYear() === this._today.getFullYear() && month === this._today.getMonth();
  }

  protected _isMonthDisabled(month: number): boolean {
    const min = this.min();
    const max = this.max();
    const monthAsDate = new Date(this._focusedYear(), month, 1);

    return (isValidDate(min) && compareDates(endOfMonth(monthAsDate), startOfMonth(min)) === -1) ||
      (isValidDate(max) && compareDates(monthAsDate, endOfMonth(max)) === 1);
  }

  protected _getMonthAsDate(month: number): Date {
    return createNormalizedDate(this._focusedYear(), month, 1);
  }

  private _handleKeydown(event: KeyboardEvent): void {
    let focusedDate = this.focusedDate();

    switch (event.code) {
      case 'ArrowUp':
        focusedDate = addMonths(focusedDate, -monthsPerRow);
        break;
      case 'ArrowDown':
        focusedDate = addMonths(focusedDate, monthsPerRow);
        break;
      case 'ArrowLeft':
        focusedDate = addMonths(focusedDate, -1);
        break;
      case 'ArrowRight':
        focusedDate = addMonths(focusedDate, 1);
        break;
      case 'Home':
        focusedDate = new Date(focusedDate.getFullYear(), 0, focusedDate.getDate());
        break;
      case 'End':
        // eslint-disable-next-line no-magic-numbers
        focusedDate = new Date(focusedDate.getFullYear(), 11, focusedDate.getDate());
        break;
      case 'PageUp':
        focusedDate = addYears(focusedDate, -1);
        break;
      case 'PageDown':
        focusedDate = addYears(focusedDate, 1);
        break;
    }

    this.focusedDate.set(clampDate(focusedDate, this.min(), this.max()));
  }
}
