import { IdsTableCellRenderer } from '../directives/cell-renderer';

import { Type } from '@angular/core';

/**
 * Column definition type for the i-DS table component.
 */
export type IdsTableColumnDef<D> = {
  /**
   * Unique column identifier literal (mandatory).
   */
  id: string;

  /**
   * Column label displayed in the header cell. If no label is provided a custom cell renderer is needed to display a proper column header.
   */
  label?: string;

  /**
   * Name of the data model object property to display in the column's cell.
   */
  field?: string;

  /**
   * Value getter function called by a cell renderer, provides the value to be displayed in the cell.
   */
  value?: ((rowData: D) => unknown);

  /**
   * The header cell's renderer either built-in or external template or component.
   * Currently the following built-in renderers are available:
   * - 'strong': the label is displayed in a <strong> tag,
   * - 'numeric': the label is displayed in a localized number format,
   * - 'icon': IDS Font ligature displayes as an icon
   * If no renderer is provided or the given literal does not match any of the built-in or external cell renderer names, the cell's value is displayed as a plain string.
   *
   * Both renderer types get references to the row data, the column definition and a calculated cell value.
   * A component renderer gets these through its inputs (see {@link IdsTableCellRenderer}), while a template renderer through its context:
   * row data is implicit, `colData` provides the column metadata, `cellValue` provides the cell's value, eg.:
   * ```html
   * <span *idsCellTemplate="'myTemplate'; let row">{{ row.myProp }}</span>
   *
   * <!-- or -->
   *
   * <ng-template let-colData="colData" let-value="cellValue" idsCellTemplate="myTemplate2">
   *   <span>Value of {{ colData.field }} is: {{ value }}</span>
   * </ng-template>
   * ```
   */
  headerCellRenderer?: string | Type<IdsTableCellRenderer<D>>;

  /**
   * The data cells' renderer, either built-in or external template or component.
   * Currently the following built-in renderers are available:
   * - 'strong': the label is displayed in a <strong> tag,
   * - 'numeric': the label is displayed in a localized number format,
   * - 'icon': IDS Font ligature displayes as an icon
   * If no renderer is provided or the given literal does not match any of the built-in or external cell renderer names, the cell's value is displayed as a plain string.
   *
   * Both renderer types get references to the row data, the column definition and a calculated cell value.
   * A component renderer gets these through its inputs (see {@link IdsTableCellRenderer}), while a template renderer through its context:
   * row data is implicit, `colData` provides the column metadata, `cellValue` provides the cell's value, eg.:
   * ```html
   * <span *idsCellTemplate="'myTemplate'; let row">{{ row.myProp }}</span>
   *
   * <!-- or -->
   *
   * <ng-template let-colData="colData" let-value="cellValue" idsCellTemplate="myTemplate2">
   *   <span>Value of {{ colData.field }} is: {{ value }}</span>
   * </ng-template>
   * ```
   */
  cellRenderer?: string | Type<IdsTableCellRenderer<D>>;

  /**
   * Defines if the column is hideable (column visibility feature coming soon...).
   */
  hideable?: boolean;

  /**
   * Defines if the column is visible. If used with hideable, the column will be in the column menu unchecked.
   */
  visible?: boolean;

  sortable?: boolean;

  orderName?: string;

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
