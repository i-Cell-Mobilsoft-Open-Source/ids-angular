import { TableExampleRow } from './table-example.utils';

import { DestroyRef, inject, Injectable } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IdsTableColumnDef, IdsTableIntl } from '@i-cell/ids-angular/table';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TableExampleIntl extends IdsTableIntl<TableExampleRow> {
  private readonly _translate = inject(TranslateService);
  private readonly _destroyRef = inject(DestroyRef);

  constructor() {
    super();
    this._translate.onLangChange.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => {
      this.changes.next();
    });
  }

  public override getColLabel(colDef: IdsTableColumnDef<TableExampleRow>): string {
    return colDef.label ? this._translate.instant(colDef.label) : '';
  }
}

export const TABLE_EXAMPLE_INTL_PROVIDER = {
  provide: IdsTableIntl,
  useClass: TableExampleIntl,
};
