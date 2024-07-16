import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IdsPaginatorIntl {
  public readonly changes: Subject<void> = new Subject<void>();

  public nextPageLabel: string = 'Next page';
  public previousPageLabel: string = 'Previous page';
  public firstPageLabel: string = 'First page';
  public lastPageLabel: string = 'Last page';
  public pageLabel: string = 'Go to page ';

  public getRangeLabel: (page: number, pageSize: number, length: number) => string = (
    page: number,
    pageSize: number,
    length: number,
  ) => {
    if (length === 0 || pageSize === 0) {
      return '0 of 0';
    }

    const safeLength = Math.max(length, 0);
    const startIndex = page * pageSize;
    const endIndex =
      startIndex < safeLength ? Math.min(startIndex + pageSize, safeLength) : startIndex + pageSize;

    return `${startIndex + 1} – ${endIndex} of ${safeLength}`;
  };
}

/** @docs-private */
export function IDS_PAGINATOR_INTL_PROVIDER_FACTORY(parentIntl?: IdsPaginatorIntl): IdsPaginatorIntl {
  return parentIntl || new IdsPaginatorIntl();
}

/** @docs-private */
export const IDS_PAGINATOR_INTL_PROVIDER = {
  // If there is already an IdsPaginatorIntl available, use that. Otherwise, provide a new one.
  provide: IdsPaginatorIntl,
  deps: [
    [
      new Optional(),
      new SkipSelf(),
      IdsPaginatorIntl,
    ],
  ],
  useFactory: IDS_PAGINATOR_INTL_PROVIDER_FACTORY,
};
