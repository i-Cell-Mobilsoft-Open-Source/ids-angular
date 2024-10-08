import { DEFAULT_PAGE_SIZE, IDS_PAGINATOR_DEFAULT_CONFIG, IDS_PAGINATOR_DEFAULT_CONFIG_FACTORY } from './paginator-defaults';
import { IdsPaginatorIntl } from './paginator-intl';
import { PaginatorPageButtonAppearanceType } from './types/paginator-appearance';
import { PaginatorPageEvent } from './types/paginator-events';
import { PaginatorVariantType } from './types/paginator-variant';

import { ChangeDetectorRef, Component, computed, ElementRef, EventEmitter, HostBinding, HostListener, inject, Injector, Input, input, isDevMode, numberAttribute, OnDestroy, Output, signal, ViewEncapsulation } from '@angular/core';
import { createClassList, isNumberEven, SizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { debounceTime, Subject, Subscription } from 'rxjs';

let nextUniqueId = 0;

const defaultOptions = IDS_PAGINATOR_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-paginator',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './paginator.component.html',
  encapsulation: ViewEncapsulation.None,
})
export class IdsPaginatorComponent implements OnDestroy {
  /** @ignore */
  private readonly _componentClass = 'ids-paginator';
  /** @ignore */
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  /** @ignore */
  private readonly _injector = inject(Injector);
  /** @ignore */
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  /** @ignore */
  private readonly _hostElementRef = inject(ElementRef);
  /** @ignore */
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...this._injector.get(IDS_PAGINATOR_DEFAULT_CONFIG, null, { optional: true }),
  };

  /** @ignore */
  private _pageEventDebouncer = new Subject<PaginatorPageEvent>();
  /** @ignore */
  private _pageEventDebouncerSubscription = new Subscription();

  /** @ignore */
  public readonly intl = this._injector.get(IdsPaginatorIntl);

  public id = input<string>(this._uniqueId);
  public pageSize = input<number>(this._defaultOptions.pageSize);
  public pageSizeOptions = input<number[]>(this._defaultOptions.pageSizeOptions);
  public showFirstLastButton = input<boolean>(this._defaultOptions.showFirstLastButton);
  public showPrevNextLabel = input<boolean>(this._defaultOptions.showPrevNextLabel);
  public showPageInfo = input<boolean>(this._defaultOptions.showPageInfo);
  public showPageButtons = input<boolean>(this._defaultOptions.showPageButtons);
  public showAllPages = input<boolean>(this._defaultOptions.showAllPages);
  public maxDisplayedItemCount = input<number>(this._defaultOptions.maxDisplayedItemCount);
  public size = input<SizeType>(this._defaultOptions.size);
  public variant = input<PaginatorVariantType>(this._defaultOptions.variant);
  public pageButtonAppearance = input<PaginatorPageButtonAppearanceType>(this._defaultOptions.pageButtonAppearance);
  public length = input.required<number, number>({ transform: numberAttribute });
  public disabled = input<boolean>(false);
  public compactLayout = input<boolean>(false);

  /** @ignore */
  private _hostClasses = computed(() => createClassList(
    this._componentClass,
    [
      this.size(),
      this.variant(),
      this.compactLayout() ? 'compact-layout' : null,
    ]),
  );

  /** @ignore */
  public pageButtonClasses = computed(() => createClassList('ids-paginator__page-button', [this.pageButtonAppearance()]));

  /** @ignore */
  private _intlChanges?: Subscription;

  /** @ignore */
  public safePageSizeData = computed(() => this._getSafePageSizeData(this.pageSizeOptions(), this.pageSize()));
  /** @ignore */
  public pageButtonIdPrefix = computed(() => `${this.id()}__page-button-`);

  /** @ignore */
  @Input({ transform: numberAttribute })
  get pageIndex(): number {
    return this._pageIndex();
  }

  set pageIndex(value: number) {
    this._pageIndex.set(Math.max(value || 0, 0));
  }

  /** @ignore */
  private _pageIndex = signal(0);

  /** @ignore */
  private _getNumberOfPages = computed(() => {
    if (!this.pageSize()) {
      return 0;
    }
    return Math.ceil(this.length() / this.pageSize());
  });

  /** @ignore */
  private _hasPreviousPage = computed(() =>
    this._pageIndex() >= 1 && this.pageSize() !== 0,
  );

  /** @ignore */
  private _hasNextPage = computed(() => {
    const maxPageIndex = this._getNumberOfPages() - 1;
    return this._pageIndex() < maxPageIndex && this.pageSize() !== 0;
  });

  /** @ignore */
  public isPreviousButtonDisabled = computed(() => this.disabled() || !this._hasPreviousPage());
  /** @ignore */
  public isNextButtonDisabled = computed(() => this.disabled() || !this._hasNextPage());

  /** @ignore */
  // eslint-disable-next-line arrow-body-style
  public pageButtonLabels = computed<string[]>(() => {
    return this.compactLayout()
      ? []
      : this._getPageButtonLabels(this._pageIndex(), this._getNumberOfPages(), this.showAllPages(), this.maxDisplayedItemCount());
  });

  /** @ignore */
  @Output() public readonly page: EventEmitter<PaginatorPageEvent> = new EventEmitter<PaginatorPageEvent>();

  /** @ignore */
  @HostBinding('class') get hostClasses(): string {
    return this._hostClasses();
  }

  /** @ignore */
  @HostBinding('id') get hostId(): string {
    return this.id();
  }

  /** @ignore */
  @HostListener('keydown', ['$event']) public handleKeyDown(event: KeyboardEvent): void {
    event.stopPropagation();
    // eslint-disable-next-line @stylistic/js/array-bracket-newline, @stylistic/js/array-element-newline
    const navigationKeys = ['ArrowLeft', 'ArrowRight', 'PageDown', 'PageUp', 'Home', 'End'];

    switch (event.key) {
      case 'ArrowLeft':
      case 'PageDown':
        event.preventDefault();
        this.stepPreviousPage();
        break;
      case 'ArrowRight':
      case 'PageUp':
        event.preventDefault();
        this.stepNextPage();
        break;
      case 'Home':
        event.preventDefault();
        this.stepFirstPage();
        break;
      case 'End':
        event.preventDefault();
        this.stepLastPage();
        break;
      default:
        break;
    }

    if (event.key !== 'Tab' && navigationKeys.includes(event.key)) {
      const pageButtonId = `${this.pageButtonIdPrefix()}${this._pageIndex() + 1}`; // after navigation pageIndex is new value now
      const button = this._hostElementRef.nativeElement.querySelector(`button#${pageButtonId}`);
      button?.focus();
    }
  }

  constructor() {
    this._intlChanges = this.intl.changes.subscribe(() => this._changeDetectorRef.markForCheck());
    this._pageEventDebouncerSubscription = this._pageEventDebouncer.pipe(
      debounceTime(this._defaultOptions.debounceTime),
    ).subscribe((pageEvent) => {
      this.page.emit(pageEvent);
    });
  }

  /** @ignore */
  private _getSafePageSizeData(
    pageSizeOptions: number[],
    pageSize: number,
  ): { safePageSizeOptions: number[], safePageSize: number } {
    if (isDevMode() && (!pageSize || pageSize < 0)) {
      throw new Error('Paginator: invalid pageSize value. Must be a number and greater than 0');
    }

    const safePageSizeOptions = pageSizeOptions.slice();
    if (isDevMode() && !safePageSizeOptions.includes(pageSize)) {
      throw new Error('Paginator: invalid pageSize. pageSizeOptions not includes pageSize. Use an item from pageSizeOptions.');
    }
    safePageSizeOptions.sort((a, b) => a - b);
    const safePageSize: number = safePageSizeOptions.length !== 0 ? safePageSizeOptions[0] : DEFAULT_PAGE_SIZE;

    return {
      safePageSize,
      safePageSizeOptions,
    };
  }

  /** @ignore */
  private _getPageButtonLabels(pageIndex: number, numberOfPages: number, showAllPages: boolean, maxDisplayedItemCount: number): string[] {
    const allPages = [...Array(numberOfPages).keys()].map((item) => (item + 1).toString());
    return showAllPages ? allPages : this._getTruncatedPageLabels(allPages, pageIndex, maxDisplayedItemCount);
  }

  /** @ignore */
  private _getTruncatedPageLabels(
    allPages: string[],
    pageIndex: number,
    maxDisplayedItemCount: number,
  ): string[] {
    if (isDevMode() && isNumberEven(maxDisplayedItemCount)) {
      throw new Error('Paginator: maxDisplayedItemCount should be an odd number');
    }
    const center = Math.ceil(maxDisplayedItemCount / 2);
    const actualPage = pageIndex + 1;
    const lastPage = +(allPages.at(-1) as string);
    const isTruncatedRight = actualPage <= center;
    const isTruncatedBoth = actualPage > center && actualPage <= lastPage - center;
    const isTruncatedLeft = actualPage > lastPage - center;
    const truncation = '...';

    if (isTruncatedRight) {
      const x = maxDisplayedItemCount - 2; // 2 = 1 last page, 1 truncation
      return [
        ...allPages.slice(0, x),
        truncation,
        lastPage.toString(),
      ];
    }

    if (isTruncatedBoth) {
      // eslint-disable-next-line no-magic-numbers
      const x = (maxDisplayedItemCount - 5) / 2; // 5 = 1 fist page + 1 last page + 2 truncation + 1 actual page
      return [
        '1',
        truncation,
        ...allPages.slice(pageIndex - x, pageIndex + x + 1),
        truncation,
        lastPage.toString(),
      ];
    }

    if (isTruncatedLeft) {
      const x = maxDisplayedItemCount - 2; // 2 = 1 last page, 1 truncation
      return [
        '1',
        truncation,
        ...allPages.slice(lastPage - x),
      ];
    }

    return [];
  }

  /** @ignore */
  public stepNextPage(): void {
    if (!this._hasNextPage()) {
      return;
    }
    this.stepPage(this._pageIndex() + 1);
  }

  /** @ignore */
  public stepPreviousPage(): void {
    if (!this._hasPreviousPage()) {
      return;
    }
    this.stepPage(this._pageIndex() - 1);
  }

  /** @ignore */
  public stepFirstPage(): void {
    if (!this._hasPreviousPage()) {
      return;
    }
    this.stepPage(0);
  }

  /** @ignore */
  public stepLastPage(): void {
    if (!this._hasNextPage()) {
      return;
    }
    this.stepPage(this._getNumberOfPages() - 1);
  }

  /** @ignore */
  public stepPage(pageIndex: number): void {
    const previousPageIndex = this._pageIndex();
    this._pageIndex.set(pageIndex);
    this._debouncePageEvent(previousPageIndex, pageIndex);
  }

  /** @ignore */
  private _debouncePageEvent(previousPageIndex: number, pageIndex: number): void {
    this._pageEventDebouncer.next({
      previousPageIndex,
      pageIndex,
      pageSize: this.pageSize(),
      length: this.length(),
    });
  }

  /** @ignore */
  public ngOnDestroy(): void {
    this._intlChanges?.unsubscribe();
    this._pageEventDebouncerSubscription.unsubscribe();
  }
}
