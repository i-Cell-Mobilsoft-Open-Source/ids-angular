import { IdsCalendarComponent } from './calendar/calendar.component';
import { IDS_DATEPICKER_DEFAULT_CONFIG, IDS_DATEPICKER_DEFAULT_CONFIG_FACTORY, IdsDatepickerDefaultConfig } from './datepicker-defaults';
import { datepickerConnectedPositions } from './datepicker-positions';
import { IDS_DATE_FORMATTER } from './tokens/date-formatter';
import { IDS_DATE_PARSER } from './tokens/date-parser';
import { IdsDatepickerViewType } from './tokens/datepicker-view';

import { hasModifierKey } from '@angular/cdk/keycodes';
import { Overlay, OverlayConfig, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { afterNextRender, booleanAttribute, ComponentRef, Directive, effect, ElementRef, forwardRef, inject, Injector, input, OnChanges, output, signal, SimpleChanges, ViewContainerRef } from '@angular/core';
import { AbstractControl, ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator, ValidatorFn, Validators } from '@angular/forms';
import { compareDates, deserializeDate, DirectiveBaseWithDefaults, equalDates, getValidDateOrNull, isValidDate } from '@i-cell/ids-angular/core';
import { IdsFormFieldComponent } from '@i-cell/ids-angular/forms';
import { filter, merge, Observable, Subscription } from 'rxjs';

const defaultConfig = IDS_DATEPICKER_DEFAULT_CONFIG_FACTORY();

@Directive({
  selector: 'input[idsDatepicker]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdsDatepickerDirective),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => IdsDatepickerDirective),
      multi: true,
    },
  ],
  host: {
    '[disabled]': 'disabled',
    '(input)': '_handleInput($event.target.value)',
    '(blur)': '_handleBlur()',
    '(keydown)': '_handleKeydown($event)',
  },
  exportAs: 'idsDatepicker',
})
export class IdsDatepickerDirective extends DirectiveBaseWithDefaults<IdsDatepickerDefaultConfig>
  implements OnChanges, ControlValueAccessor, Validator {

  protected override _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_DATEPICKER_DEFAULT_CONFIG);
  protected override _hostClasses = signal('');

  private _viewContainerRef = inject(ViewContainerRef);
  private _elementRef = inject(ElementRef);
  private _parent = inject(IdsFormFieldComponent);
  private _overlay = inject(Overlay);
  private _injector = inject(Injector);

  public formatter = input(inject(IDS_DATE_FORMATTER));
  public parser = input(inject(IDS_DATE_PARSER));

  public view = input<IdsDatepickerViewType>(this._defaultConfig.view);
  public minDate = input(null, { transform: (value: unknown) => getValidDateOrNull(deserializeDate(value)) });
  public maxDate = input(null, { transform: (value: unknown) => getValidDateOrNull(deserializeDate(value)) });

  private _inputChanges = effect(() => {
    const min = this.minDate();
    const max = this.maxDate();
    const view = this.view();
    const size = this._parent.size();
    const calendar = this._componentRef?.instance;

    if (!calendar) {
      return;
    }

    if (!equalDates(min, calendar.min())) {
      this._componentRef?.setInput('min', min);
    }
    if (!equalDates(max, calendar.max())) {
      this._componentRef?.setInput('max', max);
    }
    if (view !== calendar.view()) {
      this._componentRef?.setInput('view', view);
    }
    if (size !== calendar.size()) {
      this._componentRef?.setInput('size', size);
    }
  });

  public openedInput = input<boolean, unknown>(false, { transform: booleanAttribute, alias: 'opened' });
  private _opened = signal(this.openedInput() ?? false);
  public opened = this._opened.asReadonly();

  public monthSelected = output<Date>();
  public yearSelected = output<Date>();

  private _onChange: (value: unknown) => void = () => {};
  private _onTouched: () => void = () => {};
  private _onValidatorChange: () => void = () => {};

  private _overlayRef: OverlayRef | null = null;
  private _componentRef: ComponentRef<IdsCalendarComponent> | null = null;
  private _scrollStrategy = this._overlay.scrollStrategies.reposition();

  private _overlayCloseSub = Subscription.EMPTY;

  public get value(): Date | null {
    return deserializeDate(this._parent.controlDir()?.value);
  }

  private _isValid = signal(false);

  private _dateFormatValidator: ValidatorFn = (): ValidationErrors | null => (this._isValid() ? null : { idsDateFormat: true });

  private _minValidator: ValidatorFn = (): ValidationErrors | null => {
    const current = getValidDateOrNull(deserializeDate(this.value));
    const min = this.minDate();
    return !min || !current || compareDates(min, current) <= 0 ? null : { 'idsDateMin': { min, current } };
  };

  private _maxValidator: ValidatorFn = (): ValidationErrors | null => {
    const current = getValidDateOrNull(deserializeDate(this.value));
    const max = this.maxDate();
    return !max || !current || compareDates(max, current) >= 0 ? null : { 'idsDateMax': { max, current } };
  };

  // eslint-disable-next-line @stylistic/js/array-bracket-newline, @stylistic/js/array-element-newline
  private _validator = Validators.compose([this._dateFormatValidator, this._minValidator, this._maxValidator]) as ValidatorFn;

  public ngOnChanges(changes: SimpleChanges): void {
    if ('opened' in changes) {
      if (this.openedInput()) {
        this.open();
      } else {
        this.close();
      }
    }
    if (('minDate' in changes && !changes['minDate'].firstChange) || ('maxDate' in changes && !changes['maxDate'].firstChange)) {
      this._onValidatorChange();
    }
  }

  // #region Value accessor implementation
  public writeValue(obj: unknown): void {
    this._isValid.set(this._isValidValue(deserializeDate(obj)));
    this._setInputValue(obj);
  }

  public registerOnChange(fn: () => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this._onTouched = fn;
  }
  // #endregion

  // #region Validator implementation
  public validate(control: AbstractControl): ValidationErrors | null {
    return this._validator(control);
  }

  public registerOnValidatorChange?(fn: () => void): void {
    this._onValidatorChange = fn;
  }
  // #endregion

  public open(): void {
    if (this.opened() || this._parent.disabled()) {
      return;
    }

    this._overlayRef = this._overlay.create(this._getOverlayConfig());

    this._overlayCloseSub = this._onOverlayClose(this._overlayRef).subscribe((event) => {
      event?.preventDefault();
      this.close();
    });
    this._onPageNavigationKeydown(this._overlayRef).subscribe((event) => event?.preventDefault());

    this._componentRef = this._overlayRef.attach(new ComponentPortal(IdsCalendarComponent, this._viewContainerRef));
    this._componentRef.setInput('value', this.value);
    this._componentRef.setInput('min', this.minDate());
    this._componentRef.setInput('max', this.maxDate());
    this._componentRef.setInput('view', this.view());
    this._componentRef.setInput('size', this._parent.size());

    this._componentRef.instance.selected.subscribe((selectedDate: Date) => {
      this._onChange(selectedDate);
      this._setInputValue(this.value);
      this.close();
    });
    this._componentRef.instance.monthSelected.subscribe((selectedMonth: Date) => this.monthSelected.emit(selectedMonth));
    this._componentRef.instance.yearSelected.subscribe((selectedYear: Date) => this.yearSelected.emit(selectedYear));

    this._opened.set(true);
  }

  public close(): void {
    if (!this._opened()) {
      return;
    }

    this._overlayCloseSub.unsubscribe();
    this._overlayCloseSub = Subscription.EMPTY;

    this._disposeOverlay();

    this._opened.set(false);

    afterNextRender(() => this._elementRef.nativeElement.focus(), { injector: this._injector });
  }

  private _handleInput(value: string): void {
    const parsed = this.parser()(value);

    this._isValid.set(this._isValidValue(parsed));

    const date = getValidDateOrNull(parsed);
    const valueChanged = !equalDates(date, this.value);

    if (!date || valueChanged) {
      this._onChange(date);
    }
  }

  private _handleBlur(): void {
    this._onTouched();
  }

  private _handleKeydown(event: KeyboardEvent): void {
    if (event.code === 'ArrowDown' && event.altKey && !event.ctrlKey && !event.shiftKey && !event.metaKey) {
      this.open();
    }
  }

  private _isValidValue(value: unknown): boolean {
    return !value || isValidDate(value);
  }

  private _setInputValue(value: unknown): void {
    this._elementRef.nativeElement.value = isValidDate(value) ? this.formatter()(value) : '';
  }

  private _getOverlayConfig(): OverlayConfig {
    const overlayViewportMargin = 8;
    const positionStrategy = this._overlay
      .position()
      .flexibleConnectedTo(this._parent.getConnectedOverlayOrigin())
      .withTransformOriginOn('.mat-datepicker-content')
      .withFlexibleDimensions(false)
      .withViewportMargin(overlayViewportMargin)
      .withLockedPosition()
      .withPositions(datepickerConnectedPositions);

    return {
      positionStrategy,
      hasBackdrop: true,
      backdropClass: [],
      direction: 'ltr',
      scrollStrategy: this._scrollStrategy,
      panelClass: 'ids-datepicker-panel',
    };
  }

  private _disposeOverlay(): void {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
      this._componentRef = null;
    }
  }

  private _onOverlayClose(overlayRef: OverlayRef): Observable<MouseEvent | KeyboardEvent | void> {
    return merge(
      overlayRef.backdropClick(),
      overlayRef.detachments(),
      overlayRef.keydownEvents().pipe(filter((event) => event.code === 'Escape' && !hasModifierKey(event))),
    );
  }

  private _onPageNavigationKeydown(overlayRef: OverlayRef): Observable<KeyboardEvent> {
    return overlayRef.keydownEvents().pipe(filter((event) => [
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight',
      'PageUp',
      'PageDown',
    ].includes(event.code)));
  }
}
