import { TABLE_EXAMPLE_INTL_PROVIDER } from '../table-example-intl';
import {
  createTableExampleColumnDefs,
  TABLE_EXAMPLE_ROWS,
  TableExampleRow,
} from '../table-example.utils';

import { Component } from '@angular/core';
import { IdsTableCellTemplateDirective, IdsTableComponent } from '@i-cell/ids-angular/table';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-table-row-selection-example',
  imports: [
    IdsTableComponent,
    IdsTableCellTemplateDirective,
    TranslateModule,
  ],
  templateUrl: './table-row-selection-example.component.html',
  viewProviders: [TABLE_EXAMPLE_INTL_PROVIDER],
})
export class TableRowSelectionExampleComponent {
  protected readonly _columnDefs = createTableExampleColumnDefs();
  protected readonly _dataSource = TABLE_EXAMPLE_ROWS;

  protected _isRowSelectable = (_index: number, row: TableExampleRow): boolean => row.status !== 'Inactive';
}
