import { IdsCalendarPage } from '../calendar/calendar-page';

import { ChangeDetectionStrategy, Component, computed, ViewEncapsulation } from '@angular/core';
import { addYears, clampDate, createNormalizedDate, isValidDate, positiveModulus } from '@i-cell/ids-angular/core';

const yearsPerRow = 4;
const yearsPerPage = 24;

@Component({
  selector: 'ids-year-selector',
  imports: [],
  templateUrl: './year-selector.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: IdsCalendarPage,
      useExisting: IdsYearSelectorComponent,
    },
  ],
  host: {
    'class': 'ids-year-selector',
    '(keydown)': '_handleKeydown($event)',
  },
})
export class IdsYearSelectorComponent extends IdsCalendarPage {
  private _firstYearOnPage = computed(() => {
    const focusedYear = this.focusedDate().getFullYear();
    const firstYearOffset = this._getFirstYearOffset(focusedYear, this.min()?.getFullYear(), this.max()?.getFullYear());
    const firstYearOnPage = focusedYear - firstYearOffset;

    return firstYearOnPage;
  });

  protected _years = computed(() => {
    const firstYearOnPage = this._firstYearOnPage();
    const years = Array.from({ length: yearsPerPage }).map((_nil, index) => firstYearOnPage + index);

    return years;
  });

  public override headerLabel = computed<string>(() => `${this._years()[0]} - ${this._years().at(-1)}`);

  public override hasPreviousPage(): boolean {
    const min = Number.isFinite(this.min()?.getFullYear()) ? this.min()!.getFullYear() : Number.POSITIVE_INFINITY;
    const firstYearOnPage = Number.isFinite(this._firstYearOnPage()) ? this._firstYearOnPage() : Number.NEGATIVE_INFINITY;

    return firstYearOnPage > min;
  }

  public override gotoPreviousPage(): void {
    const firstYearOnPage = this._firstYearOnPage();
    const currentFocusedDate = this.focusedDate();
    this.focusedDate.set(createNormalizedDate(firstYearOnPage - 1, currentFocusedDate.getMonth(), currentFocusedDate.getDate()));
  }

  public override hasNextPage(): boolean {
    const max = Number.isFinite(this.max()?.getFullYear()) ? this.max()!.getFullYear() : Number.NEGATIVE_INFINITY;
    const lastYearOnPage = Number.isFinite(this._firstYearOnPage()) ? this._firstYearOnPage() + yearsPerPage - 1 : Number.POSITIVE_INFINITY;

    return lastYearOnPage < max;
  }

  public override gotoNextPage(): void {
    const firstYearOnPage = this._firstYearOnPage();
    const currentFocusedDate = this.focusedDate();
    this.focusedDate.set(
      createNormalizedDate(firstYearOnPage + yearsPerPage, currentFocusedDate.getMonth(), currentFocusedDate.getDate()));
  }

  protected _selectYear(event: MouseEvent, year: number): void {
    event.stopPropagation();
    event.preventDefault();

    const currentFocusedDate = this.focusedDate();
    const nextFocusedDate = createNormalizedDate(year, currentFocusedDate.getMonth(), currentFocusedDate.getDate());

    this.selected.emit(clampDate(nextFocusedDate, this.min(), this.max()));
  }

  protected _isYearFocused(year: number): boolean {
    return year === this.focusedDate().getFullYear();
  }

  protected _isYearSelected(year: number): boolean {
    return year === this.value()?.getFullYear();
  }

  protected _isCurrentYear(year: number): boolean {
    return year === new Date().getFullYear();
  }

  protected _isYearDisabled(year: number): boolean {
    const min = this.min();
    const max = this.max();

    return (isValidDate(min) && year < min.getFullYear()) || (isValidDate(max) && year > max.getFullYear());
  }

  private _handleKeydown(event: KeyboardEvent): void {
    let focusedDate = this.focusedDate();

    switch (event.code) {
      case 'ArrowUp':
        focusedDate = addYears(focusedDate, -yearsPerRow);
        break;
      case 'ArrowDown':
        focusedDate = addYears(focusedDate, yearsPerRow);
        break;
      case 'ArrowLeft':
        focusedDate = addYears(focusedDate, -1);
        break;
      case 'ArrowRight':
        focusedDate = addYears(focusedDate, 1);
        break;
      case 'Home':
        focusedDate = new Date(this._years()[0], focusedDate.getMonth(), focusedDate.getDate());
        break;
      case 'End':
        focusedDate = new Date(this._years().at(-1)!, focusedDate.getMonth(), focusedDate.getDate());
        break;
      case 'PageUp':
        focusedDate = addYears(focusedDate, -yearsPerPage);
        break;
      case 'PageDown':
        focusedDate = addYears(focusedDate, yearsPerPage);
        break;
    }

    this.focusedDate.set(clampDate(focusedDate, this.min(), this.max()));
  }

  private _getFirstYearOffset(focusedYear: number, minYear?: number, maxYear: number = (yearsPerPage - 1)): number {
    // If we have a max year we calculate an offset so that the max year will be the last in the years list
    // Otherwise if we have a min year we calculate an offset so that the min year will be the first in the years list
    const minMaxOffset = maxYear - yearsPerPage + 1 || minYear || 0;
    return positiveModulus(focusedYear - minMaxOffset, yearsPerPage);
  }
}
