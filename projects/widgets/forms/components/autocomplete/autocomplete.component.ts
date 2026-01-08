import {
  IDS_AUTOCOMPLETE_DEFAULT_CONFIG,
  IDS_AUTOCOMPLETE_DEFAULT_CONFIG_FACTORY,
  IdsAutocompleteDefaultConfig,
} from './autocomplete-defaults';
import { IDS_AUTOCOMPLETE_LOADER } from './tokens/autocomplete-loader.token';

import { ActiveDescendantKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  computed,
  effect,
  ElementRef,
  forwardRef,
  inject,
  input,
  isDevMode,
  model,
  OnInit,
  signal,
  untracked,
  viewChild,
  viewChildren,
  ViewEncapsulation,
  OnDestroy,
} from '@angular/core';
import { rxResource, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR, ValueChangeEvent } from '@angular/forms';
import { coerceNumberAttribute, createClassList } from '@i-cell/ids-angular/core';
import {
  IdsInputDirective,
  formFieldControlClass,
  IDS_FORM_FIELD_CONTROL,
  IdsFormFieldComponent,
  IdsFormFieldControl,
  IdsOptionComponent,
  IdsOptionSelectionChange,
  IDS_OPTION_PARENT_COMPONENT,
  IdsFormFieldActionDirective,
  ErrorStateMatcher,
  SuccessStateMatcher,
  _getOptionScrollPosition,
} from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IdsIconButtonComponent } from '@i-cell/ids-angular/icon-button';
import { IdsOverlayPanelComponent } from '@i-cell/ids-angular/overlay-panel';
import { IdsSpinnerComponent } from '@i-cell/ids-angular/spinner';
import { IdsTooltipDirective } from '@i-cell/ids-angular/tooltip';
import { filter } from 'rxjs';

