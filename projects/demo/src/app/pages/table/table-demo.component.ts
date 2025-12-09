import { PeriodicTableElement } from './periodic-table-element';
import { TableDemoService } from './table-demo.service';

import { ControlTableComponent } from '../../components/control-table/control-table.component';
import { PropTableComponent } from '../../components/prop-table/prop-table.component';
import { DemoAndCodeComponent } from '../../components/tabs/demo-and-code/demo-and-code.component';
import { TryoutControlComponent } from '../../components/tryout/tryout-controls.component';
import { TryoutComponent } from '../../components/tryout/tryout.component';

import { Component, DestroyRef, inject, Injectable, OnInit, viewChild, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsPaginatorComponent } from '@i-cell/ids-angular/paginator';
import { IdsTableCellRenderer, IdsTableCellTemplateDirective, IdsTableColumnDef, IdsTableComponent, IdsTableIntl, IdsTableRequestFactory, IdsTableRowKeydownEvent, ServerSideDataSource } from '@i-cell/ids-angular/table';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { map, tap } from 'rxjs';

export const translateLabelsToIntlPropNames = {
  'TABLE.ARIA.HEADER_SELECTOR': 'headerSelectorAriaLabel',
  'TABLE.ARIA.ROW_SELECTOR': 'rowSelectorAriaLabel',
  'TABLE.LABEL.DETAIL_HEADER': 'detailHeaderLabel',
} as const;
export type TranslateLabelsToIntlPropNamesType = typeof translateLabelsToIntlPropNames;
export type TranslateLabelsType = keyof TranslateLabelsToIntlPropNamesType;
@Component({
  selector: 'ids-table-translate-cell-renderer',
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
  imports: [
    IdsButtonComponent,
    IdsPaginatorComponent,
    IdsTableCellTemplateDirective,
    IdsTableComponent,
    TranslateModule,
    TryoutComponent,
    DemoAndCodeComponent,
    TryoutControlComponent,
    ControlTableComponent,
    PropTableComponent,
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

  protected _tableDemoService = inject(TableDemoService);
  private _table = viewChild(IdsTableComponent);
  private _intl = inject(IdsTableIntl);
  private _destroyRef = inject(DestroyRef);

  private _requestFactory: IdsTableRequestFactory<PeriodicTableElement> =
    (paginationData, sortInfo) => this._tableDemoService.getPeriodicTable(paginationData, sortInfo);

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
    this._tableDemoService.translate.stream(Object.keys(translateLabelsToIntlPropNames)).pipe(
      tap((translations: Record<TranslateLabelsType, string>) => {
        (Object.keys(translations) as TranslateLabelsType[]).forEach(
          (key) => this._intl[translateLabelsToIntlPropNames[key]] = translations[key],
        );
        this._intl.numberFormat = new Intl.NumberFormat(this._tableDemoService.translate.currentLang, {
          ...this._intl.numberFormat.resolvedOptions(),
        });
        this._tableDemoService.meltNumberFormat = this._tableDemoService.getMeltNumberFormat();

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
}
