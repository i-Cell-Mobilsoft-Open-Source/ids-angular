import { IdsTableColumnDef } from '../types/table-column-def';

import { Directive, input, Type } from '@angular/core';
import { isString, isTypeDerivedFrom } from '@i-cell/ids-angular/core';

@Directive()
export abstract class IdsTableCellRenderer<D> {
  private readonly _entities = [
    { rx: '&', entity: '&amp;' },
    { rx: '<', entity: '&lt;' },
    { rx: '>', entity: '&gt;' },
    { rx: '"', entity: '&quot;' },
    { rx: '\'', entity: '&#x27;' },
    { rx: '/', entity: '&#x2F;' },
  ];

  public cellValue = input('', { transform: (value) => this._preSanitize(String(value ?? '')) });
  public colDef = input.required<IdsTableColumnDef<D>>();
  public rowData = input<D>();

  protected _isComponentCellRenderer<C>(cellRendererDef: string | Type<C> | undefined):
  cellRendererDef is Type<C> {
    return !!cellRendererDef && !isString(cellRendererDef) && isTypeDerivedFrom(cellRendererDef, IdsTableCellRenderer);
  }

  protected _preSanitize(input: string): string {
    if (!input) {
      return input;
    }

    // Convert & to &amp;, Convert < to &lt;, Convert > to &gt;, Convert " to &quot;, Convert ' to &#x27;, Convert / to &#x2F;
    return this._entities.reduce((result, item) => result.replaceAll(item.rx, item.entity), input);
  }
}
