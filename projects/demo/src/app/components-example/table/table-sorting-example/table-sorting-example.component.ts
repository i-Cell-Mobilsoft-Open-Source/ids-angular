import { TABLE_EXAMPLE_INTL_PROVIDER } from '../table-example-intl';
import {
  createTableExampleColumnDefs,
  TABLE_EXAMPLE_ROWS,
  TableExampleRow,
} from '../table-example.utils';

import { Component } from '@angular/core';
import { IdsTableCellTemplateDirective, IdsTableComponent, IdsTableSortInfo } from '@i-cell/ids-angular/table';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-table-sorting-example',
  imports: [
    IdsTableComponent,
    IdsTableCellTemplateDirective,
    TranslateModule,
  ],
  templateUrl: './table-sorting-example.component.html',
  viewProviders: [TABLE_EXAMPLE_INTL_PROVIDER],
})
export class TableSortingExampleComponent {
  protected readonly _columnDefs = createTableExampleColumnDefs();
  protected _dataSource = [...TABLE_EXAMPLE_ROWS];

  protected _onSortChange(sortInfo: IdsTableSortInfo | null): void {
    if (!sortInfo) {
      this._dataSource = [...TABLE_EXAMPLE_ROWS];
      return;
    }

    const { sortBy, direction } = sortInfo;
    const field = this._columnDefs.find((col) => col.id === sortBy)?.field as keyof TableExampleRow;

    this._dataSource = [...TABLE_EXAMPLE_ROWS].sort((a, b) => {
      const aValue = a[field];
      const bValue = b[field];

      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return direction === 'asc' ? aValue - bValue : bValue - aValue;
      }

      return direction === 'asc'
        ? String(aValue).localeCompare(String(bValue))
        : String(bValue).localeCompare(String(aValue));
    });
  }
}
