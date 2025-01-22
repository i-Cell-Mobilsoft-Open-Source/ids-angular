import { IdsTableRequestPaginationData } from './request-pagination-data';
import { IdsTableResponseData } from './response-data';
import { IdsTableSortInfo } from './table-sort-info';

import { Observable } from 'rxjs';

export type IdsTableRequestFactory<D> =
  (paginationData: IdsTableRequestPaginationData | null, sortInfo: IdsTableSortInfo | null) => Observable<IdsTableResponseData<D>>;
