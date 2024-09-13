import { IDS_SELECT_DEFAULT_CONFIG, IDS_SELECT_DEFAULT_CONFIG_FACTORY, IdsSelectDefaultConfig } from './select-defaults';
import { selectConnectedPositions } from './select-positions';
import { IDS_SELECT_TRIGGER, IdsSelectTriggerDirective } from './select-trigger.directive';

import { FormFieldVariantType, IDS_FORM_FIELD, IDS_FORM_FIELD_CONTROL, IDS_OPTION_GROUP, IdsFormFieldControl, IdsOptionComponent, IdsOptionGroupComponent } from '../forms';
import { IDS_OPTION_PARENT_COMPONENT } from '../forms/components/option/option-parent';

import { SelectionModel } from '@angular/cdk/collections';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, contentChildren, ElementRef, inject, input, OnInit, signal, viewChild, ViewEncapsulation, AfterContentInit, forwardRef, contentChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormGroupDirective, NG_VALUE_ACCESSOR, NgControl, NgForm } from '@angular/forms';
import { coerceBooleanAttribute, ComponentBaseWithDefaults, createClassList, SizeType } from '@i-cell/ids-angular/core';
import { AbstractSuccessStateMatcher, AbstractErrorStateMatcher, ErrorStateTracker, SuccessStateTracker, _getOptionScrollPosition, _countGroupLabelsBeforeOption, IdsOptionSelectionChange } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { mdiChevronDown } from '@mdi/js';
import { first, Subject } from 'rxjs';

