import { MethodTableElement } from './method-table-elements';

import { Component, input, OnInit } from '@angular/core';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { IdsTableCellTemplateDirective, IdsTableColumnDef, IdsTableComponent, IdsTableRequestFactory, ServerSideDataSource } from '@i-cell/ids-angular/table';
import { of } from 'rxjs';

@Component({
  selector: 'app-method-table',
  imports: [
    IdsTableComponent,
    IdsTableCellTemplateDirective,
  ],
  templateUrl: './method-table.component.html',
  styleUrl: './method-table.component.scss',
})
export class MethodTableComponent implements OnInit {
  public config = input.required<DemoMethodConfig>();

  protected _dataSource: ServerSideDataSource<MethodTableElement>;

  public colDefs: IdsTableColumnDef<MethodTableElement>[] = [
    {
      id: 'name',
      label: 'Method name',
      field: 'name',
    },
    {
      id: 'returnType',
      label: 'Return type',
      field: 'returnType',
    },
    {
      id: 'description',
      label: 'Description',
      field: 'description',
    },
    {
      id: 'parameters',
      label: 'Parameter',
      field: 'parameters',
      cellRenderer: 'valueListTemplate',
    },
    {
      id: 'parameterTypes',
      label: 'Parameter type',
      field: 'parameterTypes',
      cellRenderer: 'valueListTemplate',
    },
    {
      id: 'parameterDescriptions',
      label: 'Parameter description',
      field: 'parameterDescriptions',
      cellRenderer: 'valueListTemplate',
    },
  ];

  constructor() {
    this._dataSource = new ServerSideDataSource(() =>
      of({
        resultList: [] as MethodTableElement[],
        paginationParams: { totalRows: 0, rows: 100, page: 1 },
      }),
    );
  }

  public ngOnInit(): void {
    this._updateDataSource();
  }

  private _updateDataSource(): void {
    const data: MethodTableElement[] = Array.isArray(this.config()) ? this.config() : [];
    const requestFactory: IdsTableRequestFactory<MethodTableElement> = () =>
      of({
        resultList: data,
        paginationParams: {
          totalRows: data.length,
          rows: data.length,
          page: 1,
        },
      });

    this._dataSource = new ServerSideDataSource(requestFactory);
    this._dataSource.refreshData();
  }

  protected _isArray(value: unknown): value is string[] {
    return Array.isArray(value);
  }
}
