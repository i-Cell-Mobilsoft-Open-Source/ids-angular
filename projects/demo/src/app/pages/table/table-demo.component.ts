import { PeriodicTableElement } from './periodic-table-element';
import { TableDemoService } from './table-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, DestroyRef, inject, Injectable, OnInit, viewChild, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsPaginatorComponent } from '@i-cell/ids-angular/paginator';
import { IDS_TABLE_DEFAULT_CONFIG_FACTORY, IdsTableAppearance, IdsTableAppearanceType, IdsTableCellRenderer, IdsTableCellTemplateDirective, IdsTableColumnDef, IdsTableComponent, IdsTableIntl, IdsTableRequestFactory, IdsTableRowKeydownEvent, IdsTableVariant, IdsTableVariantType, ServerSideDataSource } from '@i-cell/ids-angular/table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { map, tap } from 'rxjs';

type TableInputControls = {
  appearance: IdsTableAppearanceType,
  size: IdsSizeType,
  variant: IdsTableVariantType,
  fixedHeader: boolean;
  enableRowSelection: boolean;
  clearSelectionOnChange: boolean;
  enableSorting: boolean;
  masterDetail: boolean;
  showDetailHeader: boolean;
  detailStickyColumns: boolean;
  withBorder: boolean;
  noRowsToShowOverlayBelow: boolean;
};

const defaultConfig = IDS_TABLE_DEFAULT_CONFIG_FACTORY();
const zeroCelsiusInKelvin = 273.15;

const translateLabelsToIntlPropNames = {
  'TABLE.ARIA.HEADER_SELECTOR': 'headerSelectorAriaLabel',
  'TABLE.ARIA.ROW_SELECTOR': 'rowSelectorAriaLabel',
  'TABLE.LABEL.DETAIL_HEADER': 'detailHeaderLabel',
} as const;
type TranslateLabelsToIntlPropNamesType = typeof translateLabelsToIntlPropNames;
type TranslateLabelsType = keyof TranslateLabelsToIntlPropNamesType;

@Component({
  selector: 'ids-table-translate-cell-renderer',
  standalone: true,
  imports: [TranslateModule],
  template: '{{ cellValue() | translate }}',
})
export class TranslateCellRendererComponent extends IdsTableCellRenderer<PeriodicTableElement> {}

@Injectable()
export class TableDemoTableIntl extends IdsTableIntl<PeriodicTableElement> {
  private _translate = inject(TranslateService);

  public override numberFormat: Intl.NumberFormat = new Intl.NumberFormat('en');

  public override getDetailExpandButtonAriaLabel(rowData: PeriodicTableElement): string {
    return `Expand row details for ${rowData.name}`;
  }

  public override getColLabel(colDef: IdsTableColumnDef<PeriodicTableElement>): string {
    return colDef.label ? this._translate.instant(colDef.label) : '';
  }
}

@Component({
  selector: 'app-table-demo',
  standalone: true,
  imports: [
    ControlTableComponent,
    IdsButtonComponent,
    IdsPaginatorComponent,
    IdsTableCellTemplateDirective,
    IdsTableComponent,
    TranslateModule,
    TryoutComponent,
  ],
  templateUrl: './table-demo.component.html',
  styleUrl: './table-demo.component.scss',
  encapsulation: ViewEncapsulation.None,
  viewProviders: [
    {
      provide: IdsTableIntl,
      useClass: TableDemoTableIntl,
    },
  ],
})
export class TableDemoComponent implements OnInit {
  private _tableDemoService = inject(TableDemoService);
  private _intl = inject(IdsTableIntl);
  private _destroyRef = inject(DestroyRef);
  protected _translate = inject(TranslateService);

  private _table = viewChild(IdsTableComponent);

  private _requestFactory: IdsTableRequestFactory<PeriodicTableElement> =
    (paginationData, sortInfo) => this._tableDemoService.getPeriodicTable(paginationData, sortInfo);

  private _meltNumberFormat = this._getMeltNumberFormat();

