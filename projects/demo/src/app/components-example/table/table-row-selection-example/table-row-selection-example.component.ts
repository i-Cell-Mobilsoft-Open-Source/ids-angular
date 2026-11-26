import { TABLE_EXAMPLE_INTL_PROVIDER } from '../table-example-intl';
import {
  createTableExampleColumnDefs,
  TABLE_EXAMPLE_ROWS,
  TableExampleRow,
} from '../table-example.utils';

import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IdsSizeType, IdsSize } from '@i-cell/ids-angular/core';
import { IdsLabelDirective, IdsFormFieldComponent, IdsOptionComponent } from '@i-cell/ids-angular/forms';
import { IdsSelectComponent } from '@i-cell/ids-angular/select';
import { IdsTableCellTemplateDirective, IdsTableComponent } from '@i-cell/ids-angular/table';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-table-row-selection-example',
  imports: [
    FormsModule,
    IdsFormFieldComponent,
    IdsOptionComponent,
    IdsLabelDirective,
    IdsSelectComponent,
    IdsTableCellTemplateDirective,
    IdsTableComponent,
    TranslateModule,
  ],
  templateUrl: './table-row-selection-example.component.html',
  viewProviders: [TABLE_EXAMPLE_INTL_PROVIDER],
})
export class TableRowSelectionExampleComponent {
  protected readonly _columnDefs = createTableExampleColumnDefs();
  protected readonly _dataSource = TABLE_EXAMPLE_ROWS;
  protected readonly _sizes = Object.values(IdsSize);
  protected _rowSelectorCheckboxSize: IdsSizeType | null = null;

  protected _isRowSelectable = (_index: number, row: TableExampleRow): boolean => row.status !== 'Inactive';
}