const defaultConfig = IDS_AUTOCOMPLETE_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: `ids-autocomplete[ngModel]:not([formControl]):not([formControlName]),
              ids-autocomplete[formControl]:not([ngModel]):not([formControlName]),
              ids-autocomplete[formControlName]:not([ngModel]):not([formControl])`,
  imports: [
    CdkOverlayOrigin,
    FormsModule,
    IdsFormFieldActionDirective,
    IdsInputDirective,
    IdsIconComponent,
    IdsIconButtonComponent,
    IdsOverlayPanelComponent,
    IdsOptionComponent,
    IdsSpinnerComponent,
    IdsTooltipDirective,
  ],
  templateUrl: './autocomplete.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: IDS_FORM_FIELD_CONTROL, useExisting: IdsAutocompleteComponent },
    { provide: IDS_OPTION_PARENT_COMPONENT, useExisting: IdsAutocompleteComponent },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdsAutocompleteComponent),
      multi: true,
    },
  ],
  host: {
    role: 'combobox',
    'aria-autocomplete': 'list',
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
export class IdsAutocompleteComponent
  extends IdsFormFieldControl<IdsAutocompleteDefaultConfig>
  implements ControlValueAccessor, OnInit, AfterViewInit, OnDestroy {
  protected override get _hostName(): string {
    return 'autocomplete';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_AUTOCOMPLETE_DEFAULT_CONFIG);
  protected readonly _elementRef = inject(ElementRef);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _liveAnnouncer = inject(LiveAnnouncer);
  private readonly _parentFormField = inject(IdsFormFieldComponent);

  protected _preferredOverlayOrigin: CdkOverlayOrigin | ElementRef | undefined;
  protected _overlayWidth: string | number = 0;

  /**
   * Minimum number of characters to initiate actual search.
   * Warning is shown when input length is not met.
   * (Resource loader/stream function needs to be adjusted accordingly!)
   */
  public minChars = input<number, unknown>(1, { transform: coerceNumberAttribute });
  /** Max length of options allowed to show. Warning is shown when available options is higher than this number  */
  public maxLength = input<number | null, number>(null, { transform: coerceNumberAttribute });
  public multiSelect = input<boolean>(false);
  public ariaLabel = input<string>('', { alias: 'aria-label' });
  public ariaLabelledby = input<string>('', { alias: 'aria-labelledby' });
  public ariaLabelClearButton = input<string>('Clear');
  public ariaLabelToggleButton = input<string>('Toggle');
  public valueCompareFn = input<(o1: unknown, o2: unknown) => boolean>((o1: unknown, o2: unknown) => o1 === o2);
  public sortCompareFn = input<(a: IdsOptionComponent, b: IdsOptionComponent, options: Readonly<IdsOptionComponent[]>) => number>();
  public tabIndex = input<number, unknown>(0, { transform: coerceNumberAttribute });
  public typeaheadDebounceInterval = input<number, unknown>(this._defaultConfig.typeaheadDebounceInterval, {
    transform: coerceNumberAttribute,
  });

  public hintLoading = input<string>(this._defaultConfig.hintLoading);
  public hintNoResults = input<string>(this._defaultConfig.hintNoResults);
  public hintMinChars = input<string>(this._defaultConfig.hintMinChars);
  public hintMaxLength = input<string>(this._defaultConfig.hintMaxLength);

  public isPanelOpen = signal<boolean>(false);
  public parentSize = computed(() => this._parentFormField.parentOrSelfSize());
  public parentVariant = computed(() => this._parentFormField.parentOrSelfVariant());
  public readonly errorStateMatcher = signal(inject(ErrorStateMatcher));
  public readonly successStateMatcher = signal(inject(SuccessStateMatcher));
  public options = viewChildren<IdsOptionComponent>(IdsOptionComponent);
  public onContainerClick = (): void => {};

  protected _hostClasses = computed(() =>
    this._getHostClasses(
      [
        this.parentSize(),
        this.parentVariant(),
        this.disabled() ? 'disabled' : null,
        this.readonly() ? 'readonly' : null,
      ],
      [formFieldControlClass],
    ),
  );

  protected _panelClasses = computed(() => createClassList(`${this._hostClassName}-panel`, [
    this.parentSize(),
    this.parentVariant(),
  ]));

  private _focused = signal<boolean>(false);
  private _canOpen = computed(() => !this.isPanelOpen() && !this.disabled() && !this.readonly() && this.options().length > 0);
  private _panel = viewChild('overlayPanel', { read: ElementRef<HTMLElement> });
  private _keyManager?: ActiveDescendantKeyManager<IdsOptionComponent>;

  protected _resource = rxResource({
    defaultValue: [],
    params: () => ({ search: this._searchText() }),
    stream: inject(IDS_AUTOCOMPLETE_LOADER),
  });

  private _rawValue: unknown | unknown[];
  private _selectionModel?: SelectionModel<IdsOptionComponent>;
  private _onChange: (value: unknown) => void = () => {};
  private _onTouched: () => unknown = () => {};

  protected get _empty(): boolean {
    return Boolean(this._selectionModel?.isEmpty());
  }

  public get selected(): IdsOptionComponent | IdsOptionComponent[] | undefined {
    return this.multiSelect() ? this._selectionModel?.selected : this._selectionModel?.selected?.[0];
  }

  protected _searchText = model<string>('');

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

    effect(() => {
      const options = this.options();

      untracked(() => {
        if (options.length > 0) {
          this._initKeyManager();
          this._selectionModel?.select(...this.options().filter((item) => item.selected()));
          this._subscribeOptionChanges();
        }
      });
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
          .subscribe(() => this._changeDetectorRef.markForCheck());
      }
    });
    this._initErrorStateTracker();
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

    // ez nem biztos, hogy kell...
    // this._keyManager.tabOut.subscribe(() => {
    //   console.info('tabout');
    //   if (this.isPanelOpen()) {
    //     if (!this.multiSelect() && this._keyManager?.activeItem) {
    //       this._keyManager.activeItem.selectViaInteraction();
    //     }
    //     this.focus();
    //     this.close();
    //   }
    // });

    this._keyManager.change.subscribe(() => {
      if (this.isPanelOpen() && this._panel()) {
        this._scrollOptionIntoView(this._keyManager?.activeItemIndex || 0);
      }
    });
  }

  private _subscribeOptionChanges(): void {
    this.options().forEach((option) => {
      option.onSelectionChange.subscribe((change) => {
        this._handleOptionChange(change);
      });
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
      // this.focus();
    }

    if (this.multiSelect()) {
      this._sortValues();

      // if (isUserInput) {
      //   this.focus();
      // }
    }

    if (selected) {
      this._selectionModel?.select(source);
      this._searchText.set(source.viewValue());
    } else {
      this._selectionModel?.deselect(source);
    }
    this._handleChange();
    this._onTouched();
    this.isPanelOpen.set(false);
  }

  protected _handleKeydown(event: KeyboardEvent): void {
    if (!this.disabled() && !this.readonly()) {
      this.isPanelOpen() ? this._handleOpenedPanelKeydown(event) : this._handleClosedPanelKeydown(event);
    }
  }

  private _handleClosedPanelKeydown(event: KeyboardEvent): void {
    const manager = this._keyManager;
    const key = event.key;
    const isArrowKey = key === 'ArrowDown' || key === 'ArrowUp' || key === 'ArrowLeft' || key === 'ArrowRight';
    const isOpenKey = key === 'Enter' || key === ' ';

    if (
      (!manager?.isTyping() && isOpenKey && !hasModifierKey(event)) ||
      isArrowKey ||
      this.options().length > 0 ||
      this._resource.value().length > 0
    ) {
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
    } else if (!isTyping && (key === 'Enter' || key === ' ') && manager?.activeItem && !hasModifierKey(event)) {
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

  private _scrollOptionIntoView(index: number): void {
    const option = this.options()[index];

    if (option) {
      const panel: HTMLElement = this._panel()!.nativeElement;
      const element = option.getHostElement();

      if (index === 0) {
        panel.scrollTop = 0;
      } else {
        panel.scrollTop = _getOptionScrollPosition(element.offsetTop, element.offsetHeight, panel.scrollTop, panel.offsetHeight);
      }
    }
  }

  private _sortValues(): void {
    if (this.multiSelect()) {
      const options = this.options();

      const sortComparator = this.sortCompareFn();
      this._selectionModel?.sort((a, b) => (sortComparator ? sortComparator(a, b, options) : options.indexOf(a) - options.indexOf(b)));
    }
  }

  private _getOverlayWidth(preferredOrigin: ElementRef<ElementRef> | CdkOverlayOrigin | undefined): string | number {
    const refToMeasure = preferredOrigin instanceof CdkOverlayOrigin ? preferredOrigin.elementRef : preferredOrigin || this._elementRef;
    return refToMeasure.nativeElement.getBoundingClientRect().width;
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
      this._changeDetectorRef.markForCheck();
      this._onTouched();
    }
  }

  public clear(): void {
    this.ngControl()?.control?.reset();
    this._searchText.set('');
    this._clearSelection();
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
    this.options().forEach((option) => {
      option.setInactiveStyles();
      option.selected.set(false);
    });
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
    const valueCompareFn = this.valueCompareFn();
    const correspondingOption = this.options().find((option) => {
      if (this._selectionModel?.isSelected(option)) {
        return false;
      }

      try {
        return valueCompareFn?.(option.value(), value);
      } catch(error) {
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

  protected _onFocus(): void {
    if (!this.disabled()) {
      this._focused.set(true);
    }
  }

  protected _onBlur(): void {
    this._focused.set(false);
    this._keyManager?.cancelTypeahead();

    if (!this.disabled() && !this.isPanelOpen()) {
      this._onTouched();
      this._changeDetectorRef.markForCheck();
    }
  }

  protected _getAriaActiveDescendant(): string | null {
    if (this.isPanelOpen() && this._keyManager?.activeItem) {
      return this._keyManager.activeItem.id();
    }

    return null;
  }

  public focus(options?: FocusOptions): void {
    this._elementRef.nativeElement.focus(options);
  }

  protected _onInputClick(): void {
    if (!this._focused() && !this.readonly() && !this.disabled() && this._searchText().length) {
      this.open();
    }
  }
}
