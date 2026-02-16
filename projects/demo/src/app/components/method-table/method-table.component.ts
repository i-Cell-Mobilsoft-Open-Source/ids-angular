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
  public config = input.required<DemoMethodConfig<unknown>[]>();

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
    let data: MethodTableElement[] = [];

    const cfg = this.config();

    if (Array.isArray(cfg)) {
      data = cfg.flatMap((config) => this._transformConfigToRows(config));
    } else {
      data = this._transformConfigToRows(cfg);
    }

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

  private _transformConfigToRows(config: DemoMethodConfig<unknown>): MethodTableElement[] {
    type ControlItem = {
      name: string;
      // list?: string[];
      returnType?: string;
      description?: string;
      default?: unknown;
      parameters?: string[];
      parameterTypes?: string[];
      parameterDescriptions?: string[];
    };

    if (Array.isArray(config)) {
      return config.flatMap((conf) => this._transformConfigToRows(conf));
    }

    if (!config || typeof config !== 'object') {
      return [];
    }

    return Object.entries(config as Record<string, ControlItem>).map(([
      ,
      item,
    ]) => ({
      name: item.name,
      description: item.description || '',
      returnType: item.returnType || '',
      parameters: item.parameters || [],
      parameterTypes: item.parameterTypes || [],
      parameterDescriptions: item.parameterDescriptions || [],
    }));
  }

  protected _isArray(value: unknown): value is string[] {
    return Array.isArray(value);
  }

}
