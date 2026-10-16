import { TABLE_EXAMPLE_INTL_PROVIDER } from '../table-example-intl';
import {
  createTableExampleColumnDefs,
  TABLE_EXAMPLE_ROWS,
  TableExampleRow,
} from '../table-example.utils';

import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsTableCellTemplateDirective, IdsTableComponent } from '@i-cell/ids-angular/table';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-table-master-detail-example',
  imports: [
    IdsButtonComponent,
    IdsTableComponent,
    IdsTableCellTemplateDirective,
    TranslateModule,
  ],
  templateUrl: './table-master-detail-example.component.html',
  styleUrl: './table-master-detail-example.component.scss',
  viewProviders: [TABLE_EXAMPLE_INTL_PROVIDER],
})
export class TableMasterDetailExampleComponent {
  protected readonly _columnDefs = createTableExampleColumnDefs();
  protected readonly _dataSource = TABLE_EXAMPLE_ROWS;

  protected _hasDetailRow = (_index: number, row: TableExampleRow): boolean => !!row.description;
}
