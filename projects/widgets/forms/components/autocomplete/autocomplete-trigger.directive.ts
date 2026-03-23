import { IdsAutocompleteComponent } from './autocomplete.component';
import { IdsOptionValue } from './types/option-value.type';

import { _countGroupLabelsBeforeOption, _getOptionScrollPosition, IdsOptionComponent } from '../option/option.component';
import { IdsOptionSelectionChange } from '../option/types/option-events.class';

import { ActiveDescendantKeyManager, LiveAnnouncer } from '@angular/cdk/a11y';
import { SelectionModel } from '@angular/cdk/collections';
import { hasModifierKey } from '@angular/cdk/keycodes';
import { afterNextRender, computed, Directive, effect, ElementRef, inject, Injector, input, isDevMode, OnDestroy, OnInit, Renderer2, untracked } from '@angular/core';

const LIVE_ANNOUNCER_DURATION = 10000;

@Directive({
  selector: 'input[idsAutocompleteTriggerFor]',
  host: {
    class: 'ids-form-field-control',
    '[attr.role]': '_disabled() ? null : "combobox"',
    '[attr.autocomplete]': '"off"',
    '[attr.aria-autocomplete]': '_disabled() ? null : "list"',
    '[attr.aria-activedescendant]': '_getAriaActiveDescendant()',
    '[attr.aria-owns]': 'autocomplete().panelOpen() ? autocomplete().id() + "-panel" : null',
    '[attr.aria-expanded]': '_disabled() ? null : autocomplete().panelOpen().toString()',
    '[attr.aria-controls]': '(_disabled() || !autocomplete().panelOpen()) ? null : autocomplete()?.id()',
    '[attr.aria-haspopup]': '_disabled() ? null : "listbox"',
    '[attr.tabindex]': '_disabled() ? -1 : autocomplete().tabIndex()',
    '[attr.aria-required]': 'autocomplete().required().toString()',
    '[attr.aria-disabled]': '_disabled().toString()',
    '[attr.aria-invalid]': 'autocomplete().hasErrorState()',
    '[attr.readonly]': '_readonly() ? "true" : null',
    '[disabled]': '_disabled()',
    '(keydown)': '_handleKeydown($event)',
    '(focus)': 'focus()',
    '(blur)': '_onBlur()',
  },
  exportAs: 'idsAutocompleteTrigger',
})
export class IdsAutocompleteTriggerDirective implements OnInit, OnDestroy {
  public autocomplete = input.required<IdsAutocompleteComponent>({ alias: 'idsAutocompleteTriggerFor' });
  protected _disabled = computed(() => this.autocomplete().disabled());
  protected _readonly = computed(() => this.autocomplete().readonly());
  private _inputElement = inject(ElementRef<HTMLInputElement>);
  private _keyManager?: ActiveDescendantKeyManager<IdsOptionComponent>;
  private _selectionModel?: SelectionModel<IdsOptionValue>;
  private readonly _liveAnnouncer = inject(LiveAnnouncer);
  private readonly _renderer = inject(Renderer2);
  private readonly _injector = inject(Injector);

  public get selected(): IdsOptionValue[] {
    return this._selectionModel?.selected ?? [];
  }

  public get selectedOptions(): IdsOptionComponent[] {
    const selectedValues = this.selected.map((option) => option.value) ?? [];
    return this.autocomplete()
      .options()
      .filter((option) => selectedValues.includes(option.value()));
  }

  constructor() {
    effect(() => {
      const options = this.autocomplete().options();

      untracked(() => {
        if (options.length > 0) {
          this._initKeyManager();
          this._subscribeOptionChanges();
          this._liveAnnouncer.announce(options.length.toString(), LIVE_ANNOUNCER_DURATION);

          if (!this._selectionModel!.isEmpty()) {
            this._updateCurrentSelection();
          }
        }
      });
    });
  }

  public ngOnInit(): void {
    this._selectionModel = new SelectionModel<IdsOptionValue>(true, undefined, true, this.autocomplete().valueCompareFn());

    this._selectionModel.changed.subscribe(() => {
      if (this.autocomplete().multiSelect()) {
        this._selectionModel?.sort(this.autocomplete().sortCompareFn());
      } else {
        this._updateInputValue(this.selected[0]?.viewValue);
      }
      this.autocomplete().handleChange(
        this.autocomplete().multiSelect() ? this.selected.map((option) => option.value) : (this.selected[0]?.value ?? null),
      );
      this.autocomplete().onTouched();
    });
  }

  public ngOnDestroy(): void {
    this._keyManager?.destroy();
  }

  public toggle(): void {
    this.autocomplete().panelOpen() ? this.close() : this.open();
  }

