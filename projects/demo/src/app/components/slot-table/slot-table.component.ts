import { SlotTableElement } from './slot-table-element';

import { Component, effect, input, Signal, ViewEncapsulation } from '@angular/core';
import { DemoSlotConfig } from '@demo-types/demo-slot.type';
import {
  IdsTableColumnDef,
  IdsTableComponent,
  IdsTableRequestFactory,
  ServerSideDataSource,
} from '@i-cell/ids-angular/table';
import { of } from 'rxjs';

@Component({
  selector: 'app-slot-table',
  templateUrl: './slot-table.component.html',
  imports: [IdsTableComponent],
  encapsulation: ViewEncapsulation.None,
})
export class SlotTableComponent {
  public config = input.required<DemoSlotConfig>();

  protected _dataSource: ServerSideDataSource<SlotTableElement>;

  public colDefs: IdsTableColumnDef<SlotTableElement>[] = [
    {
      id: 'name',
      label: 'Slot name',
      field: 'name',
    },
    {
      id: 'selector',
      label: 'Selector',
      field: 'selector',
    },
    {
      id: 'description',
      label: 'Description',
      field: 'description',
    },
  ];

  constructor() {
    this._dataSource = new ServerSideDataSource(() =>
      of({
        resultList: [] as SlotTableElement[],
        paginationParams: { totalRows: 0, rows: 100, page: 1 },
      }),
    );

    effect(() => this._updateDataSource());
  }

  private _resolveDescription(description: string | Signal<string>): string {
    return typeof description === 'function' ? description() : description;
  }

  private _updateDataSource(): void {
    const data: SlotTableElement[] = (this.config() ?? []).map((item) => ({
      name: item.name,
      selector: item.selector ?? '-',
      description: this._resolveDescription(item.description),
    }));

    const requestFactory: IdsTableRequestFactory<SlotTableElement> = () =>
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
}
