import { IdsCellContentComponent } from './components/cell-content/cell-content.component';
import { IdsTableCellTemplateDirective } from './directives/cell-template';
import { RowInfoHolderDirective } from './directives/row-data-holder';
import { IDS_TABLE_DEFAULT_CONFIG, IDS_TABLE_DEFAULT_CONFIG_FACTORY, IdsTableDefaultConfig } from './table-defaults';
import { IdsTableAppearance, IdsTableAppearanceType } from './types/table-appearance.type';
import { IdsTableCellClickEvent } from './types/table-cell-click-event';
import { IdsTableColumnDef } from './types/table-column-def';
import { IdsTableRowClickEvent } from './types/table-row-click-event';
import { IdsTableRowKeydownEvent } from './types/table-row-keydown-event';
import { IdsTableSortDirection, IdsTableSortDirectionType } from './types/table-sort-direction';
import { IdsTableSortInfo } from './types/table-sort-info';
import { IdsTableVariantType } from './types/table-variant.type';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { CdkCell, CdkCellDef, CdkColumnDef, CdkHeaderCell, CdkHeaderCellDef, CdkHeaderRow, CdkHeaderRowDef, CdkNoDataRow, CdkRow, CdkRowDef, CdkTable, CdkTableDataSourceInput } from '@angular/cdk/table';
import { NgClass, NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, contentChildren, inject, input, output, signal, TemplateRef, viewChildren, ViewEncapsulation } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
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
  styleUrl: './table.component.scss',
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
})
export class IdsTableComponent<D>
  extends ComponentBaseWithDefaults<IdsTableDefaultConfig> implements IdsIconButtonParent {

  private readonly _sortDirections: IdsTableSortDirectionType[] = [
    '',
    'asc',
    'desc',
  ];

  private _cdRef = inject(ChangeDetectorRef);

  protected readonly _appearanceZebra = IdsTableAppearance.ZEBRA;
  protected readonly _defaultMasterDetailTemplateName = 'detail';
  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_TABLE_DEFAULT_CONFIG);

  private _viewCellTemplates = viewChildren(IdsTableCellTemplateDirective);
  private _rowDataHolders = viewChildren(RowInfoHolderDirective<D>);
  private _selectorCheckboxes = viewChildren(IdsCheckboxComponent);
  private _contentCellTemplates = contentChildren(IdsTableCellTemplateDirective);

  public columnDefs = input.required<IdsTableColumnDef<D>[]>();
  public dataSource = input.required<CdkTableDataSourceInput<D>>();
  /** Flag to have sticky header. */
  public fixedHeader = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  /** Enable sorting feature */
  public enableSorting = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  /** Enable master-detail rows */
  public masterDetail = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  /** Name of the detail row renderer template */
  public detailTemplateName = input(this._defaultMasterDetailTemplateName);
  /** TODO: */
  public detailStickyColumns = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  /** Predicate function to decide whether a data row has details or not */
  public hasDetailRow = input<(index: number, data: D) => boolean>(() => false);
  /** Enable row selection feature */
  public enableRowSelection = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  /** Clear row selection if the table's content changes */
  public cleatSelectionOnChange = input<boolean, unknown>(true, { transform: coerceBooleanAttribute });
  /** Predicate function to decide whether a row can be selected or not */
  public isRowSelectable = input<(index: number, data: D) => boolean>(() => true);
  /** Render "no rows to show" overlay below the table instead of as a row */
  public noRowsToShowOverlayBelow = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  /** Render "no rows to show" overlay below the table instead of as a row */
  public withBorder = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  /** Dynamically set per-row CSS class */
  public rowClass = input<(data: D) => string>(() => '');
  /** TODO: */
  public appearance = input<IdsTableAppearanceType>(this._defaultConfig.appearance);
  /** TODO: */
  public size = input<IdsSizeType>(this._defaultConfig.size);
  /** TODO: */
  public variant = input<IdsTableVariantType>(this._defaultConfig.variant);

  public sortChange = output<IdsTableSortInfo | null>();
  public cellClick = output<IdsTableCellClickEvent<D>>();
  public rowClick = output<IdsTableRowClickEvent<D>>();
  public rowKeydown = output<IdsTableRowKeydownEvent<D>>();
  public contentChanged = output<void>();

  public embeddedIconButtonVariant = signal<IdsIconButtonVariantType>(IdsIconButtonVariant.SURFACE);
  public embeddedIconButtonAppearance = signal<IdsIconButtonAppearanceType>(IdsIconButtonAppearance.STANDARD);
  public disabled = signal<boolean>(false);

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
      .filter((colDef) => (colDef.visible === false || colDef.actionColumn))
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

  protected _disabledRows = computed(() => {
    const rows = this.rowData();

    return new Set<D>(rows.filter((rowData, index) => !this.isRowSelectable()(index, rowData)));
  });

  private _rowSelectorCheckboxes = computed(() => {
    const disabledRows = this._disabledRows();

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
    const disabledRows = this._disabledRows();

    if (!selectionChange || !data) {
      return false;
    }

    const numSelected = selectionChange.source.selected.length;
    const activeRowCount = data.filter((row) => !disabledRows.has(row)).length;
    return numSelected === activeRowCount;
  });

  protected _isSelectAllDisabled = computed(() => this._disabledRows().size === this._selectableRowData().length);

  private _updateSelectionDisabledStates(): void {}

  protected _tableContentChanged(): void {
    // TODO:
    this.contentChanged.emit();
    this._updateSelectionDisabledStates();

    if (this.cleatSelectionOnChange()) {
      this.rowSelection.clear();
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected _sortButtonLabel(_colDef: IdsTableColumnDef<D>): string {
    // TODO: Intl
    return '';
  }

  protected _handleSortClick(colId: string): void {
    const sortState = this._sortState();
    const nextIndex = sortState?.sortBy === colId ?
      (this._sortDirections.indexOf(sortState.direction) + 1) % this._sortDirections.length
      :
      1;
    const nextSortDirection = this._sortDirections[nextIndex];

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