  public open(): void {
    if (!this._canOpen()) {
      return;
    }
    this.autocomplete().setPanelOpen();
    this._keyManager?.withHorizontalOrientation(null);

    // wait for opening panel...
    afterNextRender(() => {
      this._scrollOptionIntoView(this._keyManager?.activeItemIndex ?? 0);
      this._highlightCorrectOption();
    }, { injector: this._injector });
  }

  public close(): void {
    if (this.autocomplete().panelOpen()) {
      this.autocomplete().panelOpen.set(false);
      this._keyManager?.withHorizontalOrientation('ltr');
      this.autocomplete().onTouched();
    }
  }

  public clear(): void {
    this._clearSelection();
    this._updateInputValue('');
  }

  public removeOption(optionValue: IdsOptionValue): void {
    const option = this.autocomplete()
      .options()
      .find((opt) => opt.value() === optionValue.value);
    if (option) {
      this._handleOptionChange({
        source: option,
        selected: false,
        isUserInput: true,
      });
    } else {
      // item to be removed is NOT the current option list, but present in selection model --> deselect directly
      this._selectionModel?.deselect(optionValue);
    }
  }

  public focus(options?: FocusOptions): void {
    this._inputElement.nativeElement.focus(options);
    this.open();
  }

  public setSelectionByValue(value: unknown | unknown[]): void {
    if (this.autocomplete().multiSelect() && value !== null) {
      if (!Array.isArray(value)) {
        throw this.autocomplete().createHostError('value must be an array in multiple-selection mode');
      } else {
        value.forEach((currentValue: unknown) => this._selectValue(currentValue));
      }
    } else {
      const correspondingOption = this._selectValue(value);
      if (correspondingOption) {
        this._keyManager?.updateActiveItem(correspondingOption);
      } else if (!this.autocomplete().panelOpen()) {
        this._keyManager?.updateActiveItem(-1);
      }
    }
  }

  protected _handleKeydown(event: KeyboardEvent): void {
    if (!this._disabled() && !this._readonly()) {
      this.autocomplete().panelOpen() ? this._handleOpenedPanelKeydown(event) : this._handleClosedPanelKeydown(event);
    }
  }

  protected _onBlur(): void {
    if (!this._disabled()) {
      this.autocomplete().onTouched();
    }
  }

  protected _getAriaActiveDescendant(): string | null {
    if (this.autocomplete().panelOpen() && this._keyManager?.activeItem) {
      return this._keyManager.activeItem.id();
    }
    return null;
  }

  private _initKeyManager(): void {
    this._keyManager = new ActiveDescendantKeyManager<IdsOptionComponent>(this.autocomplete().options())
      .withVerticalOrientation()
      .withHorizontalOrientation('ltr')
      .withHomeAndEnd()
      .withPageUpDown()
      .withAllowedModifierKeys(['shiftKey'])
      .skipPredicate(this._skipPredicate);

    this._keyManager.tabOut.subscribe(() => {
      if (this.autocomplete().panelOpen()) {
        if (!this.autocomplete().multiSelect() && this._keyManager?.activeItem) {
          this._keyManager.activeItem.selectViaInteraction();
        }
        this.focus();
        this.close();
      }
    });

    this._keyManager.change.subscribe(() => {
      if (this.autocomplete().panelOpen()) {
        this._scrollOptionIntoView(this._keyManager?.activeItemIndex ?? 0);
      }
    });
  }

  private _subscribeOptionChanges(): void {
    this.autocomplete()
      .options()
      .forEach((option) => {
        option.onSelectionChange.subscribe((change) => {
          this._handleOptionChange(change);
        });
      });
  }

  private _handleOptionChange(change: IdsOptionSelectionChange): void {
    const { source, selected, isUserInput } = change;
    if (!this.autocomplete().multiSelect()) {
      this._clearSelection();
    }
    source.selected.set(selected);

    if (isUserInput) {
      this._keyManager?.setActiveItem(source);
    }

    if (isUserInput && !this.autocomplete().multiSelect() && this.autocomplete().panelOpen()) {
      this.close();
    }

    const optionValue = this._getAsOptionValue(source);

    if (selected) {
      this._selectionModel?.select(optionValue);
    } else {
      this._selectionModel?.deselect(optionValue);
    }
  }

  private _clearSelection(): void {
    this._selectionModel?.clear();
    this._clearOptionsSelection();
  }

  private _clearOptionsSelection(): void {
    this.autocomplete()
      .options()
      .forEach((option) => {
        option.setInactiveStyles();
        option.selected.set(false);
      });
  }

  private _canOpen(): boolean {
    return !this._readonly() && !this._disabled();
  }

