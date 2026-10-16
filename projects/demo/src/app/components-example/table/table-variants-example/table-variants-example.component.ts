import { TABLE_EXAMPLE_INTL_PROVIDER } from '../table-example-intl';
import {
  createTableExampleColumnDefs,
  TABLE_EXAMPLE_ROWS,
} from '../table-example.utils';

import { Component } from '@angular/core';
import { IdsTableCellTemplateDirective, IdsTableComponent } from '@i-cell/ids-angular/table';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-table-variants-example',
  imports: [
    IdsTableComponent,
    IdsTableCellTemplateDirective,
    TranslateModule,
  ],
  templateUrl: './table-variants-example.component.html',
  viewProviders: [TABLE_EXAMPLE_INTL_PROVIDER],
})
export class TableVariantsExampleComponent {
  protected readonly _columnDefs = createTableExampleColumnDefs();
  protected readonly _dataSource = TABLE_EXAMPLE_ROWS;
}
