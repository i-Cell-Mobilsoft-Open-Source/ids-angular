import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IdsPaginatorIntl {
  public readonly changes: Subject<void> = new Subject<void>();

  public nextPageLabel: string = 'Go to next page';
  public previousPageLabel: string = 'Go to previous page';
  public firstPageLabel: string = 'Go to first page';
  public lastPageLabel: string = 'Go to last page';
  public pageLabel: string = 'Go to page ';

  public getRangeLabel: (page: number, pageSize: number, length: number) => string = (
    page: number,
    pageSize: number,
    length: number,
  ) => {
    if (length === 0 || pageSize === 0) {
      return 'Page 0 of 0';
    }

    const maxPageCount = Math.ceil(length / pageSize);

    return `Page ${page + 1} of ${maxPageCount}`;
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