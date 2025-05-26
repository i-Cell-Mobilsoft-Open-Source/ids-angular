/* eslint-disable no-magic-numbers */

import { isNumber, positiveModulus } from './number';
import { isString } from './string';

const ISO_8601_REGEXP = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;

const weekLength = 7;

function padDigits(num: number): string {
  return num > 9 ? String(num) : `0${num}`;
}

function dayOfWeekWithOffset(weekDay: Date, offset: number): number {
  return (weekLength + weekDay.getDay() - offset) % weekLength;
}

export function isDate(value: unknown): value is Date {
  return value instanceof Date;
}

export function isValidDate(value: unknown): value is Date {
  return isDate(value) && !isNaN(value.getTime());
}

export function getValidDateOrNull(value: unknown): Date | null {
  return isValidDate(value) ? value : null;
}

export function equalDates(date1: Date | null, date2: Date | null): boolean {
  // eslint-disable-next-line eqeqeq
  return date1 && date2 ? Object.is(+startOfDay(date1), +startOfDay(date2)) : date1 == date2;
}

export function compareDates(date1: Date, date2: Date): number {
  return Math.sign(+date1 - +date2);
}

export function clampDate(date: Date, min: Date | null, max: Date | null): Date;
export function clampDate(date: Date | null, min: Date | null, max: Date | null): Date | null {
  if (!isValidDate(date)) {
    return date;
  }

  const dateMillis = date.getTime();
  const minDate = isValidDate(min) ? min.getTime() : dateMillis;
  const maxDate = isValidDate(max) ? max.getTime() : dateMillis;

  return new Date(Math.max(minDate, Math.min(dateMillis, maxDate)));
}

export function invalidDate(): Date {
  return new Date(NaN);
}

export function cloneDate(date: Date): Date {
  return new Date(date);
}

export function parseDate(value: string, utc = false): Date | null {
  if (!value) {
    return null;
  }
  if (ISO_8601_REGEXP.test(value)) {
    return new Date(utc ? value : `${value}T00:00:00`);
  }
  return invalidDate();
}

export function deserializeDate(value: unknown): Date | null {
  // Numeric timestamp
  if (isNumber(value)) {
    return new Date(value);
  }

  // Empty value -> null
  if (!value) {
    return null;
  }

  // value is a Date instance, nothing to process
  if (isDate(value)) {
    return value;
  }

  if (isString(value)) {
    return parseDate(value);
  }

  return invalidDate();
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${year}-${padDigits(month)}-${padDigits(day)}`;
}

export function formatUTCDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

export function addDays(date: Date, days: number): Date {
  const clonedDate = cloneDate(date);
  clonedDate.setDate(clonedDate.getDate() + days);
  return clonedDate;
}

export function addMonths(date: Date, months: number): Date {
  const newDate = new Date();
  newDate.setFullYear(date.getFullYear(), date.getMonth() + months, date.getDate());
  newDate.setHours(0, 0, 0, 0);

  const newMonth = newDate.getMonth();
  const desiredMonth = positiveModulus(date.getMonth() + months, 12);

  if (newMonth !== desiredMonth) {
    newDate.setDate(0);
  }

  return newDate;
}

export function addYears(date: Date, years: number): Date {
  return addMonths(date, years * 12);
}

export function startOfDay(date: Date): Date {
  const clonedDate = cloneDate(date);
  clonedDate.setHours(0, 0, 0, 0);
  return clonedDate;
}

export function endOfDay(date: Date): Date {
  const clonedDate = cloneDate(date);
  clonedDate.setHours(23, 59, 59, 999);
  return clonedDate;
}

export function startOfWeek(weekDay: Date, offset: number): Date {
  return addDays(weekDay, -dayOfWeekWithOffset(weekDay, offset));
}

export function endOfWeek(weekDay: Date, offset: number): Date {
  return addDays(weekDay, 6 - dayOfWeekWithOffset(weekDay, offset));
}

export function startOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function endOfMonth(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

export function startOfYear(date: Date): Date {
  return new Date(date.getFullYear(), 0, 1);
}

export function endOfYear(date: Date): Date {
  return new Date(date.getFullYear(), 12, 0);
}

export function getDatesBetween(startDate: Date, endDate: Date): Date[] {
  if (!isValidDate(startDate) || !isValidDate(endDate)) {
    return [];
  }

  let current = startOfDay(startDate);
  const end = startOfDay(endDate);
  const result = [];

  while (current <= end) {
    result.push(new Date(current));
    current = addDays(current, 1);
  }

  return result;
}

export function createNormalizedDate(year: number, month: number, date: number): Date {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return new Date(year, month, Math.min(date, daysInMonth));
}
