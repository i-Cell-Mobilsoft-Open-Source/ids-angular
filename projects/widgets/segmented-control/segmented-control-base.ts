import { IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG, IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG_FACTORY } from './segmented-control-defaults';
import { IdsSegmentedControlItemComponent } from './segmented-control-item/segmented-control-item.component';
import { IdsSegmentedControlToggleItemComponent } from './segmented-control-item/segmented-control-toggle-item.component';
import { IdsSegmentedControlAppearanceType } from './types/segmented-control-appearance.type';
import { IdsSegmentedControlItemChange, IdsSegmentedControlToggleItemChange } from './types/segmented-control-item-change.class';
import { IdsSegmentedControlVariantType } from './types/segmented-control-variant.type';

import { AfterContentInit, computed, Directive, EventEmitter, inject, Input, input, InputSignal, isDevMode, OnDestroy, OnInit, Output, Signal, signal } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { createClassList, createComponentError, SelectionModel, IdsSizeType } from '@i-cell/ids-angular/core';
import { Subscription } from 'rxjs';

const defaultOptions = IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG_FACTORY();

type SegmentedControlItem = IdsSegmentedControlToggleItemComponent | IdsSegmentedControlItemComponent;
type SegmentedControlItemEvent = IdsSegmentedControlToggleItemChange | IdsSegmentedControlItemChange;

@Directive({
  host: {
    '[class]': '_hostClasses()',
    '(keydown)': '_handleKeyDown($event)',
  },
})
export abstract class IdsSegmentedControlBase<I extends SegmentedControlItem, E extends SegmentedControlItemEvent>
implements AfterContentInit, OnInit, OnDestroy, ControlValueAccessor {
  protected abstract readonly _componentClass: string;
  protected abstract readonly _uniqueId: string;
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...inject(IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG, { optional: true }),
  };

  private readonly _subscription = new Subscription();

  protected _selectionModel?: SelectionModel<I>;
  private _rawValue: unknown | unknown[];
  protected abstract _items: Signal<ReadonlyArray<I>>;

  public abstract id: InputSignal<string>;
  public name = input<string>();
  public size = input<IdsSizeType>(this._defaultOptions.size);
  public variant = input<IdsSegmentedControlVariantType>(this._defaultOptions.variant);
  public appearance = input<IdsSegmentedControlAppearanceType>(this._defaultOptions.appearance);
  public abstract multiSelect: InputSignal<boolean> | Signal<boolean>;
  public disabled = signal<boolean>(false);

  private _hostClasses = computed(() => createClassList(
    this._componentClass,
    [
      this.size(),
      this.variant(),
      this.appearance(),
      this.disabled() ? 'disabled' : null,
    ],
  ));

  private _onChange: (value: unknown) => void = () => {};
  protected _onTouched: () => unknown = () => {};

  @Input() public valueCompareFn?: (o1: I, o2: I) => boolean;

  @Output() public abstract readonly itemChanges: EventEmitter<E>;

  private _handleKeyDown(event: KeyboardEvent): void {
    // eslint-disable-next-line @stylistic/js/array-bracket-newline, @stylistic/js/array-element-newline
    const navigationKeys = ['ArrowLeft', 'ArrowRight', 'Enter', ' '];

    if (!navigationKeys.includes(event.key)) {
      return;
    }

    event.preventDefault();

    const items = this._items();
    const target = event.target as HTMLButtonElement;
    const buttonId = target.id;
    const index = items.findIndex((item) => item.id() === buttonId);

    switch (event.key) {
      case 'ArrowLeft': {
        if (index === 0) {
          return;
        }
        const prevItem = items[index - 1];
        prevItem.focus();
        break;
      }
      case 'ArrowRight': {
        if (index === (items.length - 1)) {
          return;
        }
        const nextItem = items[index + 1];
        nextItem.focus();
        break;
      }
      case 'Enter':
      case ' ': {
        items[index].onClick();
        break;
      }
      default:
        return;
    }
  }

  public ngOnInit(): void {
    this._selectionModel = new SelectionModel<I>(this.multiSelect(), undefined, false, this.valueCompareFn);
  }

  public ngAfterContentInit(): void {
    const items = this._items();
    const minItemCount = 2;

    if (isDevMode() && (items.length < minItemCount)) {
      throw new Error(
        createComponentError(this._componentClass, 'invalid count of segmented control items. Minimum item count is 2.'),
      );
    }

    this._selectionModel?.select(...this._items().filter((item) => item.selected()));
    this._subscribeItemChanges();
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

  private _subscribeItemChanges(): void {
    this._items().forEach((item) => {
      this._subscription?.add(item.changes.subscribe(
        (change) => {
          this._handleItemChanges(change as E);
        },
      ));
    });
  }

  protected abstract _handleItemChanges(change: E): void;

  private _setSelectionByValue(value: unknown | unknown[]): void {
    this._rawValue = value;

    if (this._items().length === 0) {
      return;
    }

    if (this.multiSelect() && value) {
      if (!Array.isArray(value)) {
        throw new Error(createComponentError(this._componentClass, 'value must be an array in multiple-selection mode'));
      }

      this._clearSelection();
      value.forEach((currentValue: unknown) => this._selectValue(currentValue));
    } else {
      this._clearSelection();
      this._selectValue(value);
    }
  }

  private _selectValue(value: unknown): void {
    const correspondingItem = this._items().find((item) => item.value() != null && item.value() === value);
    if (correspondingItem) {
      correspondingItem.selected.set(true);
      this._selectionModel?.select(correspondingItem);
    }
  }

  protected _clearSelection(): void {
    this._selectionModel?.clear();
    this._items().forEach((item) => {
      item.selected.set(false);
    });
  }

  protected _handleChange(): void {
    const selectionModelValues = this._selectionModel?.selected?.map((item) => item.value());
    if (this.multiSelect()) {
      this._onChange(selectionModelValues);
    } else {
      this._onChange(selectionModelValues?.[0]);
    }
  }

  public isItemPreSelectedByValue(itemValue: unknown): boolean {
    if (this._rawValue === undefined) {
      return false;
    }

    if (this.multiSelect() && Array.isArray(this._rawValue)) {
      return this._rawValue.some((value) => itemValue != null && value === itemValue);
    }

    return itemValue === this._rawValue;
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
