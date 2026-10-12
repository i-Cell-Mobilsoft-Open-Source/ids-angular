import { TABLE_EXAMPLE_INTL_PROVIDER } from '../table-example-intl';
import {
  createTableExampleColumnDefs,
  TABLE_EXAMPLE_ROWS,
  TableExampleRow,
} from '../table-example.utils';

import { Component } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsTableCellTemplateDirective, IdsTableComponent } from '@i-cell/ids-angular/table';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-table-custom-cell-templates-example',
  imports: [
    IdsIconComponent,
    IdsTableComponent,
    IdsTableCellTemplateDirective,
    TranslateModule,
  ],
  templateUrl: './table-custom-cell-templates-example.component.html',
  styleUrl: './table-custom-cell-templates-example.component.scss',
  viewProviders: [TABLE_EXAMPLE_INTL_PROVIDER],
})
export class TableCustomCellTemplatesExampleComponent {
  protected readonly _columnDefs = createTableExampleColumnDefs().map((col) => {
    if (col.id === 'name') {
      return { ...col, headerCellRenderer: 'nameHeader', cellRenderer: 'nameCell' };
    }

    if (col.id === 'status') {
      return { ...col, headerCellRenderer: 'statusHeader', cellRenderer: 'statusCell' };
    }

    return col;
  });

  protected readonly _dataSource = TABLE_EXAMPLE_ROWS;

  protected _statusClass(row: TableExampleRow): string {
    return row.status === 'Active'
      ? 'table-custom-cell-templates__status--active'
      : 'table-custom-cell-templates__status--inactive';
  }
}
