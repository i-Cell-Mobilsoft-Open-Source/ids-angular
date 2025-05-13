import { InjectionToken } from '@angular/core';
import { parseDate } from '@i-cell/ids-angular/core';

export type IdsDateParserFn = (value: string, utc?: boolean) => Date | null;

export const IDS_DATE_PARSER = new InjectionToken<IdsDateParserFn>('idsDateParser', {
  providedIn: 'root',
  factory: (): IdsDateParserFn => parseDate,
});
