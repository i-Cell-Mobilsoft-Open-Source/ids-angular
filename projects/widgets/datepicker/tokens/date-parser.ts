import { InjectionToken } from '@angular/core';
import { invalidDate, isValidDate, parseDate } from '@i-cell/ids-angular/core';

export type IdsDateParserFn = (value: string, utc?: boolean) => Date | null;

const ISO_8601_BASIC_DATE_REGEXP = /^(?<year>\d{4})(?<month>\d{2})(?<day>\d{2})$/;
const ISO_8601_EXTENDED_DATE_REGEXP = /^(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})$/;

function parseDatepickerDate(value: string, utc = false): Date | null {
  const dateParts = value.match(ISO_8601_BASIC_DATE_REGEXP) ?? value.match(ISO_8601_EXTENDED_DATE_REGEXP);
  const dateValue = dateParts?.groups
    ? `${dateParts.groups['year']}-${dateParts.groups['month']}-${dateParts.groups['day']}`
    : value;
  const date = parseDate(dateValue, utc);

  if (!dateParts?.groups || !isValidDate(date)) {
    return date;
  }

  const year = Number(dateParts.groups['year']);
  const month = Number(dateParts.groups['month']);
  const day = Number(dateParts.groups['day']);
  const isMatchingDate = utc
    ? date.getUTCFullYear() === year && date.getUTCMonth() + 1 === month && date.getUTCDate() === day
    : date.getFullYear() === year && date.getMonth() + 1 === month && date.getDate() === day;

  return isMatchingDate ? date : invalidDate();
}

export const IDS_DATE_PARSER = new InjectionToken<IdsDateParserFn>('idsDateParser', {
  providedIn: 'root',
  factory: (): IdsDateParserFn => parseDatepickerDate,
});
