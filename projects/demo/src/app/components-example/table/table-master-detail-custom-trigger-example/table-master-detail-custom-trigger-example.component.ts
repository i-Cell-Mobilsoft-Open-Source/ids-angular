import { TABLE_EXAMPLE_INTL_PROVIDER } from '../table-example-intl';
import {
  createTableExampleColumnDefs,
  TABLE_EXAMPLE_ROWS,
  TableExampleRow,
} from '../table-example.utils';

import { Component } from '@angular/core';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import {
  IdsTableCellTemplateDirective,
  IdsTableComponent,
  IdsTableDetailTriggerDirective,
  IdsTableDetailTriggerMode,
  IdsTableDetailTogglePosition,
} from '@i-cell/ids-angular/table';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-table-master-detail-custom-trigger-example',
  imports: [
    IdsButtonComponent,
    IdsTableCellTemplateDirective,
    IdsTableComponent,
    IdsTableDetailTriggerDirective,
    TranslateModule,
  ],
  templateUrl: './table-master-detail-custom-trigger-example.component.html',
  styleUrl: './table-master-detail-custom-trigger-example.component.scss',
  viewProviders: [TABLE_EXAMPLE_INTL_PROVIDER],
})
export class TableMasterDetailCustomTriggerExampleComponent {
  protected readonly _columnDefs = createTableExampleColumnDefs();
  protected readonly _dataSource = TABLE_EXAMPLE_ROWS;
  protected readonly _detailTriggerTemplateName = 'statusDetailTrigger';
  protected readonly _masterDetailToggleColumnId = 'status';
  protected readonly _masterDetailTogglePosition = IdsTableDetailTogglePosition.AFTER;
  protected readonly _masterDetailTriggerMode = IdsTableDetailTriggerMode.CUSTOM;

  protected _hasDetailRow = (_index: number, row: TableExampleRow): boolean => !!row.description;
}
