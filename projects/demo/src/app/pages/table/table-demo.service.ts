import { PeriodicTableElement } from './periodic-table-element';
import { SuffixedCellRendererComponent, TranslateCellRendererComponent } from './table-demo.component';

import { environment } from '../../../environments/environment';
import { WidgetDocsService } from '../../services/widget-docs.service';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DemoApiControlConfig } from '@demo-types/demo-api-control.type';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { DemoMethodConfig } from '@demo-types/demo-method.type';
import { DemoSlotConfig } from '@demo-types/demo-slot.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { getDemoApiTitle } from '@demo-utils/get-demo-api-title';
import { compare, IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import {
  IDS_TABLE_DEFAULT_CONFIG_FACTORY,
  IdsTableAppearance,
  IdsTableAppearanceType,
  IdsTableColumnDef,
  IdsTableRequestPaginationData,
  IdsTableResponseData,
  IdsTableSortDirection,
  IdsTableSortInfo,
  IdsTableVariant,
  IdsTableVariantType,
} from '@i-cell/ids-angular/table';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';

const CELL_TEMPLATE_DOCS_PATH = 'table/directives/cell-template.docs.json';
const TABLE_DOCS_PATH = 'table/table.component.docs.json';
const CELL_RENDERER_DOCS_PATH = 'table/directives/cell-renderer.docs.json';
const CELL_CONTENT_DOCS_PATH = 'table/components/cell-content/cell-content.component.docs.json';
const TABLE_SLOTS_DOCS_PATH = 'table/table.component.slots.docs.json';

export type TableInputControls = {
  appearance: IdsTableAppearanceType;
  size: IdsSizeType;
  variant: IdsTableVariantType;
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
const pageDefaultRows = 10;
const pageDefaultPage = 1;

export const translateLabelsToIntlPropNames = {
  'TABLE.ARIA.HEADER_SELECTOR': 'headerSelectorAriaLabel',
  'TABLE.ARIA.ROW_SELECTOR': 'rowSelectorAriaLabel',
  'TABLE.LABEL.DETAIL_HEADER': 'detailHeaderLabel',
} as const;

export type TranslateLabelsToIntlPropNamesType = typeof translateLabelsToIntlPropNames;
export type TranslateLabelsType = keyof TranslateLabelsToIntlPropNamesType;

@Injectable({ providedIn: 'root' })
export class TableDemoService {
  private _http = inject(HttpClient);
  private readonly _widgetDocs = inject(WidgetDocsService);

  public getPeriodicTable(paginationData: IdsTableRequestPaginationData | null, sortInfo: IdsTableSortInfo | null):
  Observable<IdsTableResponseData<PeriodicTableElement>> {
    const rows = paginationData?.rows || pageDefaultRows;
    const page = paginationData?.page || pageDefaultPage;

    return this._http.get<{ elements: PeriodicTableElement[] }>(`${environment.baseUrl}/assets/json/periodic-table.json`).pipe(
      map((result) => ({
        resultList: result.elements,
        paginationParams: {
          totalRows: result.elements.length,
          rows,
          page,
        },
      })),
      map((result) => {
        // Sorting
        if (sortInfo && sortInfo.sortBy && sortInfo.direction !== IdsTableSortDirection.NONE) {
          result.resultList.sort((item1, item2) => {
            const isAscending = sortInfo.direction === IdsTableSortDirection.ASC;
            const value1 = this._getPropValue(item1, sortInfo.sortBy);
            const value2 = this._getPropValue(item2, sortInfo.sortBy);

            return compare(isAscending ? value1 : value2, isAscending ? value2 : value1);
          });
        }

        // Paging
        const startIndex = (page - 1) * rows;
        result.resultList = (startIndex < result.resultList.length) ? result.resultList.slice(startIndex, startIndex + rows) : [];

        return result;
      }),
    );
  }

  private _getPropValue(obj: object, propName: string): unknown {
    return Object.hasOwn(obj, propName) ? (obj as unknown as Record<string, unknown>)[propName] : '';
  }

  public translate = inject(TranslateService);

  public meltNumberFormat = this.getMeltNumberFormat();

  public getMeltNumberFormat(): Intl.NumberFormat {
    return new Intl.NumberFormat(this.translate.currentLang, {
      style: 'unit',
      unit: 'celsius',
    });
  }

  public colDefs: IdsTableColumnDef<PeriodicTableElement>[] = [
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
      headerCellRendererInput: { headerSuffix: ' (g/mol)' },
      field: 'atomicMass',
      cellRenderer: SuffixedCellRendererComponent,
      cellRendererInput: { suffix: ' (g/mol)' },
      sortable: true,
      orderName: 'atomicMass',
    },
    {
      id: 'melt',
      label: 'TABLE.COL.MELT',
      headerCellRenderer: TranslateCellRendererComponent,
      valueGetter: (rowData): string =>
        (Number.isFinite(rowData.melt) ? this.meltNumberFormat.format(rowData.melt! - zeroCelsiusInKelvin) : ''),
      cellClasses: 'table-demo_cell__numeric',
    },
    {
      id: 'summary',
      label: 'TABLE.COL.SUMMARY',
      field: 'summary',
      visible: false,
    },
  ];

  public inputControlConfig: DemoControlConfig<TableInputControls> = {
    appearance: {
      description: this._widgetDocs.getDescription(TABLE_DOCS_PATH, 'appearance', 'Table appearance.'),
      type: 'IdsTableAppearanceType',
      default: defaultConfig.appearance,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsTableAppearance),
    },
    size: {
      description: this._widgetDocs.getDescription(TABLE_DOCS_PATH, 'size', 'Table size.'),
      type: 'IdsSizeType',
      default: defaultConfig.size,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsSize),
    },
    variant: {
      description: this._widgetDocs.getDescription(TABLE_DOCS_PATH, 'variant', 'Table variant.'),
      type: 'IdsTableVariantType',
      default: defaultConfig.variant,
      control: DemoControl.SELECT,
      list: convertEnumToStringArray(IdsTableVariant),
    },
    fixedHeader: {
      description: this._widgetDocs.getDescription(TABLE_DOCS_PATH, 'fixedHeader', 'Whether the header is fixed to the top or not.'),
      type: 'boolean',
      default: defaultConfig.fixedHeader,
      control: DemoControl.SWITCH,
    },
    enableRowSelection: {
      description: this._widgetDocs.getDescription(
        TABLE_DOCS_PATH,
        'enableRowSelection',
        'Whether row selection is enabled.',
      ),
      type: 'boolean',
      default: defaultConfig.enableRowSelection,
      control: DemoControl.SWITCH,
    },
    clearSelectionOnChange: {
      description: this._widgetDocs.getDescription(
        TABLE_DOCS_PATH,
        'clearSelectionOnChange',
        'Whether to clear row selection if the table\'s content changes or not.',
      ),
      type: 'boolean',
      default: defaultConfig.clearSelectionOnChange,
      control: DemoControl.SWITCH,
    },
    enableSorting: {
      description: this._widgetDocs.getDescription(TABLE_DOCS_PATH, 'enableSorting', 'Whether column sorting is enabled.'),
      type: 'boolean',
      default: defaultConfig.enableSorting,
      control: DemoControl.SWITCH,
    },
    masterDetail: {
      description: this._widgetDocs.getDescription(
        TABLE_DOCS_PATH,
        'masterDetail',
        'Whether expandable detail rows are enabled.',
      ),
      type: 'boolean',
      default: defaultConfig.masterDetail,
      control: DemoControl.SWITCH,
    },
    showDetailHeader: {
      description: this._widgetDocs.getDescription(
        TABLE_DOCS_PATH,
        'showDetailHeader',
        'Whether to show the master-detail column label or not.',
      ),
      type: 'boolean',
      default: defaultConfig.showDetailHeader,
      control: DemoControl.SWITCH,
    },
    detailStickyColumns: {
      description: this._widgetDocs.getDescription(
        TABLE_DOCS_PATH,
        'detailStickyColumns',
        'Whether detail rows exclude sticky columns. When false, detail rows span the full table width.',
      ),
      type: 'boolean',
      default: defaultConfig.detailStickyColumns,
      control: DemoControl.SWITCH,
    },
    withBorder: {
      description: this._widgetDocs.getDescription(TABLE_DOCS_PATH, 'withBorder', 'Whether to show the table\'s border or not.'),
      type: 'boolean',
      default: defaultConfig.withBorder,
      control: DemoControl.SWITCH,
    },
    noRowsToShowOverlayBelow: {
      description: this._widgetDocs.getDescription(
        TABLE_DOCS_PATH,
        'noRowsToShowOverlayBelow',
        'Whether to render a "no rows to show" overlay below the table or as a row in the table.',
      ),
      type: 'boolean',
      default: defaultConfig.noRowsToShowOverlayBelow,
      control: DemoControl.SWITCH,
    },
  };

  public readonly propControlConfig: DemoControlConfig<unknown> = {
    columnDefs: {
      description: this._widgetDocs.getDescription(
        TABLE_DOCS_PATH,
        'columnDefs',
        'Column definitions describing the table\'s columns (labels, fields, renderers, sorting, stickiness, etc.). Required.',
      ),
      type: 'IdsTableColumnDef<D>[]',
      default: '-',
    },
    dataSource: {
      description: this._widgetDocs.getDescription(
        TABLE_DOCS_PATH,
        'dataSource',
        'The data source used to fetch/display the table\'s rows (e.g. a ServerSideDataSource or a plain array). Required.',
      ),
      type: 'CdkTableDataSourceInput<D>',
      default: '-',
    },
    detailTemplateName: {
      description: this._widgetDocs.getDescription(
        TABLE_DOCS_PATH,
        'detailTemplateName',
        'Name of the `idsCellTemplate` used to render the master-detail row content.',
      ),
      type: 'string',
      default: '-',
    },
    hasDetailRow: {
      description: this._widgetDocs.getDescription(
        TABLE_DOCS_PATH,
        'hasDetailRow',
        'Function that decides, per row, whether the master-detail row should be shown for it.',
      ),
      type: '(index: number, data: D) => boolean',
      default: '() => false',
    },
    isRowSelectable: {
      description: this._widgetDocs.getDescription(
        TABLE_DOCS_PATH,
        'isRowSelectable',
        'Function that decides, per row, whether the row can be selected.',
      ),
      type: '(index: number, data: D) => boolean',
      default: '() => true',
    },
    sortChange: {
      description: this._widgetDocs.getDescription(
        TABLE_DOCS_PATH,
        'sortChange',
        'Emits when the user changes the sorting of the table.',
      ),
      type: 'EventEmitter<IdsTableSortInfo | null>',
      default: '-',
    },
    cellClick: {
      description: this._widgetDocs.getDescription(TABLE_DOCS_PATH, 'cellClick', 'Emits when a cell of the table is clicked.'),
      type: 'EventEmitter<IdsTableCellClickEvent<D>>',
      default: '-',
    },
    rowClick: {
      description: this._widgetDocs.getDescription(TABLE_DOCS_PATH, 'rowClick', 'Emits when a row of the table is clicked.'),
      type: 'EventEmitter<IdsTableRowClickEvent<D>>',
      default: '-',
    },
    rowKeydown: {
      description: this._widgetDocs.getDescription(
        TABLE_DOCS_PATH,
        'rowKeydown',
        'Emits when a keydown event happens on a row of the table.',
      ),
      type: 'EventEmitter<IdsTableRowKeydownEvent<D>>',
      default: '-',
    },
    contentChanged: {
      description: this._widgetDocs.getDescription(
        TABLE_DOCS_PATH,
        'contentChanged',
        'Emits when the table\'s rendered content changes (e.g. after data/sort/page change).',
      ),
      type: 'EventEmitter<void>',
      default: '-',
    },
  };

  public readonly cellRendererPropControlConfig: DemoControlConfig<unknown> = {
    cellValue: {
      description: this._widgetDocs.getDescription(
        CELL_RENDERER_DOCS_PATH,
        'cellValue',
        'The current cell\'s value, coerced to a string, passed to a custom cell renderer component.',
      ),
      type: 'string',
      default: '\'\'',
    },
    colDef: {
      description: this._widgetDocs.getDescription(
        CELL_RENDERER_DOCS_PATH,
        'colDef',
        'The column definition the cell belongs to, passed to a custom cell renderer component. Required.',
      ),
      type: 'IdsTableColumnDef<D>',
      default: '-',
    },
    rowData: {
      description: this._widgetDocs.getDescription(
        CELL_RENDERER_DOCS_PATH,
        'rowData',
        'The full row data object, passed to a custom cell renderer component.',
      ),
      type: 'D',
      default: '-',
    },
  };

  public readonly cellContentPropControlConfig: DemoControlConfig<unknown> = {
    externalCellTemplates: {
      description: this._widgetDocs.getDescription(
        CELL_CONTENT_DOCS_PATH,
        'externalCellTemplates',
        'Map of externally provided cell templates (keyed by template name) usable as custom cell content.',
      ),
      type: 'Map<string, TemplateRef<unknown>>',
      default: '-',
    },
  };

  public readonly methodControlConfig: DemoMethodConfig = [
    {
      name: 'expandAll()',
      description: 'Open up all row details.',
      returnType: 'void',
    },
    {
      name: 'collapseAll()',
      description: 'Closes all opened row details.',
      returnType: 'void',
    },
    {
      name: 'updateCellContents()',
      description: 'Refresh rendered cell values.' +
        ' Useful if for eg. the `value` getter function is not pure and the values need to be refreshed manually.',
      returnType: 'void',
    },
  ];

  public defaults = getDefaultFromDemoConfig<TableInputControls>(this.inputControlConfig);

  public model: TableInputControls = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }

  public getMethodConfig(): DemoMethodConfig[] {
    return [this.methodControlConfig];
  }

  public readonly cellTemplatePropControlConfig: DemoControlConfig<unknown> = {
    templateName: {
      description: this._widgetDocs.getDescription(
        CELL_TEMPLATE_DOCS_PATH,
        'templateName',
        'Name used to reference this cell template (alias: "idsCellTemplate"). Required.',
      ),
      type: 'string',
      default: '-',
    },
  };

  public getApiConfig(): DemoApiControlConfig[] {
    return [
      {
        title: getDemoApiTitle(this.translate, 'COMPONENTS.TABLE', 'API.PROPERTY_GROUP.DEFAULT'),
        config: { ...this.inputControlConfig, ...this.propControlConfig },
      },
      {
        title: getDemoApiTitle(this.translate, 'COMPONENTS.TABLE', 'API.PROPERTY_GROUP.CELL_RENDERER'),
        config: this.cellRendererPropControlConfig,
      },
      {
        title: getDemoApiTitle(this.translate, 'COMPONENTS.TABLE', 'API.PROPERTY_GROUP.CELL_CONTENT'),
        config: this.cellContentPropControlConfig,
      },
      {
        title: getDemoApiTitle(this.translate, 'COMPONENTS.TABLE', 'API.PROPERTY_GROUP.CELL_TEMPLATE'),
        config: this.cellTemplatePropControlConfig,
      },
    ];
  }

  public readonly slotControlConfig: DemoSlotConfig = [
    {
      name: 'idsNoRowsToShow',
      selector: '[idsNoRowsToShow]',
      description: this._widgetDocs.getDescription(
        TABLE_SLOTS_DOCS_PATH,
        'idsNoRowsToShow',
        'Content projected into the empty-state message shown when the table has no rows (marked with the idsNoRowsToShow attribute).',
      ),
    },
    {
      name: 'idsTableCaption',
      selector: '[idsTableCaption]',
      description: this._widgetDocs.getDescription(
        TABLE_SLOTS_DOCS_PATH,
        'idsTableCaption',
        'Content projected into the table\'s native <caption> element (marked with the idsTableCaption attribute).',
      ),
    },
  ];

  public getSlotConfig(): DemoSlotConfig[] {
    return [this.slotControlConfig];
  }

  public getSlotTitles(): string[] {
    return ['Table'];
  }
}
