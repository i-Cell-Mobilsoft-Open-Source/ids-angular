import { IdsCalendarPage } from './calendar-page';

import { IdsDatepickerIntl } from '../datepicker-intl';
import { IdsDaySelectorComponent } from '../day-selector/day-selector.component';
import { IdsMonthSelectorComponent } from '../month-selector/month-selector.component';
import { IdsDatepickerView, IdsDatepickerViewType } from '../tokens/datepicker-view';
import { IdsYearSelectorComponent } from '../year-selector/year-selector.component';

import { CdkTrapFocus } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, input, linkedSignal, OnInit, output, viewChild, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { clampDate, ComponentBaseWithDefaults, IdsSize, IdsSizeType, isValidDate, startOfMonth, startOfYear } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';

@Component({
  selector: 'ids-calendar',
  imports: [
    IdsButtonComponent,
    IdsIconComponent,
    IdsIconButtonComponent,
    IdsDaySelectorComponent,
    IdsMonthSelectorComponent,
    IdsYearSelectorComponent,
  ],
  templateUrl: './calendar.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  hostDirectives: [CdkTrapFocus],
  host: {
    'class': 'ids-calendar-surface',
  },
})
export class IdsCalendarComponent extends ComponentBaseWithDefaults<object> implements OnInit {
  protected readonly _defaultConfig = {};
  protected override get _hostName(): string {
    return 'calendar';
  }

  private _cdRef = inject(ChangeDetectorRef);
  private _intl = inject(IdsDatepickerIntl);

  public value = input<Date | null>(null);
  public size = input.required<IdsSizeType>();
  public view = input.required<IdsDatepickerViewType>();
  public min = input<Date | null>(null);
  public max = input<Date | null>(null);

  public selected = output<Date>();
  public monthSelected = output<Date>();
  public yearSelected = output<Date>();

  private _calendarPage = viewChild(IdsCalendarPage);

  protected _view = linkedSignal(() => this.view());

  protected _hostClasses = computed(() => this._getHostClasses([this.size()]));

  protected _headerButtonSize = computed(() => (this.size() === IdsSize.DENSE ? IdsSize.COMPACT : this.size()));
  protected _headerLabel = computed<string>(() => this._calendarPage()?.headerLabel() ?? '');

  protected _prevPageLabel = computed<string>(() => {
    switch (this._view()) {
      case IdsDatepickerView.DAY:
        return this._intl.prevMonthLabel;
      case IdsDatepickerView.MONTH:
        return this._intl.prevYearLabel;
      case IdsDatepickerView.YEAR:
        return this._intl.prevYearsPageLabel;
    }
  });

  protected _nextPageLabel = computed<string>(() => {
    switch (this._view()) {
      case IdsDatepickerView.DAY:
        return this._intl.nextMonthLabel;
      case IdsDatepickerView.MONTH:
        return this._intl.nextYearLabel;
      case IdsDatepickerView.YEAR:
        return this._intl.nextYearsPageLabel;
    }
  });

  protected _switchViewLabel = computed<string>(() => (
    this._view() === IdsDatepickerView.DAY ? this._intl.switchToYearSelectorLabel : this._intl.switchToDaySelectorLabel
  ));

  protected _focusedDate: Date = new Date();

  public ngOnInit(): void {
    this._intl.changes.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => this._cdRef.markForCheck());
    this._setFocusedDate(this.value());
  }

  protected _selectYear(selectedYear: Date): void {
    this._setFocusedDate(selectedYear);
    this.yearSelected.emit(startOfYear(selectedYear));
    this._view.set(IdsDatepickerView.MONTH);
  }

  protected _selectMonth(selectedMonth: Date): void {
    this._setFocusedDate(selectedMonth);
    this.monthSelected.emit(startOfMonth(selectedMonth));
    this._view.set(IdsDatepickerView.DAY);
  }

  protected _selectDate(date: Date): void {
    this.selected.emit(date);
  }

  protected _hasPrevPage(): boolean {
    return this._calendarPage()?.hasPreviousPage() ?? true;
  }

  protected _gotoPrevPage(): void {
    this._calendarPage()!.gotoPreviousPage();
  }

  protected _hasNextPage(): boolean {
    return this._calendarPage()?.hasNextPage() ?? true;
  }

  protected _gotoNextPage(): void {
    this._calendarPage()!.gotoNextPage();
  }

  protected _switchView(): void {
    switch (this._view()) {
      case IdsDatepickerView.DAY:
        this._view.set(IdsDatepickerView.YEAR);
        break;
      case IdsDatepickerView.YEAR:
      case IdsDatepickerView.MONTH:
        this._view.set(IdsDatepickerView.DAY);
        break;
    }
  }

  private _setFocusedDate(date: Date | null): void {
    const safeValue = isValidDate(date) ? date : new Date();
    this._focusedDate = clampDate(safeValue, this.min(), this.max());
    this._cdRef.markForCheck();
  }
}
