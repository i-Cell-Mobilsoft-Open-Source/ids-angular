import { IDS_SELECT_DEFAULT_CONFIG, IDS_SELECT_DEFAULT_CONFIG_FACTORY, IdsSelectDefaultConfig } from './select-defaults';
import { selectConnectedPositions } from './select-positions';
import { IdsSelectTriggerDirective } from './select-trigger.directive';

import { ActiveDescendantKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { CdkConnectedOverlay, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { AfterContentInit, AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, contentChild, contentChildren, effect, ElementRef, forwardRef, inject, input, isDevMode, OnDestroy, OnInit, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ValueChangeEvent } from '@angular/forms';
import { coerceNumberAttribute, createClassList } from '@i-cell/ids-angular/core';
import { _countGroupLabelsBeforeOption, _getOptionScrollPosition, AbstractErrorStateMatcher, AbstractSuccessStateMatcher, formFieldControlClass, IDS_FORM_FIELD_CONTROL, IDS_OPTION_GROUP, IDS_OPTION_PARENT_COMPONENT, IdsFormFieldComponent, IdsFormFieldControl, IdsOptionComponent, IdsOptionGroupComponent, IdsOptionSelectionChange } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { filter, first } from 'rxjs';

const defaultConfig = IDS_SELECT_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: `ids-select[ngModel]:not([formControl]):not([formControlName]),
              ids-select[formControl]:not([ngModel]):not([formControlName]),
              ids-select[formControlName]:not([ngModel]):not([formControl])`,
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
  host: {
    'role': 'select',
    'aria-autocomplete': 'none',
    'aria-haspopup': 'listbox',
    '[attr.tabindex]': 'disabled() ? -1 : tabIndex()',
    '[attr.aria-controls]': 'isPanelOpen() ? id() + "-panel" : null',
    '[attr.aria-owns]': 'isPanelOpen() ? id() + "-panel" : null',
    '[attr.aria-expanded]': 'isPanelOpen()',
    '[attr.aria-label]': 'ariaLabel() || null',
    '[attr.aria-labelledby]': 'ariaLabelledby() || null',
    '[attr.aria-required]': 'required().toString()',
    '[attr.aria-disabled]': 'disabled().toString()',
    '[attr.aria-invalid]': 'hasErrorState()',
    '[attr.aria-activedescendant]': '_getAriaActiveDescendant()',
    '(keydown)': '_handleKeydown($event)',
    '(focus)': 'focus()',
    '(blur)': '_onBlur()',
  },
})
export class IdsSelectComponent
  extends IdsFormFieldControl<IdsSelectDefaultConfig>
  implements ControlValueAccessor, OnInit, AfterContentInit, AfterViewInit, OnDestroy {
  protected override get _hostName(): string {
    return 'select';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_SELECT_DEFAULT_CONFIG);
  protected readonly _elementRef = inject(ElementRef);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _liveAnnouncer = inject(LiveAnnouncer);
  private readonly _parentFormField = inject(IdsFormFieldComponent);

  protected readonly _connectedPositions = selectConnectedPositions;

  protected _preferredOverlayOrigin: CdkOverlayOrigin | ElementRef | undefined;
  protected _overlayWidth: string | number = 0;

  public multiSelect = input<boolean>(false);
  public readonly errorStateMatcher = input<AbstractErrorStateMatcher>(inject(this._defaultConfig.errorStateMatcher));
  public readonly successStateMatcher = input<AbstractSuccessStateMatcher>(inject(this._defaultConfig.successStateMatcher));
  public ariaLabel = input<string>('', { alias: 'aria-label' });
  public ariaLabelledby = input<string>('', { alias: 'aria-labelledby' });
  public valueCompareFn = input<(o1: unknown, o2: unknown) => boolean>((o1: unknown, o2: unknown) => o1 === o2);
  public sortCompareFn = input<(a: IdsOptionComponent, b: IdsOptionComponent, options: Readonly<IdsOptionComponent[]>) => number>();
  public tabIndex = input<number, unknown>(0, { transform: coerceNumberAttribute });
  public typeaheadDebounceInterval = input<number, unknown>(
    this._defaultConfig.typeaheadDebounceInterval, { transform: coerceNumberAttribute },
  );

  public isPanelOpen = signal<boolean>(false);
  public parentSize = computed(() => this._parentFormField.parentOrSelfSize());
  public parentVariant = computed(() => this._parentFormField.parentOrSelfVariant());
  private _focused = signal<boolean>(false);

  private _canOpen = computed(() => !this.isPanelOpen() && !this.disabled() && !this.readonly() && this.options().length > 0);
  protected _hostClasses = computed(() => this._getHostClasses([
    this.parentSize(),
    this.parentVariant(),
    this.disabled() ? 'disabled' : null,
    this.readonly() ? 'readonly' : null,
  ], [formFieldControlClass]));

  protected _panelClasses = computed(() => createClassList(`${this._hostClassName}-panel`, [
    this.parentSize(),
    this.parentVariant(),
  ]));

  private _panel = viewChild<ElementRef<HTMLElement>>('panel');
  private _overlayDir = viewChild(CdkConnectedOverlay);
  public options = contentChildren<IdsOptionComponent>(IdsOptionComponent, { descendants: true });
  public optionGroups = contentChildren<IdsOptionGroupComponent>(IDS_OPTION_GROUP, { descendants: true });
  protected _customTrigger = contentChild(IdsSelectTriggerDirective);

  private _keyManager?: ActiveDescendantKeyManager<IdsOptionComponent>;
  private _rawValue: unknown | unknown[];
  private _selectionModel?: SelectionModel<IdsOptionComponent>;
  private _onChange: (value: unknown) => void = () => {};
  private _onTouched: () => unknown = () => { };

  protected get _empty(): boolean {
    return Boolean(this._selectionModel?.isEmpty());
  }

  public get selected(): IdsOptionComponent | IdsOptionComponent[] | undefined {
    return this.multiSelect() ? this._selectionModel?.selected : this._selectionModel?.selected?.[0];
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

  constructor() {
    super();
    effect(() => {
      this._keyManager?.withTypeAhead(this.typeaheadDebounceInterval());
    });
  }

  public ngOnInit(): void {
    if (!this._parentFormField) {
      throw this._createHostError('Select must be in a form field');
    }
    this._selectionModel = new SelectionModel<IdsOptionComponent>(this.multiSelect(), undefined, false, this.valueCompareFn());
    queueMicrotask(() => {
      const control = this.ngControl()?.control;
      if (control) {
        control.events
          .pipe(
            filter((event) => event instanceof ValueChangeEvent),
            takeUntilDestroyed(this._destroyRef),
          )
          .subscribe(() => {
            this._changeDetectorRef.markForCheck();
          });
      }
    });
    this._initErrorStateTracker();
  }

  public ngAfterContentInit(): void {
    this._initKeyManager();
    this._selectionModel?.select(...this.options().filter((item) => item.selected()));
    this._subscribeOptionChanges();
  }

  public ngAfterViewInit(): void {
    queueMicrotask(() => {
      const controlDir = this.ngControl();
      if (controlDir?.control) {
        controlDir.control.events.pipe(takeUntilDestroyed(this._destroyRef)).subscribe(() => this.updateErrorAndSuccessState());
      }
    });
  }

  public updateErrorAndSuccessState(): void {
    this._errorStateTracker?.updateErrorState();
    this._successStateTracker?.updateSuccessState();
  }

  public ngOnDestroy(): void {
    this._keyManager?.destroy();
  }

  private _initKeyManager(): void {
    this._keyManager = new ActiveDescendantKeyManager<IdsOptionComponent>(this.options())
      .withTypeAhead(this.typeaheadDebounceInterval())
      .withVerticalOrientation()
      .withHorizontalOrientation('ltr')
      .withHomeAndEnd()
      .withPageUpDown()
      .withAllowedModifierKeys(['shiftKey'])
      .skipPredicate(this._skipPredicate);

    this._keyManager.tabOut.subscribe(() => {
      if (this.isPanelOpen()) {
        if (!this.multiSelect() && this._keyManager?.activeItem) {
          this._keyManager.activeItem.selectViaInteraction();
        }
        this.focus();
        this.close();
      }
    });

    this._keyManager.change.subscribe(() => {
      if (this.isPanelOpen() && this._panel()) {
        this._scrollOptionIntoView(this._keyManager?.activeItemIndex || 0);
      }
    });
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
    const { source, selected, isUserInput } = change;
    if (!this.multiSelect()) {
      this._clearSelection();
    }
    source.selected.set(selected);

    if (isUserInput) {
      this._keyManager?.setActiveItem(source);
    }

    if (isUserInput && !this.multiSelect() && this.isPanelOpen()) {
      this.close();
      this.focus();
    }

    if (this.multiSelect()) {
      this._sortValues();

      if (isUserInput) {
        this.focus();
      }
    }

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
    const manager = this._keyManager;
    const key = event.key;
    const isArrowKey =
      key === 'ArrowDown' ||
      key === 'ArrowUp' ||
      key === 'ArrowLeft' ||
      key === 'ArrowRight';
    const isOpenKey = key === 'Enter' || key === ' ';

    if ((!manager?.isTyping() && isOpenKey && !hasModifierKey(event)) || isArrowKey) {
      event.preventDefault();
      this.open();
    } else if (!this.multiSelect()) {
      const previouslySelectedOption = this.selected;
      manager?.onKeydown(event);
      const selectedOption = this.selected as IdsOptionComponent;

      if (selectedOption?.viewValue() && previouslySelectedOption !== selectedOption) {
        // eslint-disable-next-line no-magic-numbers
        this._liveAnnouncer.announce(selectedOption.viewValue(), 10000);
      }
    }
  }

  private _handleOpenedPanelKeydown(event: KeyboardEvent): void {
    const manager = this._keyManager;
    const key = event.key;
    const isArrowKey = key === 'ArrowDown' || key === 'ArrowUp';
    const isTyping = manager?.isTyping();

    if (isArrowKey && event.altKey) {
      event.preventDefault();
      this.close();
    } else if (
      !isTyping &&
      (key === 'Enter' || key === ' ') &&
      manager?.activeItem &&
      !hasModifierKey(event)
    ) {
      event.preventDefault();
      manager.activeItem.selectViaInteraction();
    } else if (!isTyping && this.multiSelect() && key === 'a' && event.ctrlKey) {
      event.preventDefault();
      const hasDeselectedOptions = this.options().some((opt) => !opt.disabled && !opt.selected());

      this.options().forEach((option) => {
        if (!option.disabled) {
          hasDeselectedOptions ? option.select() : option.deselect();
        }
      });
    } else {
      const previouslyFocusedIndex = manager?.activeItemIndex;

      manager?.onKeydown(event);

      if (
        this.multiSelect() &&
        isArrowKey &&
        event.shiftKey &&
        manager?.activeItem &&
        manager?.activeItemIndex !== previouslyFocusedIndex
      ) {
        manager?.activeItem.selectViaInteraction();
      }
    }
  }

  private _positioningSettled(): void {
    this._scrollOptionIntoView(this._keyManager?.activeItemIndex || 0);
  }

  private _scrollOptionIntoView(index: number): void {
    const option = this.options()[index];

    if (option) {
      const panel: HTMLElement | undefined = this._panel()!.nativeElement;
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
    this._keyManager?.withHorizontalOrientation(null);
    this._highlightCorrectOption();
    this._changeDetectorRef.markForCheck();
  }

  public close(): void {
    if (this.isPanelOpen()) {
      this.isPanelOpen.set(false);
      this._keyManager?.withHorizontalOrientation('ltr');
      this._changeDetectorRef.markForCheck();
      this._onTouched();
    }
  }

  // #region ControlValueAccessor implementation
  public writeValue(value: unknown | unknown[]): void {
    this._setSelectionByValue(value);
  }

  public registerOnChange(fn: () => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => unknown): void {
    this._onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this._disabled.set(isDisabled);
    this._changeDetectorRef.markForCheck();
  }
  // #endregion

  private _setSelectionByValue(value: unknown | unknown[]): void {
    this.options().forEach((option) => option.setInactiveStyles());
    this._selectionModel?.clear();
    this._rawValue = value;

    if (this.options().length === 0) {
      return;
    }

    if (this.multiSelect() && value) {
      if (!Array.isArray(value)) {
        throw this._createHostError('value must be an array in multiple-selection mode');
      }

      value.forEach((currentValue: unknown) => this._selectValue(currentValue));
      this._sortValues();
    } else {
      const correspondingOption = this._selectValue(value);
      if (correspondingOption) {
        this._keyManager?.updateActiveItem(correspondingOption);
      } else if (!this.isPanelOpen()) {
        this._keyManager?.updateActiveItem(-1);
      }
    }
  }

  private _selectValue(value: unknown): IdsOptionComponent | undefined {
    const correspondingOption = this.options().find((option) => {
      if (this._selectionModel?.isSelected(option)) {
        return false;
      }

      try {
        const valueCompareFn = this.valueCompareFn();
        return option.value() != null && valueCompareFn && valueCompareFn(option.value(), value);
      } catch (error) {
        if (isDevMode()) {
          console.warn(error);
        }
        return false;
      }
    });

    if (correspondingOption) {
      correspondingOption.selected.set(true);
      this._selectionModel?.select(correspondingOption);
    }

    return correspondingOption;
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
    }
    this._changeDetectorRef.markForCheck();
  }

  private _skipPredicate = (option: IdsOptionComponent): boolean => {
    if (this.isPanelOpen()) {
      return false;
    }

    return option.disabledInput();
  };

  private _highlightCorrectOption(): void {
    if (this._keyManager) {
      if (this._empty) {
        let firstEnabledOptionIndex = -1;
        for (let index = 0; index < this.options().length; index++) {
          const option = this.options()[index]!;
          if (!option.disabled) {
            firstEnabledOptionIndex = index;
            break;
          }
        }

        this._keyManager.setActiveItem(firstEnabledOptionIndex);
      } else {
        if (this._selectionModel) {
          this._keyManager.setActiveItem(this._selectionModel.selected[0]);
        }
      }
    }
  }

  public isOptionPreSelectedByValue(optionValue: unknown): boolean {
    if (this._rawValue === undefined) {
      return false;
    }

    if (this.multiSelect() && Array.isArray(this._rawValue)) {
      return this._rawValue.some((value) => optionValue != null && value === optionValue);
    }
    return optionValue === this._rawValue;
  }

  private _onFocus(): void {
    if (!this.disabled()) {
      this._focused.set(true);
    }
  }

  private _onBlur(): void {
    this._focused.set(false);
    this._keyManager?.cancelTypeahead();

    if (!this.disabled() && !this.isPanelOpen()) {
      this._onTouched();
      this._changeDetectorRef.markForCheck();
    }
  }

  private _getAriaActiveDescendant(): string | null {
    if (this.isPanelOpen() && this._keyManager?.activeItem) {
      return this._keyManager.activeItem.id();
    }

    return null;
  }

  public focus(options?: FocusOptions): void {
    this._elementRef.nativeElement.focus(options);
  }

  public onContainerClick = (): void => {
    if (!this._focused && !this.readonly() && !this.disabled()) {
      this.focus();
      this.open();
    }
  };
}
