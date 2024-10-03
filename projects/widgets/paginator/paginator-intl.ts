import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IdsPaginatorIntl {
  public readonly changes: Subject<void> = new Subject<void>();

  public nextPageLabel: string = 'Next';
  public previousPageLabel: string = 'Previous';
  public nextPageAriaLabel: string = 'Go to next page';
  public previousPageAriaLabel: string = 'Go to previous page';
  public firstPageAriaLabel: string = 'Go to first page';
  public lastPageAriaLabel: string = 'Go to last page';

  public getPageAriaLabel = (page: string): string => `Go to page ${page}`;

  public getRangeLabel = (page: number, pageSize: number, length: number): string => {
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
