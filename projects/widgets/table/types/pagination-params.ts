export interface IdsTablePaginationParams {
  /** The total number of items in the result list */
  totalRows: number;
  /** The highest page index number */
  // maxPage?: number;
  /** The number of items per page */
  rows: number;
  /** The index number of the current page */
  page: number;
}