  private _handleOpenedPanelKeydown(event: KeyboardEvent): void {
    const manager = this._keyManager;
    const key = event.key;
    const isArrowKey = key === 'ArrowDown' || key === 'ArrowUp';
    const isTyping = manager !== undefined && manager.isTyping();
    const isEscapeKey = key === 'Escape';

    if ((isArrowKey && event.altKey) || isEscapeKey) {
      event.preventDefault();
      this.close();
    } else if (!isTyping && (key === 'Enter' || key === ' ') && manager?.activeItem && !hasModifierKey(event)) {
      event.preventDefault();
      manager.activeItem.selectViaInteraction();
    } else if (!isTyping && this.autocomplete().multiSelect() && key === 'a' && event.ctrlKey) {
      event.preventDefault();
      const hasDeselectedOptions = this.autocomplete()
        .options()
        .some((opt) => !opt.disabled && !opt.selected());

      this.autocomplete()
        .options()
        .forEach((option) => {
          if (!option.disabled) {
            hasDeselectedOptions ? option.select() : option.deselect();
          }
        });
    } else {
      const previouslyFocusedIndex = manager?.activeItemIndex;

      manager?.onKeydown(event);
      this._scrollOptionIntoView(manager?.activeItemIndex ?? 0);

      if (
        this.autocomplete().multiSelect() &&
        isArrowKey &&
        event.shiftKey &&
        manager?.activeItem &&
        manager?.activeItemIndex !== previouslyFocusedIndex
      ) {
        manager?.activeItem.selectViaInteraction();
      }
    }
  }

  private _handleClosedPanelKeydown(event: KeyboardEvent): void {
    const manager = this._keyManager;
    const key = event.key;
    const isArrowKey = key === 'ArrowDown' || key === 'ArrowUp' || key === 'ArrowLeft' || key === 'ArrowRight';
    const isOpenKey = key === 'Enter' || key === ' ';
    const isEscapeKey = key === 'Escape';

    if ((manager && !manager.isTyping() && isOpenKey && !hasModifierKey(event)) || isArrowKey) {
      event.preventDefault();
      this.open();
    } else if (!this.autocomplete().multiSelect() && !isEscapeKey) {
      const previouslySelectedOption = this.selectedOptions[0];
      manager?.onKeydown(event);
      const selectedOption = this.selectedOptions[0];

      if (selectedOption?.viewValue() && previouslySelectedOption !== selectedOption) {
        this._liveAnnouncer.announce(selectedOption.viewValue(), LIVE_ANNOUNCER_DURATION);
      }
    }
  }

  private _skipPredicate = (option: IdsOptionComponent): boolean => {
    if (this.autocomplete().panelOpen()) {
      return false;
    }

    return option.disabledInput();
  };

  private _highlightCorrectOption(): void {
    if (this._keyManager) {
      if (this._selectionModel?.isEmpty() ?? true) {
        let firstEnabledOptionIndex = -1;
        for (let index = 0; index < this.autocomplete().options().length; index++) {
          const option = this.autocomplete().options()[index]!;
          if (!option.disabled) {
            firstEnabledOptionIndex = index;
            break;
          }
        }

        this._keyManager.setActiveItem(firstEnabledOptionIndex);
      } else {
        if (this._selectionModel) {
          this._keyManager.setActiveItem(this.selectedOptions[0]);
        }
      }
    }
  }

  private _scrollOptionIntoView(index: number): void {
    const option = this.autocomplete().options()[index];

    if (option !== undefined) {
      const labelCount = _countGroupLabelsBeforeOption(index, this.autocomplete().options(), this.autocomplete().optionGroups());
      const element = option.getHostElement();

      if (index === 0 || (index === 0 && labelCount === 1)) {
        this.autocomplete().setScrollTop(0);
      } else {
        const newScrollPosition = _getOptionScrollPosition(
          element.offsetTop,
          element.offsetHeight,
          this.autocomplete().getScrollTop(),
          this.autocomplete().panel()?.nativeElement.offsetHeight,
        );
        this.autocomplete().setScrollTop(newScrollPosition);
      }
    }
  }

  private _selectValue(value: unknown): IdsOptionComponent | undefined {
    const valueCompareFn = this.autocomplete().valueCompareFn();
    const correspondingOption = this.autocomplete()
      .options()
      .find((option) => {
        if (this._selectionModel && this._selectionModel.isSelected(this._getAsOptionValue(option))) {
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
      const correspondingOptionValue = this._getAsOptionValue(correspondingOption);
      this._selectionModel?.select(correspondingOptionValue);
    }

    return correspondingOption;
  }

  private _updateCurrentSelection(): void {
    this._clearOptionsSelection();
    this.selectedOptions.reverse().forEach((option) => {
      option.selected.set(true);
      option.setActiveStyles();
      this._keyManager?.setActiveItem(option);
    });
  }

  private _getAsOptionValue(option: IdsOptionComponent): IdsOptionValue {
    return { value: option.value(), viewValue: option.viewValue() };
  }

  private _updateInputValue(value: string): void {
    const input = this._inputElement.nativeElement;
    this._renderer.setProperty(input, 'value', value);
    input.dispatchEvent(new Event('input', { bubbles: true }));
  }
}
