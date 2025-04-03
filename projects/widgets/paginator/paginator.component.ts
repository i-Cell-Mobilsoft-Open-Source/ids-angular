import { DEFAULT_PAGE_SIZE, IDS_PAGINATOR_DEFAULT_CONFIG, IDS_PAGINATOR_DEFAULT_CONFIG_FACTORY, IdsPaginatorDefaultConfig } from './paginator-defaults';
import { IdsPaginatorIntl } from './paginator-intl';
import { IdsPaginatorPageButtonAppearanceType } from './types/paginator-appearance.type';
import { IdsPaginatorPageChangeEvent } from './types/paginator-events.class';
import { IdsPaginatorVariantType } from './types/paginator-variant.type';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, effect, ElementRef, inject, input, isDevMode, model, output, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { createClassList, isNumberEven, IdsSizeType, coerceNumberAttribute, ComponentBaseWithDefaults } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { debounceTime, Subject } from 'rxjs';

const defaultConfig = IDS_PAGINATOR_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-paginator',
  imports: [IdsIconComponent],
  templateUrl: './paginator.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '(keydown)': '_handleKeyDown($event)',
  },
})
export class IdsPaginatorComponent extends ComponentBaseWithDefaults<IdsPaginatorDefaultConfig> {
  protected override get _hostName(): string {
    return 'paginator';
  }

  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _hostElementRef = inject(ElementRef);
  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_PAGINATOR_DEFAULT_CONFIG);

  private _pageEventDebouncer = new Subject<IdsPaginatorPageChangeEvent>();

  protected readonly _intl = inject(IdsPaginatorIntl);

  public pageSize = input<number, unknown>(this._defaultConfig.pageSize, { transform: coerceNumberAttribute });
  public pageSizeOptions = input<number[]>(this._defaultConfig.pageSizeOptions);
  public showFirstLastButton = input<boolean>(this._defaultConfig.showFirstLastButton);
  public showPrevNextLabel = input<boolean>(this._defaultConfig.showPrevNextLabel);
  public showPageInfo = input<boolean>(this._defaultConfig.showPageInfo);
  public showPageButtons = input<boolean>(this._defaultConfig.showPageButtons);
  public showAllPages = input<boolean>(this._defaultConfig.showAllPages);
  public maxDisplayedItemCount = input<number>(this._defaultConfig.maxDisplayedItemCount);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsPaginatorVariantType>(this._defaultConfig.variant);
  public pageButtonAppearance = input<IdsPaginatorPageButtonAppearanceType>(this._defaultConfig.pageButtonAppearance);
  /** The total number of items that are being paginated. */
  public length = input.required<number, number>({ transform: coerceNumberAttribute });
  public disabled = input<boolean>(false);
  public compactLayout = input<boolean>(false);

  protected _hostClasses = computed(() => this._getHostClasses([
    this.size(),
    this.variant(),
    this.compactLayout() ? 'compact-layout' : null,
  ]));

  protected _pageButtonClasses = computed(() => createClassList('ids-paginator__page-button', [this.pageButtonAppearance()]));

  protected _safePageSizeData = computed(() => this._getSafePageSizeData(this.pageSizeOptions(), this.pageSize()));
  protected _pageButtonIdPrefix = computed(() => `${this.id()}__page-button-`);

  /**
   * The index (0 based!) of the currently selected page.
   *
   * Usage note (!):
   * In case paging initiates an async process to update the data and an error occurs the pageIndex needs to be reset to the previous value from the outside.
   * If `pageIndex` is only 1-way bound (input) the model signal's value won't be updated, it needs 2-way binding!
   * Possible cause: https://github.com/angular/angular/issues/57124
   */
  public pageIndex = model(0);

  private _pageIndexValidation = effect(() => {
    const pageIndex = this._pageIndex();
    const numberOfPages = this._numberOfPages();
    if (pageIndex > 0 && numberOfPages < (pageIndex + 1)) {
      this.stepPage(0);
    }
  });

  protected _pageIndex = computed(() => Math.max(coerceNumberAttribute(this.pageIndex()) || 0, 0));

  private _numberOfPages = computed(() => {
    if (!this.pageSize()) {
      return 0;
    }
    return Math.ceil(this.length() / this.pageSize());
  });

  private _hasPreviousPage = computed(() =>
    this._pageIndex() >= 1 && this.pageSize() !== 0,
  );

  private _hasNextPage = computed(() => {
    const maxPageIndex = this._numberOfPages() - 1;
    return this._pageIndex() < maxPageIndex && this.pageSize() !== 0;
  });

  protected _isPreviousButtonDisabled = computed(() => this.disabled() || !this._hasPreviousPage());
  protected _isNextButtonDisabled = computed(() => this.disabled() || !this._hasNextPage());

  // eslint-disable-next-line arrow-body-style
  protected _pageButtonLabels = computed<string[]>(() => {
    return this.compactLayout()
      ? []
      : this._getPageButtonLabels(
        this._pageIndex(), this._numberOfPages(), this.showAllPages(), this.maxDisplayedItemCount(), this.showPageButtons(),
      );
  });

  public pageChanged = output<IdsPaginatorPageChangeEvent>();

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
      const pageButtonId = `${this._pageButtonIdPrefix()}${this._pageIndex() + 1}`; // after navigation pageIndex is new value now
      const button = this._hostElementRef.nativeElement.querySelector(`button#${pageButtonId}`);
      button?.focus();
    }
  }

  constructor() {
    super();

    this._intl.changes.pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe(() => this._changeDetectorRef.markForCheck());

    this._pageEventDebouncer.pipe(
      debounceTime(this._defaultConfig.debounceTime),
      takeUntilDestroyed(this._destroyRef),
    ).subscribe((pageEvent) => {
      this.pageChanged.emit(pageEvent);
    });
  }

  private _getSafePageSizeData(
    pageSizeOptions: number[],
    pageSize: number,
  ): { safePageSizeOptions: number[], safePageSize: number } {
    if (isDevMode() && (!pageSize || pageSize < 0)) {
      throw this._createHostError('invalid pageSize value. Must be a number and greater than 0');
    }

    const safePageSizeOptions = pageSizeOptions.slice();
    if (isDevMode() && !safePageSizeOptions.includes(pageSize)) {
      throw this._createHostError('invalid pageSize. pageSizeOptions not includes pageSize. Use an item from pageSizeOptions.');
    }
    safePageSizeOptions.sort((a, b) => a - b);
    const safePageSize: number = safePageSizeOptions.length !== 0 ? safePageSizeOptions[0] : DEFAULT_PAGE_SIZE;

    return {
      safePageSize,
      safePageSizeOptions,
    };
  }

  private _getPageButtonLabels(
    pageIndex: number, numberOfPages: number, showAllPages: boolean, maxDisplayedItemCount: number, enabled: boolean,
  ): string[] {
    const allPages = [...Array(numberOfPages).keys()].map((item) => (item + 1).toString());
    if (!enabled) {
      return [];
    }
    if (showAllPages || numberOfPages <= maxDisplayedItemCount) {
      return allPages;
    }

    return this._getTruncatedPageLabels(allPages, pageIndex, maxDisplayedItemCount);
  }

  private _getTruncatedPageLabels(
    allPages: string[],
    pageIndex: number,
    maxDisplayedItemCount: number,
  ): string[] {
    if (isDevMode() && isNumberEven(maxDisplayedItemCount)) {
      throw this._createHostError('maxDisplayedItemCount should be an odd number');
    }
    const center = Math.ceil(maxDisplayedItemCount / 2);
    const actualPage = pageIndex + 1;
    const lastPage = +(allPages.at(-1)!);
    const isTruncatedRight = actualPage <= center;
    const isTruncatedBoth = actualPage > center && actualPage <= lastPage - center;
    const isTruncatedLeft = actualPage > lastPage - center;

    if (isTruncatedRight) {
      const x = maxDisplayedItemCount - 2; // 2 = 1 last page, 1 truncation
      return [
        ...allPages.slice(0, x),
        'tr',
        lastPage.toString(),
      ];
    }

    if (isTruncatedBoth) {
      // eslint-disable-next-line no-magic-numbers
      const x = (maxDisplayedItemCount - 5) / 2; // 5 = 1 fist page + 1 last page + 2 truncation + 1 actual page
      return [
        '1',
        'tl',
        ...allPages.slice(pageIndex - x, pageIndex + x + 1),
        'tr',
        lastPage.toString(),
      ];
    }

    if (isTruncatedLeft) {
      const x = maxDisplayedItemCount - 2; // 2 = 1 last page, 1 truncation
      return [
        '1',
        'tl',
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
    this.stepPage(this._numberOfPages() - 1);
  }

  public stepPage(pageIndex: number): void {
    const previousPageIndex = this._pageIndex();
    this.pageIndex.set(pageIndex);
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
}
