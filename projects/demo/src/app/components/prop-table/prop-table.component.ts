import { PropTableElement } from './prop-table-element';

import { CommonModule } from '@angular/common';
import { Component, input, OnInit, ViewEncapsulation } from '@angular/core';
import { DemoControlConfig } from '@demo-types/demo-control.type';
import { IdsTableCellTemplateDirective, IdsTableColumnDef, IdsTableComponent, IdsTableRequestFactory, ServerSideDataSource } from '@i-cell/ids-angular/table';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';

@Component({
  selector: 'app-prop-table',
  templateUrl: './prop-table.component.html',
  imports: [
    CommonModule,
    IdsTableComponent,
    IdsTableCellTemplateDirective,
    TranslateModule,
  ],
  styleUrls: ['./prop-table.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PropTableComponent implements OnInit {
  public config = input.required<DemoControlConfig<unknown>[]>();

  protected _dataSource: ServerSideDataSource<PropTableElement>;

  public colDefs: IdsTableColumnDef<PropTableElement>[] = [
    {
      id: 'name',
      label: 'Prop name',
      field: 'name',
    },
    {
      id: 'description',
      label: 'Description',
      field: 'description',
    },
    {
      id: 'type',
      label: 'Type',
      field: 'type',
    },
    {
      id: 'values',
      label: 'Value',
      field: 'values',
      cellRenderer: 'valueListTemplate',
    },
    {
      id: 'default',
      label: 'Default',
      field: 'default',
    },
  ];

  constructor() {
    this._dataSource = new ServerSideDataSource(() => of({
      resultList: [] as PropTableElement[],
      paginationParams: { totalRows: 0, rows: 100, page: 1 },
    }));
  }

  public ngOnInit(): void {
    this._updateDataSource();
  }

  private _updateDataSource(): void {
    let data: PropTableElement[] = [];

    const cfg = this.config();

    if (Array.isArray(cfg)) {
      data = cfg.flatMap((config) => this._transformConfigToRows(config));
    } else {
      data = this._transformConfigToRows(cfg);
    }

    const requestFactory: IdsTableRequestFactory<PropTableElement> = () => of({
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

  private _transformConfigToRows(config: DemoControlConfig<unknown>): PropTableElement[] {
    type ControlItem = {
      list?: string[];
      type?: string;
      description?: string;
      default?: unknown;
    };

    return Object.entries(config as Record<string, ControlItem>).map(([
      key,
      item,
    ]) => {
      let values: string[] = [];

      if (item.list) {
        values = item.list;
      } else if (item.type === 'boolean') {
        values = [
          'true',
          'false',
        ];
      } else if (!item.list) {
        values = ['-'];
      }

      return {
        name: key,
        description: item.description || '',
        type: item.type,
        values: values,
        default: item.default === undefined ? undefined : String(item.default),
      };
    });
  }
}
