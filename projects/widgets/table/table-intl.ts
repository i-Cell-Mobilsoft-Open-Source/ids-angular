import { IdsTableColumnDef } from './types/table-column-def';
import { IdsTableSortDirection, IdsTableSortDirectionType } from './types/table-sort-direction';

import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IdsTableIntl<D> {
  public readonly changes: Subject<void> = new Subject<void>();

  public numberFormat = new Intl.NumberFormat();
  public headerSelectorAriaLabel = 'Select/deselect all rows';
  public rowSelectorAriaLabel = 'Select/deselect row';
  public detailHeaderLabel = 'Actions';

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public getDetailExpandButtonAriaLabel(rowData: D): string {
    return 'Expand row details';
  }

  public getSortButtonAriaLabel(colDef: IdsTableColumnDef<D>, nextSortDirection: IdsTableSortDirectionType): string {
    const label = this.getColLabel(colDef);

    switch (nextSortDirection) {
      case IdsTableSortDirection.NONE:
        return `Unsort ${label}`;
      case IdsTableSortDirection.ASC:
        return `Sort ${label} ascending`;
      case IdsTableSortDirection.DESC:
        return `Sort ${label} descending`;
    }
  };

  public getColLabel(colDef: IdsTableColumnDef<D>): string {
    return colDef.label || '';
  }
}

/** @docs-private */
export function IDS_TABLE_INTL_PROVIDER_FACTORY<D>(parentIntl?: IdsTableIntl<D>): IdsTableIntl<D> {
  return parentIntl || new IdsTableIntl();
}

/** @docs-private */
export const IDS_TABLE_INTL_PROVIDER = {
  // If there is already an IdsTableIntl available, use that. Otherwise, provide a new one.
  provide: IdsTableIntl,
  deps: [
    [
      new Optional(),
      new SkipSelf(),
      IdsTableIntl,
    ],
  ],
  useFactory: IDS_TABLE_INTL_PROVIDER_FACTORY,
};
