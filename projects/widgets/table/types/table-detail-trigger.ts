import { IdsTableColumnDef } from './table-column-def';

export interface IdsTableDetailTrigger {
  readonly expanded: boolean;
  readonly hasDetailRow: boolean;
  readonly ariaLabel: string;
  readonly toggle: () => void;
}

export interface IdsTableDetailCellContext<D> {
  $implicit: D;
  index: number;
  colDef: IdsTableColumnDef<D> | null;
  cellValue: unknown;
  detail: IdsTableDetailTrigger;
}
