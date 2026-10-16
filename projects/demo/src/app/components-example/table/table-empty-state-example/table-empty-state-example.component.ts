import { TABLE_EXAMPLE_INTL_PROVIDER } from '../table-example-intl';
import { createTableExampleColumnDefs, TableExampleRow } from '../table-example.utils';

import { Component } from '@angular/core';
import { IdsTableCellTemplateDirective, IdsTableComponent } from '@i-cell/ids-angular/table';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-table-empty-state-example',
  imports: [
    IdsTableCellTemplateDirective,
    IdsTableComponent,
    TranslateModule,
  ],
  templateUrl: './table-empty-state-example.component.html',
  viewProviders: [TABLE_EXAMPLE_INTL_PROVIDER],
})
export class TableEmptyStateExampleComponent {
  protected readonly _columnDefs = createTableExampleColumnDefs();
  protected readonly _dataSource: TableExampleRow[] = [];
}
