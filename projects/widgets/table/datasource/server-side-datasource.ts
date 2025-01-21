import { IdsTablePaginationParams } from '../types/pagination-params';
import { IdsTableRequestFactory } from '../types/request-factory';
import { IdsTableRequestPaginationData } from '../types/request-pagination-data';
import { IdsTableSortInfo } from '../types/table-sort-info';

import { DataSource } from '@angular/cdk/collections';
import { DEFAULT_PAGE_SIZE, IdsPaginatorPageChangeEvent } from '@i-cell/ids-angular/paginator';
import { BehaviorSubject, catchError, debounceTime, finalize, map, merge, Observable, of, Subject, Subscription, switchMap, tap } from 'rxjs';

export const DEFAULT_DATA_LOAD_DEBOUNCE_TIME = 100;

export class ServerSideDataSource<D> implements DataSource<D> {
  private _dataSubject = new BehaviorSubject<D[]>([]);
  private _sortSubject = new BehaviorSubject<IdsTableSortInfo | null>(null);
  private _pageSubject = new BehaviorSubject<IdsTableRequestPaginationData | null>(null);
  private _pageInfoSubject = new BehaviorSubject<IdsTablePaginationParams | null>(null);
  private _loadDataTriggerSubject = new Subject<void>();
  private _loadingSubject = new BehaviorSubject<boolean>(false);

  private _loadDataSubscription?: Subscription;

  public data$ = this._dataSubject.asObservable();
  public isLoading$ = this._loadingSubject.asObservable();
  public pageInfo$ = this._pageInfoSubject.asObservable();
  public pageIndex$ = this.pageInfo$.pipe(map((pageInfo) => ((pageInfo?.page ?? 1) - 1)));

  get data(): D[] {
    return this._dataSubject.value;
  }

  set data(value: D[]) {
    this._dataSubject.next(value);
  }

  get pageInfo(): IdsTablePaginationParams | null {
    return this._pageInfoSubject.value;
  }

  set pageInfo(value: IdsTablePaginationParams | null) {
    this._pageInfoSubject.next(value);
  }

  get length(): number {
    return this.data.length;
  }

  constructor(
    private _requestFactory: IdsTableRequestFactory<D>,
    private _resetDataAndPagingOnError = false,
  ) {}

  public connect(): Observable<readonly D[]> {
    this._initDataLoading();
    this.refreshData();

    return this.data$;
  }

  public disconnect(): void {
    this._dataSubject.complete();
    this._sortSubject.complete();
    this._loadingSubject.complete();
    this._loadDataSubscription?.unsubscribe();
  }

  public sort(sortInfo?: IdsTableSortInfo | null): void {
    // sorting resets the "page" to 1 (TODO: config option?)
    this._pageSubject.next({
      page: 1,
      rows: this._pageSubject.value?.rows ?? DEFAULT_PAGE_SIZE,
    });
    this._sortSubject.next(sortInfo ?? null);
  }

  public page(pageEvent: IdsPaginatorPageChangeEvent): void {
    this._pageSubject.next(pageEvent ? {
      page: pageEvent.pageIndex + 1,
      rows: pageEvent.pageSize,
    } : null);
  }

  /**
   * Loads data from specified endpoint.
   */
  public refreshData(): void {
    this._loadDataTriggerSubject.next();
  }

  private _initDataLoading(): void {
    this._loadDataSubscription = merge(this._sortSubject, this._pageSubject, this._loadDataTriggerSubject)
      .pipe(
        debounceTime(DEFAULT_DATA_LOAD_DEBOUNCE_TIME),
        switchMap(() => {
          this._loadingSubject.next(true);

          const pageInfo = this.pageInfo;
          const paginationData = this._pageSubject.value;
          let requestPaginationData: IdsTableRequestPaginationData | null = null;

          if (pageInfo || paginationData) {
            requestPaginationData = {
              page: paginationData?.page ?? pageInfo?.page ?? 1,
              rows: paginationData?.rows ?? pageInfo?.rows ?? DEFAULT_PAGE_SIZE,
            };
          }

          const request$ = this._requestFactory(requestPaginationData, this._sortSubject.value);

          if (!(request$ instanceof Observable)) {
            throw new Error('The `requestFactory` should return an Observable!');
          }

          return request$.pipe(
            catchError(() => of(this._resetDataAndPagingOnError ?
              {
                resultList: [] as D[],
                paginationParams: {
                  page: 1,
                  totalRows: 0,
                  rows: this.pageInfo?.rows ?? DEFAULT_PAGE_SIZE,
                },
              }
              :
              {
                resultList: this.data,
                paginationParams: this.pageInfo,
              },
            )),
            tap((response) => {
              this.data = response.resultList ?? [];
              this._pageInfoSubject.next(response.paginationParams);
            }),
            finalize(() => this._loadingSubject.next(false)),
          );
        }),
      ).subscribe();
  }
}
