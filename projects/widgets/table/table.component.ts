import { IdsCellContentComponent } from './components/cell-content/cell-content.component';
import { IdsTableCellTemplateDirective } from './directives/cell-template';
import { RowInfoHolderDirective } from './directives/row-info-holder';
import { DEFAULT_MASTER_DETAIL_TEMPLATE_NAME, IDS_TABLE_DEFAULT_CONFIG, IDS_TABLE_DEFAULT_CONFIG_FACTORY, IdsTableDefaultConfig } from './table-defaults';
import { IdsTableIntl } from './table-intl';
import { IdsTableAppearance, IdsTableAppearanceType } from './types/table-appearance.type';
import { IdsTableCellClickEvent } from './types/table-cell-click-event';
import { IdsTableColumnDef } from './types/table-column-def';
import { IdsTableRowClickEvent } from './types/table-row-click-event';
import { IdsTableRowKeydownEvent } from './types/table-row-keydown-event';
import { IdsTableSortDirection, IdsTableSortDirectionType } from './types/table-sort-direction';
import { IdsTableSortInfo } from './types/table-sort-info';
import { IdsTableVariant, IdsTableVariantType } from './types/table-variant.type';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkCell, CdkCellDef, CdkColumnDef, CdkHeaderCell, CdkHeaderCellDef, CdkHeaderRow, CdkHeaderRowDef, CdkNoDataRow, CdkRow, CdkRowDef, CdkTable, CdkTableDataSourceInput } from '@angular/cdk/table';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, contentChildren, inject, input, OnInit, output, signal, TemplateRef, viewChildren, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { IdsCheckboxComponent } from '@i-cell/ids-angular/checkbox';
import { coerceBooleanAttribute, ComponentBaseWithDefaults, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IDS_ICON_BUTTON_PARENT, IdsIconButtonAppearance, IdsIconButtonAppearanceType, IdsIconButtonComponent, IdsIconButtonParent, IdsIconButtonVariant, IdsIconButtonVariantType } from '@i-cell/ids-angular/icon-button';

