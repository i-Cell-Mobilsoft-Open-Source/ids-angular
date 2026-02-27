import { PeriodicTableElement } from './periodic-table-element';
import { TranslateCellRendererComponent } from './table-demo.component';

import { environment } from '../../../environments/environment';

import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { DemoControl, DemoControlConfig } from '@demo-types/demo-control.type';
import { convertEnumToStringArray } from '@demo-utils/convert-enum-to-string-array';
import { getDefaultFromDemoConfig } from '@demo-utils/get-defaults-from-demo-config';
import { compare, IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import { IDS_TABLE_DEFAULT_CONFIG_FACTORY, IdsTableAppearance, IdsTableAppearanceType, IdsTableColumnDef, IdsTableRequestPaginationData, IdsTableResponseData, IdsTableSortDirection, IdsTableSortInfo, IdsTableVariant, IdsTableVariantType } from '@i-cell/ids-angular/table';
import { TranslateService } from '@ngx-translate/core';
import { map, Observable } from 'rxjs';

export type TableInputControls = {
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
      field: 'atomicMass',
      cellRenderer: 'numeric',
      sortable: true,
      orderName: 'atomicMass',
    },
    {
      id: 'melt',
      label: 'TABLE.COL.MELT',
      headerCellRenderer: TranslateCellRendererComponent,
      value: (rowData): string => (Number.isFinite(rowData.melt) ? this.meltNumberFormat.format(rowData.melt! - zeroCelsiusInKelvin) : ''),
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
      default: defaultConfig.fixedHeader,
      control: DemoControl.SWITCH,
    },
    enableRowSelection: {
      description: 'Whether the row selection is disabled or not.',
      type: 'boolean',
      default: defaultConfig.enableRowSelection,
      control: DemoControl.SWITCH,
    },
    clearSelectionOnChange: {
      description: 'Whether to clear row selection if the table\'s content changes or not.',
      type: 'boolean',
      default: defaultConfig.clearSelectionOnChange,
      control: DemoControl.SWITCH,
    },
    enableSorting: {
      description: 'Whether the sorting feature is disabled or not.',
      type: 'boolean',
      default: defaultConfig.enableSorting,
      control: DemoControl.SWITCH,
    },
    masterDetail: {
      description: 'Whether the master-detail feature is disabled or not.',
      type: 'boolean',
      default: defaultConfig.masterDetail,
      control: DemoControl.SWITCH,
    },
    showDetailHeader: {
      description: 'Whether to show the master-detail column label or not.',
      type: 'boolean',
      default: defaultConfig.showDetailHeader,
      control: DemoControl.SWITCH,
    },
    detailStickyColumns: {
      description: 'Whether to span the detail cell to the table\'s full width or don\'t span sticky columns.',
      type: 'boolean',
      default: defaultConfig.detailStickyColumns,
      control: DemoControl.SWITCH,
    },
    withBorder: {
      description: 'Whether to show the table\'s border or not.',
      type: 'boolean',
      default: defaultConfig.withBorder,
      control: DemoControl.SWITCH,
    },
    noRowsToShowOverlayBelow: {
      description: 'Whether to render a "no rows to show" overlay below the table or as a row in the table.',
      type: 'boolean',
      default: defaultConfig.noRowsToShowOverlayBelow,
      control: DemoControl.SWITCH,
    },
  };

  public defaults = getDefaultFromDemoConfig<TableInputControls>(this.inputControlConfig);

  public model: TableInputControls = { ...this.defaults };

  public reset(): void {
    this.model = { ...this.defaults };
  }

  public getApiConfig(): DemoControlConfig<unknown>[] {
    return [this.inputControlConfig];
  }

}
