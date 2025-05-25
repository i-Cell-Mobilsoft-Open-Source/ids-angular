import { InjectionToken } from '@angular/core';
import { formatDate } from '@i-cell/ids-angular/core';

export type IdsDateFormatterFn = (date: Date) => string;

export const IDS_DATE_FORMATTER = new InjectionToken<IdsDateFormatterFn>('idsDateFormatter', {
  providedIn: 'root',
  factory: (): IdsDateFormatterFn => formatDate,
});