const defaultConfig = IDS_TABLE_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-table',
  standalone: true,
  imports: [
    IdsCellContentComponent,
    IdsCheckboxComponent,
    IdsIconComponent,
    IdsIconButtonComponent,
    IdsTableCellTemplateDirective,
    CdkCell,
    CdkCellDef,
    CdkColumnDef,
    CdkHeaderCell,
    CdkHeaderCellDef,
    CdkHeaderRow,
    CdkHeaderRowDef,
    CdkNoDataRow,
    CdkRow,
    CdkRowDef,
    CdkTable,
    NgClass,
    NgTemplateOutlet,
    RowInfoHolderDirective,
  ],
  templateUrl: './table.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed', animate('200ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
  providers: [{ provide: IDS_ICON_BUTTON_PARENT, useExisting: IdsTableComponent }],
  exportAs: 'idsTable',
})
export class IdsTableComponent<D>
  extends ComponentBaseWithDefaults<IdsTableDefaultConfig> implements IdsIconButtonParent, OnInit {

  private readonly _sortDirections: IdsTableSortDirectionType[] = [
    '',
    'asc',
    'desc',
  ];

  protected readonly _appearanceZebra = IdsTableAppearance.ZEBRA;
  protected readonly _defaultMasterDetailTemplateName = DEFAULT_MASTER_DETAIL_TEMPLATE_NAME;
  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_TABLE_DEFAULT_CONFIG);

  private _cdRef = inject(ChangeDetectorRef);
  protected _intl = inject(IdsTableIntl);

  private _viewCellTemplates = viewChildren(IdsTableCellTemplateDirective);
  private _rowDataHolders = viewChildren(RowInfoHolderDirective<D>);
  private _selectorCheckboxes = viewChildren(IdsCheckboxComponent);
  private _cellContentRenderers = viewChildren(IdsCellContentComponent<D>);
  private _contentCellTemplates = contentChildren(IdsTableCellTemplateDirective);

  public columnDefs = input.required<IdsTableColumnDef<D>[]>();
  public dataSource = input.required<CdkTableDataSourceInput<D>>();
  /** Flag to have sticky header. */
  public fixedHeader = input<boolean, unknown>(this._defaultConfig.fixedHeader, { transform: coerceBooleanAttribute });
  /** Enable sorting feature */
  public enableSorting = input<boolean, unknown>(this._defaultConfig.enableSorting, { transform: coerceBooleanAttribute });
  /** Enable master-detail rows */
  public masterDetail = input<boolean, unknown>(this._defaultConfig.masterDetail, { transform: coerceBooleanAttribute });
  /** Name of the detail row renderer template */
  public detailTemplateName = input(this._defaultConfig.detailTemplateName);
  /** If true the detail cell will not span sticky and stickyEnd columns. If false the detail cell will span the table's full width */
  public detailStickyColumns = input<boolean, unknown>(this._defaultConfig.detailStickyColumns, { transform: coerceBooleanAttribute });
  /** Whether to show the master-detail column label or not. */
  public showDetailHeader = input<boolean, unknown>(this._defaultConfig.showDetailHeader, { transform: coerceBooleanAttribute });
  /** Predicate function to decide whether a data row has details or not */
  public hasDetailRow = input<(index: number, data: D) => boolean>(() => false);
  /** Enable row selection feature */
  public enableRowSelection = input<boolean, unknown>(this._defaultConfig.enableRowSelection, { transform: coerceBooleanAttribute });
  /** Clear row selection if the table's content changes */
  public clearSelectionOnChange = input<boolean, unknown>(this._defaultConfig.clearSelectionOnChange,
    { transform: coerceBooleanAttribute });

  /** Predicate function to decide whether a row can be selected or not */
  public isRowSelectable = input<(index: number, data: D) => boolean>(() => true);
  /** Render "no rows to show" overlay below the table instead of as a row */
  public noRowsToShowOverlayBelow = input<boolean, unknown>(this._defaultConfig.noRowsToShowOverlayBelow,
    { transform: coerceBooleanAttribute });
  /** Whether to show a border around the table or not. */

  public withBorder = input<boolean, unknown>(this._defaultConfig.withBorder, { transform: coerceBooleanAttribute });
  /**
   * The table's appearance type. Availabla options:
   * - "line-division": row backgrounds are uniformly colored and divided by thin border lines
   * - "zebra": the backgrounds of even and odd rows are different colors
   * - "plain": row backgrounds are uniformly colored without border lines
   */
  public appearance = input<IdsTableAppearanceType>(this._defaultConfig.appearance);
  /** The size type of the table. Affects paddings, margins, gaps, typography, etc. */
  public size = input<IdsSizeType>(this._defaultConfig.size);
  /** The color variant of the table. Availabla options: "primary", "secondary", "surface" */
  public variant = input<IdsTableVariantType>(this._defaultConfig.variant);

  /** Emits if the column sorting has changed */
  public sortChange = output<IdsTableSortInfo | null>();
  /** Emits if the user clicked a cell */
  public cellClick = output<IdsTableCellClickEvent<D>>();
  /** Emits if the user clicked a row */
  public rowClick = output<IdsTableRowClickEvent<D>>();
  /** Emits if the user hits a key while a row is in focus */
  public rowKeydown = output<IdsTableRowKeydownEvent<D>>();
  /** Emits if the table's contents have changed */
  public contentChanged = output<void>();

  //#region IdsIconButtonParent implementation
  public embeddedIconButtonVariant = computed<IdsIconButtonVariantType>(() => {
    const tableVariant = this.variant();
    switch (tableVariant) {
      case IdsTableVariant.PRIMARY:
        return IdsIconButtonVariant.LIGHT;
      default:
        return tableVariant;
    }
  });

  public embeddedIconButtonAppearance = signal<IdsIconButtonAppearanceType>(IdsIconButtonAppearance.STANDARD);
  public disabled = signal<boolean>(false);
  //#endregion

  /** Signal that holds the current table contents as an array of objects */
  public rowData = computed(() => {
    const dataHolders = this._rowDataHolders();

    if (!dataHolders?.length) {
      return [];
    }

    try {
      // try-catch for now to avoid "NG0950: Input is required but no value is available yet. Find more at https://angular.dev/errors/NG0950" at "holder.rowInfo()"
      return dataHolders
        .map((holder) => holder.rowInfo())
        .sort((data1, data2) => data1.index - data2.index)
        .map((data) => data.rowData);
    } catch {
      return [];
    }
  });

  /** The row selection model for the table */
  public rowSelection: SelectionModel<D> = new SelectionModel<D>(true, [], true);

  protected _expandedRows = new Set<D>();
  protected _allRowsExpanded = signal<boolean>(false);

  protected _sortState = signal<IdsTableSortInfo | null>(null);

  protected override get _hostName(): string {
    return 'table';
  }

  protected _hostClasses = computed(() => this._getHostClasses([
    this.appearance(),
    this.size(),
    this.variant(),
    (this.withBorder() ? 'with-border' : null),
  ]));

  protected _actualColumns = computed(() => {
    const cols = this.columnDefs()
      // Filter non-visible columns
      .filter((colDef) => (colDef.visible !== false))
      // Sort sticky columns to the beginning and stickyEnd columns to the end of the list
      .reduce<string[][]>(
        (acc, colDef) => {
          if (colDef.sticky) {
            // Sticky columns first
            acc[0].push(colDef.id);
          } else if (colDef.stickyEnd) {
            // StickyEnd columns last
            acc[2].push(colDef.id);
          } else {
            // The rest of the columns in between
            acc[1].push(colDef.id);
          }

          return acc;
        // eslint-disable-next-line @stylistic/js/array-bracket-newline, @stylistic/js/array-element-newline
        }, [[], [], []])
      .flat();

    if (this.masterDetail()) {
      cols.push('$masterDetail');
    }

    if (this.enableRowSelection()) {
      cols.unshift('$selectBoxes');
    }

    return cols;
  });

  protected _hiddenColumns = computed(() =>
    this.columnDefs()
      .filter((colDef) => (colDef.visible === false))
      .map((colDef) => ({ ...colDef, visible: true })),
  );

  protected _detailRowTemplates = computed(() => {
    if (!this.detailStickyColumns()) {
      return ['$expandedDetail'];
    }

    return [
      ...(this.enableRowSelection() ? ['$empty'] : []),
      ...this.columnDefs().filter((colDef) => colDef.sticky).map(() => '$empty'),
      '$expandedDetail',
      ...this.columnDefs().filter((colDef) => colDef.stickyEnd).map(() => '$emptyEnd'),
      ...(this.masterDetail() ? ['$emptyEnd'] : []),
    ];
  });

  protected _detailColSpan = computed(() => {
    const colDefs = this.columnDefs();
    let detailColSpan = colDefs.length;

    if (this.detailStickyColumns()) {
      detailColSpan = colDefs.filter((def) => (!def.sticky && !def.stickyEnd && def.visible !== false)).length;
    }

    return detailColSpan;
  });

  protected _cellTemplatesByName = computed(() => {
    const templateMap = new Map<string, TemplateRef<unknown>>();

    for (const cellTemplate of this._viewCellTemplates()) {
      templateMap.set(cellTemplate.templateName(), cellTemplate.templateRef);
    }
    for (const cellTemplate of this._contentCellTemplates()) {
      templateMap.set(cellTemplate.templateName(), cellTemplate.templateRef);
    }

    return templateMap;
  });

  protected _defaulDetailTemplate = computed(() =>
    this._viewCellTemplates().find((cellTemplate) => cellTemplate.templateName() === this._defaultMasterDetailTemplateName)?.templateRef,
  );

  protected _detailTemplate = computed(() => this._cellTemplatesByName().get(this.detailTemplateName()));

  protected _hasNoRows = computed<boolean>(() => this.rowData().length === 0);

  protected _masterDetailEnabled = computed(() =>
    this.masterDetail() && this._cellTemplatesByName().has(this._defaultMasterDetailTemplateName),
  );

  protected _unselectableRows = computed(() => {
    const rows = this.rowData();

    return new Set<D>(rows.filter((rowData, index) => !this.isRowSelectable()(index, rowData)));
  });

  private _rowSelectorCheckboxes = computed(() => {
    const disabledRows = this._unselectableRows();

    return this._selectorCheckboxes().filter((component) => {
      const value = component.value() as D;
      return value && !disabledRows.has(value);
    });
  });

  private _selectableRowData = computed(() => this._rowSelectorCheckboxes().map((component) => component.value() as D));

  private _rowSelectionChange = toSignal(this.rowSelection.changed);

  protected _isAllSelected = computed(() => {
    const selectionChange = this._rowSelectionChange();
    const data = this._selectableRowData();
    const disabledRows = this._unselectableRows();

    if (!selectionChange || !data) {
      return false;
    }

    const numSelected = selectionChange.source.selected.length;
    const activeRowCount = data.filter((row) => !disabledRows.has(row)).length;
    return numSelected === activeRowCount;
  });

  protected _isSelectAllDisabled = computed(() => this._unselectableRows().size === this._selectableRowData().length);

  public ngOnInit(): void {
    this._intl.changes.pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe(() => this._cdRef.markForCheck());
  }

  /**
   * Open up all row details.
   */
  public expandAll(): void {
    this.rowData().forEach((rowData, idx) => {
      if (!this._expandedRows.has(rowData) && this.hasDetailRow()(idx, rowData)) {
        this._expandedRows.add(rowData);
      }
    });
    this._cdRef.markForCheck();
  }

  /**
   * Closes all opened row details.
   */
  public collapseAll(): void {
    this._expandedRows.clear();
    this._cdRef.markForCheck();
  }

  /**
   * Refresh rendered cell values. Useful if for eg. the `value` getter function is not pure and the values need to be refreshed manually.
   */
  public updateCellContents(): void {
    this._cellContentRenderers().forEach((cellContent) => cellContent.updateValue());
  }

  protected _tableContentChanged(): void {
    this.contentChanged.emit();

    if (this.clearSelectionOnChange()) {
      this.rowSelection.clear();
    }
  }

  protected _getNextSortDirectionFor(colId: string): IdsTableSortDirectionType {
    const sortState = this._sortState();
    const nextIndex = sortState?.sortBy === colId ?
      (this._sortDirections.indexOf(sortState.direction) + 1) % this._sortDirections.length : 1;

    return this._sortDirections[nextIndex];
  }

  protected _handleSortClick(colId: string): void {
    const nextSortDirection = this._getNextSortDirectionFor(colId);

    this._sortState.set(nextSortDirection !== IdsTableSortDirection.NONE ? new IdsTableSortInfo(colId, nextSortDirection) : null);

    this.sortChange.emit(this._sortState());
  }

  protected _handleCellClick(event: MouseEvent, rowData: D, colDef: IdsTableColumnDef<D>): void {
    this.cellClick.emit({ event, colDef, rowData });
  }

  protected _handleRowClick(event: MouseEvent, rowData: D): void {
    this.rowClick.emit({ event, rowData });
  }

  protected _handleRowKeyDown(event: KeyboardEvent, rowData: D): void {
    this.rowKeydown.emit({ event, rowData });
  }

  protected _handleMasterDetailClick(rowData: D): void {
    if (this._expandedRows.has(rowData)) {
      this._expandedRows.delete(rowData);
    } else {
      this._expandedRows.add(rowData);
    }
    this._cdRef.markForCheck();
  }

  protected _masterToggle(): void {
    const data = this._selectableRowData();
    if (this._isAllSelected() || !data) {
      this.rowSelection.clear();
      return;
    }

    this.rowSelection.select(...data);
  }
}
