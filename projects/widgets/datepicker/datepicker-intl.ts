import { Injectable } from '@angular/core';
import { isValidDate } from '@i-cell/ids-angular/core';
import { Subject } from 'rxjs';

const dayAriaLabelFormat = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long', day: 'numeric' });
const monthLabelFormat = new Intl.DateTimeFormat('en-GB', { month: 'short' });
const monthAriaLabelFormat = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long' });
const daySelectorHeaderLabelFormat = new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'long' });
const weekdayLabelFormat = new Intl.DateTimeFormat('en-GB', { weekday: 'narrow' });

@Injectable({ providedIn: 'root' })
export class IdsDatepickerIntl {
  public readonly changes: Subject<void> = new Subject<void>();

  public triggerButtonLabel = 'Open calendar';

  public prevMonthLabel = 'Previous month';
  public nextMonthLabel = 'Next month';

  public prevYearLabel = 'Previous year';
  public nextYearLabel = 'Next year';

  public prevYearsPageLabel = 'Previous 24 years';
  public nextYearsPageLabel = 'Next 24 years';

  public switchToDaySelectorLabel = 'Choose date';
  public switchToYearSelectorLabel = 'Choose year and month';

  public getDayAriaLabel(date: Date): string | null {
    return this._formatDate(date, dayAriaLabelFormat);
  }

  public getMonthLabel(date: Date): string | null {
    return this._formatDate(date, monthLabelFormat);
  }

  public getMonthAriaLabel(date: Date): string | null {
    return this._formatDate(date, monthAriaLabelFormat);
  }

  public getDaySelectorHeaderLabel(date: Date): string | null {
    return this._formatDate(date, daySelectorHeaderLabelFormat);
  }

  public getWeekdayHeaderLabel(date: Date): string | null {
    return this._formatDate(date, weekdayLabelFormat);
  }

  protected _formatDate(date: unknown, dateFormat: Intl.DateTimeFormat): string | null {
    return isValidDate(date) ? dateFormat.format(date) : null;
  }
}