  protected _colDefs: IdsTableColumnDef<PeriodicTableElement>[] = [
    {
      id: 'name',
      label: 'TABLE.COL.NAME',
      headerCellRenderer: 'translate1',
      field: 'name',
      sticky: true,
      sortable: true,
      orderName: 'name',
      identifier: true,
    },
    {
      id: 'symbol',
      label: 'TABLE.COL.SYMBOL',
      headerCellRenderer: 'translate2',
      cellRenderer: 'symbol',
    },
    {
      id: 'number',
      label: 'TABLE.COL.NUMBER',
      headerCellRenderer: TranslateCellRendererComponent,
      field: 'number',
      cellRenderer: 'numeric',
    },
    {
      id: 'atomicMass',
      label: 'TABLE.COL.ATOMIC_MASS',
      headerCellRenderer: TranslateCellRendererComponent,
      field: 'atomicMass',
      cellRenderer: 'numeric',
      sortable: true,
      orderName: 'atomicMass',
    },
    {
      id: 'melt',
      label: 'TABLE.COL.MELT',
      headerCellRenderer: TranslateCellRendererComponent,
      value: (rowData): string => (Number.isFinite(rowData.melt) ? this._meltNumberFormat.format(rowData.melt! - zeroCelsiusInKelvin) : ''),
      cellClasses: 'table-demo_cell__numeric',
    },
    {
      id: 'summary',
      label: 'TABLE.COL.SUMMARY',
      field: 'summary',
      visible: false,
    },
  ];

  protected _inputControlConfig: DemoControlConfig<TableInputControls> = {
    appearance: {
      description: 'Table appearance.',
      type: 'IdsTableAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsTableAppearance),
    },
    size: {
      description: 'Table size.',
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: 'Table variant.',
      type: 'IdsTableVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsTableVariant),
    },
    fixedHeader: {
      description: 'Whether the header is fixed to the top or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
    enableRowSelection: {
      description: 'Whether the row selection is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
    clearSelectionOnChange: {
      description: 'Whether to clear row selection if the table\'s content changes or not.',
      type: 'boolean',
      default: true,
      control: DemoControl.CHECKBOX,
    },
    enableSorting: {
      description: 'Whether the sorting feature is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
    masterDetail: {
      description: 'Whether the master-detail feature is disabled or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
    showDetailHeader: {
      description: 'Whether to show the master-detail column label or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
    detailStickyColumns: {
      description: 'Whether to span the detail cell to the table\'s full width or don\'t span sticky columns.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
    withBorder: {
      description: 'Whether to show the table\'s border or not.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
    noRowsToShowOverlayBelow: {
      description: 'Whether to render a "no rows to show" overlay below the table or as a row in the table.',
      type: 'boolean',
      default: false,
      control: DemoControl.CHECKBOX,
    },
  };

  protected _dataSource = new ServerSideDataSource(this._requestFactory);
  protected _totalRows = toSignal<number, number>(
    this._dataSource.pageInfo$.pipe(
      map((pageInfo) => (pageInfo?.totalRows || 0)),
      takeUntilDestroyed(this._destroyRef),
    ),
    { initialValue: 0 },
  );

  protected _currentPageIndex = 0;

  public ngOnInit(): void {
    this._dataSource.pageIndex$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((pageIndex) => this._currentPageIndex = pageIndex);
    this._translate.stream(Object.keys(translateLabelsToIntlPropNames)).pipe(
      tap((translations: Record<TranslateLabelsType, string>) => {
        (Object.keys(translations) as TranslateLabelsType[]).forEach(
          (key) => this._intl[translateLabelsToIntlPropNames[key]] = translations[key],
        );
        this._intl.numberFormat = new Intl.NumberFormat(this._translate.currentLang, {
          ...this._intl.numberFormat.resolvedOptions(),
        });
        this._meltNumberFormat = this._getMeltNumberFormat();

        queueMicrotask(() => {
          this._intl.changes.next();
          this._table()?.updateCellContents();
        });
      }),
      takeUntilDestroyed(this._destroyRef),
    ).subscribe();
  }

  public onCellClick(): void {
    console.info('Cell clicked');
  }

  public onRowClick(): void {
    console.info('Row clicked');
  }

  public onRowKeydown($event: IdsTableRowKeydownEvent<PeriodicTableElement>): void {
    console.info('Key pressed on row:', $event.event.key);
  }

  public onContentChanged(): void {
    console.info('onContentChanged');
  }

  protected _hasDetailRow(index: number, rowData: PeriodicTableElement): boolean {
    return !!rowData.summary;
  }

  protected _defaults = getDefaultFromDemoConfig<TableInputControls>(this._inputControlConfig);

  protected _model: TableInputControls = { ...this._defaults };

  protected _reset(): void {
    this._model = { ...this._defaults };
  }

  private _getMeltNumberFormat(): Intl.NumberFormat {
    return new Intl.NumberFormat(this._translate.currentLang, {
      style: 'unit',
      unit: 'celsius',
    });
  }

}
