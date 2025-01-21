import { PeriodicTableElement } from './periodic-table-element';

import { environment } from '../../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { compare } from '@i-cell/ids-angular/core';
import { IdsTableRequestPaginationData, IdsTableResponseData, IdsTableSortDirection, IdsTableSortInfo } from '@i-cell/ids-angular/table';
import { map, Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TableDemoService {
  private _http = inject(HttpClient);

  public getPeriodicTable(paginationData: IdsTableRequestPaginationData | null, sortInfo: IdsTableSortInfo | null):
  Observable<IdsTableResponseData<PeriodicTableElement>> {
    // eslint-disable-next-line no-magic-numbers
    const rows = paginationData?.rows || 10;
    const page = paginationData?.page || 1;

    return this._http.get<{ elements: PeriodicTableElement[] }>(`${environment.baseUrl}/assets/json/periodic-table.json`).pipe(
      map((result) => ({
        resultList: result.elements,
        paginationParams: {
          totalRows: result.elements.length,
          rows,
          page,
        },
      })),
      map((result) => {
        // Sorting
        if (sortInfo && sortInfo.sortBy && sortInfo.direction !== IdsTableSortDirection.NONE) {
          result.resultList.sort((item1, item2) => {
            const isAscending = sortInfo.direction === IdsTableSortDirection.ASC;
            const value1 = this._getPropValue(item1, sortInfo.sortBy);
            const value2 = this._getPropValue(item2, sortInfo.sortBy);

            return compare(isAscending ? value1 : value2, isAscending ? value2 : value1);
          });
        }

        // Paging
        const startIndex = (page - 1) * rows;
        result.resultList = (startIndex < result.resultList.length) ? result.resultList.slice(startIndex, startIndex + rows) : [];

        return result;
      }),
    );
  }

  private _getPropValue(obj: object, propName: string): unknown {
    return Object.hasOwn(obj, propName) ? (obj as unknown as Record<string, unknown>)[propName] : '';
  }
}
