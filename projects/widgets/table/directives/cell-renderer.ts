import { IdsTableColumnDef } from '../types/table-column-def';

import { Directive, input, Type } from '@angular/core';
import { isString, isTypeDerivedFrom } from '@i-cell/ids-angular/core';

@Directive()
export abstract class IdsTableCellRenderer<D> {
  public cellValue = input('', { transform: (value) => String(value ?? '') });
  public colDef = input.required<IdsTableColumnDef<D>>();
  public rowData = input<D>();

  protected _isComponentCellRenderer<C>(cellRendererDef: string | Type<C> | undefined):
  cellRendererDef is Type<C> {
    return !!cellRendererDef && !isString(cellRendererDef) && isTypeDerivedFrom(cellRendererDef, IdsTableCellRenderer);
  }
}
