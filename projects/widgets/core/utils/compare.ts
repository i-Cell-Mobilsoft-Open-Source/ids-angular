import { isValidDate } from './date';

export function compare(value1: unknown, value2: unknown): number {
  if (Number.isFinite(value1) && Number.isFinite(value2)) {
    return Math.sign((value1 as number) - (value2 as number));
  }

  if (isValidDate(value1) && isValidDate(value2)) {
    return compare(value1.valueOf(), value2.valueOf());
  }

  return String(value1).localeCompare(String(value2));
}
