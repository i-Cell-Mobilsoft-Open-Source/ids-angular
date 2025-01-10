import { PeriodicTableElement } from './periodic-table-element';
import { TableDemoService } from './table-demo.service';

import { AsyncPipe, JsonPipe } from '@angular/common';
import { Component, inject, ViewEncapsulation } from '@angular/core';
import { IdsPaginatorComponent } from '@i-cell/ids-angular/paginator';
import { IdsTableCellRenderer, IdsTableCellTemplateDirective, IdsTableColumnDef, IdsTableComponent, IdsTableRequestFactory, ServerSideDataSource } from '@i-cell/ids-angular/table';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'ids-table-translate-cell-renderer',
  standalone: true,
  imports: [TranslateModule],
  template: '{{ cellValue() | translate }}',
})
export class TranslateCellRendererComponent extends IdsTableCellRenderer<PeriodicTableElement> {}

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [
    AsyncPipe,
    IdsPaginatorComponent,
    IdsTableCellTemplateDirective,
    IdsTableComponent,
    TranslateModule,
    JsonPipe,
  ],
  templateUrl: './table-demo.component.html',
  styleUrl: './table-demo.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TableDemoComponent {
  private _tableDemoService = inject(TableDemoService);
  private _requestFactory: IdsTableRequestFactory<PeriodicTableElement> =
    (paginationData, sortInfo) => this._tableDemoService.getPeriodicTable(paginationData, sortInfo);

  protected _dataSource = new ServerSideDataSource(this._requestFactory);

  protected _colDefs: IdsTableColumnDef<PeriodicTableElement>[] = [
    {
      id: 'name',
      label: 'TABLE.COL.NAME',
      headerCellRenderer: 'translate1',
      field: 'name',
      sticky: true,
      sortable: true,
      orderName: 'name',
    },
    {
      id: 'symbol',
      label: 'TABLE.COL.SYMBOL',
      headerCellRenderer: 'translate2',
      cellRenderer: 'symbol',
    },
    {
      id: 'number',
      label: 'TABLE.COL.NUMBER',
      headerCellRenderer: TranslateCellRendererComponent,
      field: 'number',
    },
    {
      id: 'atomicMass',
      label: 'TABLE.COL.ATOMIC_MASS',
      headerCellRenderer: TranslateCellRendererComponent,
      value: (rowData) => rowData.atomicMass,
      cellRenderer: 'numeric',
      sortable: true,
      orderName: 'atomicMass',
    },
    {
      id: 'melt',
      label: 'TABLE.COL.MELT',
      headerCellRenderer: TranslateCellRendererComponent,
      value: (rowData) => (rowData.melt ? `${rowData.melt} K` : ''),
    },
    {
      id: 'summary',
      label: 'TABLE.COL.SUMMARY',
      field: 'summary',
      visible: false,
    },
  ];

  protected _hasDetailRow(index: number, rowData: PeriodicTableElement): boolean {
    return !!rowData.summary;
  }
}
