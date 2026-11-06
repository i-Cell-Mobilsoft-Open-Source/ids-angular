import { TABLE_EXAMPLE_INTL_PROVIDER } from '../table-example-intl';
import {
  createTableExampleColumnDefs,
  createTableExampleServerSideRequestFactory,
  TABLE_EXAMPLE_SERVER_SIDE_PAGE_SIZE,
} from '../table-example.utils';

import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';
import { IdsPaginatorComponent } from '@i-cell/ids-angular/paginator';
import { IdsSpinnerComponent } from '@i-cell/ids-angular/spinner';
import { IdsTableCellTemplateDirective, IdsTableComponent, ServerSideDataSource } from '@i-cell/ids-angular/table';
import { TranslateModule } from '@ngx-translate/core';
import { map } from 'rxjs';

@Component({
  selector: 'app-table-server-side-example',
  imports: [
    IdsPaginatorComponent,
    IdsSpinnerComponent,
    IdsTableCellTemplateDirective,
    IdsTableComponent,
    TranslateModule,
  ],
  templateUrl: './table-server-side-example.component.html',
  styleUrl: './table-server-side-example.component.scss',
  viewProviders: [TABLE_EXAMPLE_INTL_PROVIDER],
})
export class TableServerSideExampleComponent implements OnInit {
  private readonly _destroyRef = inject(DestroyRef);

  protected readonly _columnDefs = createTableExampleColumnDefs();
  protected readonly _pageSize = TABLE_EXAMPLE_SERVER_SIDE_PAGE_SIZE;
  protected readonly _pageSizeOptions = [
    TABLE_EXAMPLE_SERVER_SIDE_PAGE_SIZE,
    TABLE_EXAMPLE_SERVER_SIDE_PAGE_SIZE * 2,
  ];

  protected readonly _dataSource = new ServerSideDataSource(createTableExampleServerSideRequestFactory());
  protected readonly _totalRows = toSignal(
    this._dataSource.pageInfo$.pipe(
      map((pageInfo) => pageInfo?.totalRows ?? 0),
      takeUntilDestroyed(this._destroyRef),
    ),
    { initialValue: 0 },
  );

  protected readonly _isLoading = toSignal(this._dataSource.isLoading$, { initialValue: false });

  protected _currentPageIndex = 0;

  public ngOnInit(): void {
    this._dataSource.pageIndex$.pipe(takeUntilDestroyed(this._destroyRef)).subscribe((pageIndex) => {
      this._currentPageIndex = pageIndex;
    });
  }
}
