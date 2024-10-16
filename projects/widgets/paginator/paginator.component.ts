import { DEFAULT_PAGE_SIZE, IDS_PAGINATOR_DEFAULT_CONFIG, IDS_PAGINATOR_DEFAULT_CONFIG_FACTORY } from './paginator-defaults';
import { IdsPaginatorIntl } from './paginator-intl';
import { IdsPaginatorPageButtonAppearanceType } from './types/paginator-appearance.type';
import { IdsPaginatorPageEvent } from './types/paginator-events.class';
import { IdsPaginatorVariantType } from './types/paginator-variant.type';

import { ChangeDetectorRef, Component, computed, ElementRef, EventEmitter, inject, Input, input, isDevMode, numberAttribute, OnDestroy, Output, signal, ViewEncapsulation } from '@angular/core';
import { createClassList, isNumberEven, IdsSizeType } from '@i-cell/ids-angular/core';
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
  host: {
    '[id]': 'id()',
    '[class]': '_hostClasses()',
    '(keydown)': '_handleKeyDown($event)',
  },
})
export class IdsPaginatorComponent implements OnDestroy {
  private readonly _componentClass = 'ids-paginator';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _hostElementRef = inject(ElementRef);
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...inject(IDS_PAGINATOR_DEFAULT_CONFIG, { optional: true }),
  };

  private _pageEventDebouncer = new Subject<IdsPaginatorPageEvent>();
  private _pageEventDebouncerSubscription = new Subscription();

  public readonly intl = inject(IdsPaginatorIntl);

  public id = input<string>(this._uniqueId);
  public pageSize = input<number>(this._defaultOptions.pageSize);
  public pageSizeOptions = input<number[]>(this._defaultOptions.pageSizeOptions);
  public showFirstLastButton = input<boolean>(this._defaultOptions.showFirstLastButton);
  public showPrevNextLabel = input<boolean>(this._defaultOptions.showPrevNextLabel);
  public showPageInfo = input<boolean>(this._defaultOptions.showPageInfo);
  public showPageButtons = input<boolean>(this._defaultOptions.showPageButtons);
  public showAllPages = input<boolean>(this._defaultOptions.showAllPages);
  public maxDisplayedItemCount = input<number>(this._defaultOptions.maxDisplayedItemCount);
  public size = input<IdsSizeType>(this._defaultOptions.size);
  public variant = input<IdsPaginatorVariantType>(this._defaultOptions.variant);
  public pageButtonAppearance = input<IdsPaginatorPageButtonAppearanceType>(this._defaultOptions.pageButtonAppearance);
  public length = input.required<number, number>({ transform: numberAttribute });
  public disabled = input<boolean>(false);
  public compactLayout = input<boolean>(false);

  private _hostClasses = computed(() => createClassList(
    this._componentClass,
    [
      this.size(),
      this.variant(),
      this.compactLayout() ? 'compact-layout' : null,
    ]),
  );

  public pageButtonClasses = computed(() => createClassList('ids-paginator__page-button', [this.pageButtonAppearance()]));

  private _intlChanges?: Subscription;

  public safePageSizeData = computed(() => this._getSafePageSizeData(this.pageSizeOptions(), this.pageSize()));
  public pageButtonIdPrefix = computed(() => `${this.id()}__page-button-`);

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

  public isPreviousButtonDisabled = computed(() => this.disabled() || !this._hasPreviousPage());
  public isNextButtonDisabled = computed(() => this.disabled() || !this._hasNextPage());

  // eslint-disable-next-line arrow-body-style
  public pageButtonLabels = computed<string[]>(() => {
    return this.compactLayout()
      ? []
      : this._getPageButtonLabels(this._pageIndex(), this._getNumberOfPages(), this.showAllPages(), this.maxDisplayedItemCount());
  });

  @Output() public readonly page: EventEmitter<IdsPaginatorPageEvent> = new EventEmitter<IdsPaginatorPageEvent>();

  private _handleKeyDown(event: KeyboardEvent): void {
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

  private _getPageButtonLabels(pageIndex: number, numberOfPages: number, showAllPages: boolean, maxDisplayedItemCount: number): string[] {
    const allPages = [...Array(numberOfPages).keys()].map((item) => (item + 1).toString());
    return showAllPages ? allPages : this._getTruncatedPageLabels(allPages, pageIndex, maxDisplayedItemCount);
  }

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

  public stepNextPage(): void {
    if (!this._hasNextPage()) {
      return;
    }
    this.stepPage(this._pageIndex() + 1);
  }

  public stepPreviousPage(): void {
    if (!this._hasPreviousPage()) {
      return;
    }
    this.stepPage(this._pageIndex() - 1);
  }

  public stepFirstPage(): void {
    if (!this._hasPreviousPage()) {
      return;
    }
    this.stepPage(0);
  }

  public stepLastPage(): void {
    if (!this._hasNextPage()) {
      return;
    }
    this.stepPage(this._getNumberOfPages() - 1);
  }

  public stepPage(pageIndex: number): void {
    const previousPageIndex = this._pageIndex();
    this._pageIndex.set(pageIndex);
    this._debouncePageEvent(previousPageIndex, pageIndex);
  }

  private _debouncePageEvent(previousPageIndex: number, pageIndex: number): void {
    this._pageEventDebouncer.next({
      previousPageIndex,
      pageIndex,
      pageSize: this.pageSize(),
      length: this.length(),
    });
  }

  public ngOnDestroy(): void {
    this._intlChanges?.unsubscribe();
    this._pageEventDebouncerSubscription.unsubscribe();
  }
}
