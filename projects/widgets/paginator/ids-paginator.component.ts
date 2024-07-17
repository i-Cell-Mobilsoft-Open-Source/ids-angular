import { DEFAULT_PAGE_SIZE, IDS_PAGINATOR_DEFAULT_OPTIONS, IDS_PAGINATOR_DEFAULT_OPTIONS_FACTORY } from './ids-paginator-default-options';
import { IdsPaginatorIntl } from './ids-paginator-intl';
import { PaginatorPageEvent } from './types/paginator-events';
import { PaginatorVariantType } from './types/paginator-variant';

import { ChangeDetectorRef, Component, computed, EventEmitter, HostBinding, inject, Injector, Input, input, numberAttribute, OnDestroy, Output, signal, ViewEncapsulation } from '@angular/core';
import { createHostClassList, SizeType } from '@i-cell/ids-angular/core';
import { mdiPageFirst, mdiPagePrevious, mdiPageNext, mdiPageLast } from '@mdi/js';
import { Subscription } from 'rxjs';

let nextUniqueId = 0;

const defaultOptions = IDS_PAGINATOR_DEFAULT_OPTIONS_FACTORY();

@Component({
  selector: 'ids-paginator',
  standalone: true,
  imports: [],
  templateUrl: './ids-paginator.component.html',
  styleUrl: './ids-paginator.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class IdsPaginatorComponent implements OnDestroy {
  private readonly _componentClass = 'ids-paginator';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _injector = inject(Injector);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...this._injector.get(IDS_PAGINATOR_DEFAULT_OPTIONS, null, { optional: true }),
  };

  public readonly intl = this._injector.get(IdsPaginatorIntl);

  public id = input<string>(this._uniqueId);
  public pageSize = input<number>(this._defaultOptions.pageSize);
  public pageSizeOptions = input<number[]>(this._defaultOptions.pageSizeOptions);
  public showFirstLastLink = input<boolean>(this._defaultOptions.showFirstLastLink);
  public showPageInfo = input<boolean>(this._defaultOptions.showPageInfo);
  public showPageLinks = input<boolean>(this._defaultOptions.showPageLinks);
  public size = input<SizeType>(this._defaultOptions.size);
  public variant = input<PaginatorVariantType>(this._defaultOptions.variant);
  public length = input.required<number, number>({ transform: numberAttribute });
  public disabled = input<boolean>(false);

  private _hostClasses = computed(() => createHostClassList(this._componentClass, [
    this.size(),
    this.variant(),
  ]),
  );

  private _intlChanges?: Subscription;

  public safePageSize = computed(() => {
    const pageSize = this.pageSize();
    if (!pageSize) {
      return this.pageSizeOptions().length !== 0 ? this.pageSizeOptions()[0] : DEFAULT_PAGE_SIZE;
    }
    return pageSize;
  });

  public safePageSizeOptions = computed(() => {
    const pageSize = this.pageSize();
    const safePageSizeOptions = this.pageSizeOptions().slice();
    if (!safePageSizeOptions.includes(pageSize)) {
      safePageSizeOptions.push(pageSize);
    }
    return safePageSizeOptions.sort((a, b) => a - b);
  });

  @Input({ transform: numberAttribute })
  get pageIndex(): number {
    return this._pageIndex();
  }

  set pageIndex(value: number) {
    this._pageIndex.set(Math.max(value || 0, 0));
  }

  private _pageIndex = signal(0);

  private _getNumberOfPages = computed(() => {
    if (!this.pageSize()) {
      return 0;
    }
    return Math.ceil(this.length() / this.pageSize());
  });

  private _hasPreviousPage = computed(() =>
    this._pageIndex() >= 1 && this.pageSize() !== 0,
  );

  private _hasNextPage = computed(() => {
    const maxPageIndex = this._getNumberOfPages() - 1;
    return this._pageIndex() < maxPageIndex && this.pageSize() !== 0;
  });

  public isPreviousLinkDisabled = computed(() => this.disabled() || this._hasPreviousPage());
  public isNextLinkDisabled = computed(() => this.disabled() || this._hasNextPage());

  @Output() public readonly page: EventEmitter<PaginatorPageEvent> = new EventEmitter<PaginatorPageEvent>();

  public navigationIcon = {
    first: mdiPageFirst,
    prev: mdiPagePrevious,
    next: mdiPageNext,
    last: mdiPageLast,
  };

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  constructor() {
    this._intlChanges = this.intl.changes.subscribe(() => this._changeDetectorRef.markForCheck());
  }

  public stepNextPage(): void {
    if (!this._hasNextPage()) {
      return;
    }

    const previousPageIndex = this._pageIndex();
    this._pageIndex.update((val) => val + 1);
    this._emitPageEvent(previousPageIndex);
  }

  public stepPreviousPage(): void {
    if (!this._hasPreviousPage()) {
      return;
    }

    const previousPageIndex = this._pageIndex();
    this._pageIndex.update((val) => val - 1);
    this._emitPageEvent(previousPageIndex);
  }

  public stepFirstPage(): void {
    if (!this._hasPreviousPage()) {
      return;
    }

    const previousPageIndex = this._pageIndex();
    this._pageIndex.set(0);
    this._emitPageEvent(previousPageIndex);
  }

  public stepLastPage(): void {
    if (!this._hasNextPage()) {
      return;
    }

    const previousPageIndex = this._pageIndex();
    this._pageIndex.set(this._getNumberOfPages() - 1);
    this._emitPageEvent(previousPageIndex);
  }

  private _emitPageEvent(previousPageIndex: number): void {
    this.page.emit({
      previousPageIndex,
      pageIndex: this._pageIndex(),
      pageSize: this.pageSize(),
      length: this.length(),
    });
  }

  public ngOnDestroy(): void {
    this._intlChanges?.unsubscribe();
  }
}
