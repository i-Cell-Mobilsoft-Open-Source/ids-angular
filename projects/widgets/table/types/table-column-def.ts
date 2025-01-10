import { IdsTableCellRenderer } from '../directives/cell-renderer';

import { Type } from '@angular/core';

// FIXME: remove if unused
// type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };
// type XOR<T, U> = (T | U) extends object ? (Without<T, U> & U) | (Without<U, T> & T) : T | U;

export type IdsTableColumnDef<D> = {
  /**
   * Unique column identifier literal
   */
  id: string;

  /**
   * Column label displayed in the header cell
   */
  label?: string;

  field?: string;

  value?: ((rowData: D) => unknown);

  /**
   * The header cell's renderer either built-in or external template or component.
   * Currently the following built-in renderers are available:
   * - 'strong': the label is displayed in a <strong> tag,
   * - 'numeric': the label is displayed in a localized number format,
   * - 'icon': IDS Font ligature displayes as an icon
   * If no renderer is provided or the given literal does not match any of the above, the cell's value is displayed as a plain string.
   */
  headerCellRenderer?: string | Type<IdsTableCellRenderer<D>>;

  /**
   * The data cells' renderer either built-in or external template or component.
   * Currently the following built-in renderers are available:
   * - 'strong': the label is displayed in a <strong> tag,
   * - 'numeric': the label is displayed in a localized number format,
   * - 'icon': IDS Font ligature displayes as an icon
   * If no renderer is provided or the given literal does not match any of the above, the cell's value is displayed as a plain string.
   */
  cellRenderer?: string | Type<IdsTableCellRenderer<D>>;

  /**
   * Defines if the column is hideable.
   */
  hideable?: boolean;

  /**
   * Defines if the column is visible. If used with hideable, the column will be in the column menu unchecked.
   */
  visible?: boolean;

  sortable?: boolean;

  orderName?: string;

  /**
   * Defines if the column is for actions.
   */
  actionColumn?: boolean;

  /**
   * Defines if the column should be sticky at the begining of the table.
   */
  sticky?: boolean;

  /**
   * Defines if the column should be sticky at the end of the table.
   */
  stickyEnd?: boolean;

  /**
   * Defines if the cell should render as header for a11y reasons.
   */
  identifier?: boolean;

  /**
   * Defines custom `CSS` class for the column it self.
   */
  columnClasses?: string;

  /**
   * Defines custom `CSS` class for the column cells.
   */
  cellClasses?: string;
};
