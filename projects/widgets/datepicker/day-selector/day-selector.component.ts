import { IdsCalendarPage } from '../calendar/calendar-page';

import { ChangeDetectionStrategy, Component, computed, ViewEncapsulation } from '@angular/core';
import { addDays, addMonths, addYears, clampDate, compareDates, endOfMonth, endOfWeek, equalDates, getDatesBetween, isValidDate, startOfMonth, startOfWeek } from '@i-cell/ids-angular/core';

const firstDayOfWeekOffset = 1;
const daysPerWeek = 7;

@Component({
  selector: 'ids-day-selector',
  imports: [],
  templateUrl: './day-selector.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: IdsCalendarPage,
      useExisting: IdsDaySelectorComponent,
    },
  ],
  host: {
    'class': 'ids-day-selector',
    '(keydown)': '_handleKeydown($event)',
  },
})
export class IdsDaySelectorComponent extends IdsCalendarPage {
  public override headerLabel = computed<string>(() => (this._intl.getDaySelectorHeaderLabel(this._currentMonth()) ?? ''));

  protected _currentMonth = computed<Date>(() => startOfMonth(this.focusedDate()));
  protected _previousMonth = computed<Date>(() => addMonths(this._currentMonth(), -1));
  protected _nextMonth = computed<Date>(() => addMonths(this._currentMonth(), 1));

  protected _gridStartDate = computed(() => startOfWeek(this._currentMonth(), firstDayOfWeekOffset));
  protected _gridEndDate = computed(() => endOfWeek(endOfMonth(this._currentMonth()), firstDayOfWeekOffset));
  protected _days = computed(() => getDatesBetween(this._gridStartDate(), this._gridEndDate()));

  protected _weekdayLabels = computed<string[]>(() =>
    this._days().slice(0, daysPerWeek).map((date: Date) => this._intl.getWeekdayHeaderLabel(date) ?? ''));

  public override hasPreviousPage(): boolean {
    const dayOnPrevPage = addDays(this._gridStartDate(), -1);
    const min = this.min() ?? dayOnPrevPage;

    return compareDates(dayOnPrevPage, min) > -1;
  }

  public override gotoPreviousPage(): void {
    const current = this._currentMonth();
    this.focusedDate.set(new Date(current.getFullYear(), current.getMonth(), 0));
  }

  public override hasNextPage(): boolean {
    const dayOnNextPage = addDays(this._gridEndDate(), 1);
    const max = this.max() ?? dayOnNextPage;

    return compareDates(dayOnNextPage, max) < 1;
  }

  public override gotoNextPage(): void {
    const current = this._currentMonth();
    this.focusedDate.set(new Date(current.getFullYear(), current.getMonth() + 1, 1));
  }

  protected _selectDate(event: MouseEvent, date: Date): void {
    event.stopPropagation();
    event.preventDefault();
    this.selected.emit(date);
  }

  protected _isDateInCurrentMonth(date: Date): boolean {
    return date.getMonth() === this._currentMonth().getMonth();
  }

  protected _isDateFocused(date: Date): boolean {
    return equalDates(date, this.focusedDate());
  }

  protected _isDateSelected(date: Date): boolean {
    return equalDates(date, this.value());
  }

  protected _isDateDisabled(date: Date): boolean {
    const min = this.min();
    const max = this.max();

    return (isValidDate(min) && compareDates(date, min) === -1) || (isValidDate(max) && compareDates(date, max) === 1);
  }

  protected _isDateToday(date: Date): boolean {
    return equalDates(date, this._today);
  }

  private _handleKeydown(event: KeyboardEvent): void {
    let focusedDate = this.focusedDate();

    switch (event.code) {
      case 'ArrowUp':

        focusedDate = addDays(focusedDate, -daysPerWeek);
        break;
      case 'ArrowDown':

        focusedDate = addDays(focusedDate, daysPerWeek);
        break;
      case 'ArrowLeft':
        focusedDate = addDays(focusedDate, -1);
        break;
      case 'ArrowRight':
        focusedDate = addDays(focusedDate, 1);
        break;
      case 'Home':
        focusedDate = startOfWeek(focusedDate, firstDayOfWeekOffset);
        break;
      case 'End':
        focusedDate = endOfWeek(focusedDate, firstDayOfWeekOffset);
        break;
      case 'PageUp':
        focusedDate = this._hasShiftModifierKey(event) ?  addYears(focusedDate, -1) : addMonths(focusedDate, -1);
        break;
      case 'PageDown':
        focusedDate = this._hasShiftModifierKey(event) ?  addYears(focusedDate, 1) : addMonths(focusedDate, 1);
        break;
    }

    this.focusedDate.set(clampDate(focusedDate, this.min(), this.max()));
  }

  private _hasShiftModifierKey(event: KeyboardEvent): boolean {
    return event.shiftKey && !event.ctrlKey && !event.altKey && !event.metaKey;
  }
}
