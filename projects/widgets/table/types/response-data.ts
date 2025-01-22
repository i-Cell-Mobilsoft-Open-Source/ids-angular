import { IdsTablePaginationParams } from './pagination-params';

export interface IdsTableResponseData<D> {
  resultList: D[];
  paginationParams: IdsTablePaginationParams;
}