const defaultConfig = IDS_SELECT_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-select[ngModel], ids-select[formControl], ids-select[formControlName]',
  standalone: true,
  imports: [
    CdkOverlayOrigin,
    CdkConnectedOverlay,
    IdsIconComponent,
  ],
  templateUrl: './select.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: IDS_FORM_FIELD_CONTROL, useExisting: IdsSelectComponent },
    { provide: IDS_OPTION_PARENT_COMPONENT, useExisting: IdsSelectComponent },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdsSelectComponent),
      multi: true,
    },
  ],
})
export class IdsSelectComponent
  extends ComponentBaseWithDefaults<IdsSelectDefaultConfig>
  implements IdsFormFieldControl, ControlValueAccessor, OnInit, AfterContentInit {
  protected override get _componentName(): string {
    return 'select';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_SELECT_DEFAULT_CONFIG);
  private readonly _elementRef = inject(ElementRef);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _parentFormField = inject(IDS_FORM_FIELD);
  private readonly _parentForm = inject(NgForm, { optional: true });
  private readonly _parentFormGroup = inject(FormGroupDirective, { optional: true });

  protected readonly _connectedPositions = selectConnectedPositions;
  protected readonly _chevronDownIcon = mdiChevronDown;
  public readonly errorStateChanges = new Subject<void>();
  public readonly successStateChanges = new Subject<void>();

  protected _preferredOverlayOrigin: CdkOverlayOrigin | ElementRef | undefined;
  protected _overlayWidth: string | number = 0;

  public multiSelect = input<boolean>(false);
  public placeholder = input<string>('');
  public required = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  public readonly = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  public canHandleSuccessState = input<boolean>(false);
  public errorStateMatcher = input<AbstractErrorStateMatcher>(inject(this._defaultConfig.errorStateMatcher));
  public successStateMatcher = input<AbstractSuccessStateMatcher>(inject(this._defaultConfig.successStateMatcher));
  public ariaLabel = input<string>('', { alias: 'aria-label' });
  public ariaLabelledby = input<string>('', { alias: 'aria-labelledby' });
  public valueCompareFn = input<(o1: IdsOptionComponent, o2: IdsOptionComponent) => boolean>();
  public sortCompareFn = input<(a: IdsOptionComponent, b: IdsOptionComponent, options: Readonly<IdsOptionComponent[]>) => number>();

  public disabled = signal<boolean>(false);
  public isPanelOpen = signal<boolean>(false);
  public hasErrorState = signal<boolean>(false);
  public hasSuccessState = signal<boolean>(false);
  public parentSize = signal<SizeType | null>(null);
  public parentVariant = signal<FormFieldVariantType | null>(null);

  private _canOpen = computed(() => !this.isPanelOpen() && !this.disabled() && !this.readonly() && this.options().length > 0);
  protected _hostClasses = computed(() => this._getHostClasses([
    this.parentSize(),
    this.parentVariant(),
    this.disabled() ? 'disabled' : null,
    this.readonly() ? 'readonly' : null,
  ]));

  protected _panelClasses = computed(() => createClassList(`${this._componentClass}-panel`, [
    this.parentSize(),
    this.parentVariant(),
  ]));

  private _panel = viewChild.required<ElementRef<HTMLElement>>('panel');
  private _overlayDir = viewChild(CdkConnectedOverlay);
  public options = contentChildren<IdsOptionComponent>(IdsOptionComponent, { descendants: true });
  public optionGroups = contentChildren<IdsOptionGroupComponent>(IDS_OPTION_GROUP, { descendants: true });
  protected _customTrigger = contentChild<IdsSelectTriggerDirective>(IDS_SELECT_TRIGGER);

  private _errorStateTracker?: ErrorStateTracker;
  private _successStateTracker?: SuccessStateTracker;
  public ngControl: NgControl | null = null;

  private _rawValue: unknown | unknown[];
  private _selectionModel?: SelectionModel<IdsOptionComponent>;
  private _onChange: (value: unknown) => void = () => {};
  private _onTouched: () => unknown = () => { };

  protected get _empty(): boolean {
    return Boolean(this._selectionModel?.isEmpty());
  }

  public get selected(): IdsOptionComponent | IdsOptionComponent[] | undefined {
    return this.multiSelect() ? this._selectionModel?.selected : this._selectionModel?.selected?.[0] || [];
  }

  protected get _triggerValue(): string {
    if (this._empty) {
      return '';
    }

    if (this.multiSelect()) {
      const selectedOptions = this._selectionModel?.selected?.map((option) => option.viewValue());
      return selectedOptions?.join(', ') || '';
    }

    return this._selectionModel?.selected?.[0].viewValue() || '';
  }

  public ngOnInit(): void {
    if (!this._parentFormField) {
      this._createComponentError('Select must be in a form field');
    }
    this.parentSize.set(this._parentFormField.size());
    this.parentVariant.set(this._parentFormField.variant());
    this._selectionModel = new SelectionModel<IdsOptionComponent>(this.multiSelect(), undefined, false, this.valueCompareFn());
    this._initErrorStateTracker();
    this._initSuccessStateTracker();
  }

  private _initErrorStateTracker(): void {
    this._errorStateTracker = new ErrorStateTracker(
      this.errorStateMatcher(),
      this.ngControl,
      this._parentFormGroup,
      this._parentForm,
      this.errorStateChanges,
    );

    this.errorStateChanges.pipe(
      takeUntilDestroyed(this._destroyRef),
    ).subscribe(() => this.hasErrorState.set(this._errorStateTracker!.hasErrorState));
  }

  private _initSuccessStateTracker(): void {
    if (this.canHandleSuccessState()) {
      this._successStateTracker = new SuccessStateTracker(
        this.successStateMatcher(),
        this.ngControl,
        this._parentFormGroup,
        this._parentForm,
        this.successStateChanges,
      );

      this.successStateChanges.pipe(
        takeUntilDestroyed(this._destroyRef),
      ).subscribe(() => this.hasSuccessState.set(this._successStateTracker!.hasSuccessState));
    }
  }

  public ngAfterContentInit(): void {
    this._selectionModel?.select(...this.options().filter((item) => item.selected()));
    this._subscribeOptionChanges();
  }

  private _subscribeOptionChanges(): void {
    this.options().forEach((option) => {
      option.onSelectionChange.subscribe(
        (change) => {
          this._handleOptionChange(change);
        },
      );
    });
  }

  private _handleOptionChange(change: IdsOptionSelectionChange): void {
    const { source, selected } = change;
    if (!this.multiSelect()) {
      this._clearSelection();
    }
    source.selected.set(selected);
    if (selected) {
      this._selectionModel?.select(source);
    } else {
      this._selectionModel?.deselect(source);
    }
    this._handleChange();
    this._onTouched();
  }

  protected _handleKeydown(event: KeyboardEvent): void {
    if (!this.disabled() && !this.readonly()) {
      this.isPanelOpen() ? this._handleOpenedPanelKeydown(event) : this._handleClosedPanelKeydown(event);
    }
  }

  private _handleClosedPanelKeydown(event: KeyboardEvent): void {
    const key = event.key;
    const isOpenKey = key === 'ENTER' || key === ' ';

    if ((isOpenKey && !hasModifierKey(event))) {
      event.preventDefault();
      this.open();
    }
  }

  private _handleOpenedPanelKeydown(event: KeyboardEvent): void {
    const key = event.key;
    if (key === 'Escape') {
      this.close();
    }
  }

  private _positioningSettled(): void {
    this._scrollOptionIntoView(0); // TODO: try to pass index to method without keyManager
  }

  private _scrollOptionIntoView(index: number): void {
    const option = this.options()[index];

    if (option) {
      const panel: HTMLElement = this._panel().nativeElement;
      const labelCount = _countGroupLabelsBeforeOption(index, this.options(), this.optionGroups());
      const element = option.getHostElement();

      if (index === 0 && labelCount === 1) {
        panel.scrollTop = 0;
      } else {
        panel.scrollTop = _getOptionScrollPosition(
          element.offsetTop,
          element.offsetHeight,
          panel.scrollTop,
          panel.offsetHeight,
        );
      }
    }
  }

  private _sortValues(): void {
    if (this.multiSelect()) {
      const options = this.options();

      const sortComparator = this.sortCompareFn();
      this._selectionModel?.sort((a, b) => (sortComparator
        ? sortComparator(a, b, options)
        : options.indexOf(a) - options.indexOf(b)));
    }
  }

  private _getOverlayWidth(
    preferredOrigin: ElementRef<ElementRef> | CdkOverlayOrigin | undefined,
  ): string | number {
    const refToMeasure
        = preferredOrigin instanceof CdkOverlayOrigin
          ? preferredOrigin.elementRef
          : preferredOrigin || this._elementRef;
    return refToMeasure.nativeElement.getBoundingClientRect().width;
  }

  protected _panelAttached(): void {
    this._overlayDir()?.positionChange.pipe(first()).subscribe(() => {
      this._changeDetectorRef.detectChanges();
      this._positioningSettled();
    });
  }

  public toggle(): void {
    this.isPanelOpen() ? this.close() : this.open();
  }

  public open(): void {
    if (!this._canOpen()) {
      return;
    }

    if (this._parentFormField) {
      this._preferredOverlayOrigin = this._parentFormField?.getConnectedOverlayOrigin();
    }

    this._overlayWidth = this._getOverlayWidth(this._preferredOverlayOrigin);
    this.isPanelOpen.set(true);
    this._changeDetectorRef.markForCheck();
  }

  public close(): void {
    if (this.isPanelOpen()) {
      this.isPanelOpen.set(false);
      this._changeDetectorRef.markForCheck();
      this._onTouched();
    }
  }

  public writeValue(value: unknown | unknown[]): void {
    this._setSelectionByValue(value);
  }

  public registerOnChange(fn: () => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => unknown): void {
    this._onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }

  private _setSelectionByValue(value: unknown | unknown[]): void {
    this._rawValue = value;

    if (this.options().length === 0) {
      return;
    }

    if (this.multiSelect() && value) {
      if (!Array.isArray(value)) {
        throw new Error(this._createComponentError('value must be an array in multiple-selection mode'));
      }

      value.forEach((currentValue: unknown) => this._selectValue(currentValue));
      this._sortValues();
    } else {
      this._clearSelection();
      this._selectValue(value);
    }
  }

  private _selectValue(value: unknown): void {
    const correspondingOption = this.options().find((option) => option.value() != null && option.value() === value);
    if (correspondingOption) {
      correspondingOption.selected.set(true);
      this._selectionModel?.select(correspondingOption);
    }
  }

  private _clearSelection(): void {
    this._selectionModel?.clear();
    this.options().forEach((option) => {
      option.selected.set(false);
    });
  }

  private _handleChange(): void {
    const selectionModelValues = this._selectionModel?.selected?.map((item) => item.value());
    if (this.multiSelect()) {
      this._onChange(selectionModelValues);
    } else {
      this._onChange(selectionModelValues?.[0]);
      this.close();
    }
    this._changeDetectorRef.markForCheck();
  }

  public isOptionPreSelectedByValue(optionValue: unknown): boolean {
    if (this._rawValue === undefined) {
      // console.log('rawValue undefined');
      return false;
    }

    if (this.multiSelect() && Array.isArray(this._rawValue)) {
      // console.log('multiselect');
      return this._rawValue.some((value) => optionValue != null && value === optionValue);
    }
    // console.log('single select', optionValue, this._rawValue);
    return optionValue === this._rawValue;
  }

  public setDescribedByIds(ids: string[]): void {
    if (ids.length) {
      this._elementRef.nativeElement.setAttribute('aria-describedby', ids.join(' '));
    } else {
      this._elementRef.nativeElement.removeAttribute('aria-describedby');
    }
  }

  public focus(options?: FocusOptions): void {
    this._elementRef.nativeElement.focus(options);
  }

  public onContainerClick = (): void => {
    this.focus();
    this.open();
  };
}
