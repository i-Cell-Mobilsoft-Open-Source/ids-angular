import { IdsTableColumnDef } from './table-column-def';

export interface IdsTableCellClickEvent<D> {
  event: MouseEvent;
  colDef: IdsTableColumnDef<D>;
  rowData: D;
}
