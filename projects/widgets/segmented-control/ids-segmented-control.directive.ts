import { IDS_SEGMENTED_CONTROL_DEFAULT_OPTIONS, IDS_SEGMENTED_CONTROL_DEFAULT_OPTIONS_FACTORY } from './ids-segmented-control-default-options';
import { IdsSegmentedControlItemComponent } from './segmented-control-item/ids-segmented-control-item.component';
import { IdsSegmentedControlItemChange } from './types/ids-segmented-control-item-change';
import { SegmentedControlAppearanceType } from './types/ids-semneted-control-appearance';
import { SegmentedControlVariantType } from './types/ids-semneted-control-variant';

import { AfterContentInit, computed, contentChildren, Directive, EventEmitter, forwardRef, HostBinding, inject, Injector, Input, input, isDevMode, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanAttribute, createClassList, SelectionModel, SizeType } from '@i-cell/ids-angular/core';
import { Subscription } from 'rxjs';

let nextUniqueId = 0;

const defaultOptions = IDS_SEGMENTED_CONTROL_DEFAULT_OPTIONS_FACTORY();

@Directive({
  selector: 'ids-segmented-control',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdsSegmentedControlDirective),
      multi: true,
    },
  ],
})
export class IdsSegmentedControlDirective implements AfterContentInit, OnInit, OnDestroy, ControlValueAccessor {
  private readonly _componentClass = 'ids-segmented-control';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _injector = inject(Injector);
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...this._injector.get(IDS_SEGMENTED_CONTROL_DEFAULT_OPTIONS, null, { optional: true }),
  };

  private readonly _subscription = new Subscription();

  private _selectionModel?: SelectionModel<IdsSegmentedControlItemComponent>;
  private _rawValue: unknown;
  private _items = contentChildren<IdsSegmentedControlItemComponent>(IdsSegmentedControlItemComponent);

  public id = input<string>(this._uniqueId);
  public name = input<string>();
  public size = input<SizeType>(this._defaultOptions.size);
  public variant = input<SegmentedControlVariantType>(this._defaultOptions.variant);
  public appearance = input<SegmentedControlAppearanceType>(this._defaultOptions.appearance);
  public multiSelect = input<boolean>(false);
  public isDisabled = signal<boolean>(false);

  private _hostClasses = computed(() => createClassList(
    this._componentClass,
    [
      this.size(),
      this.variant(),
      this.appearance(),
      this.isDisabled() ? 'disabled' : null,
    ],
  ));

  private _onChange: (value: unknown) => void = () => {};
  private _onTouched: () => unknown = () => {};

  @Input({ transform: coerceBooleanAttribute })
  set disabled(value: boolean) {
    if (value !== this.disabled) {
      this.isDisabled.set(value);
    }
  }

  @Input()
  get value(): unknown {
    const selected = this._selectionModel ? this._selectionModel.selected : [];

    if (this.multiSelect()) {
      return selected.map((item) => item.value());
    }

    return selected[0] ? selected[0].value() : undefined;
  }

  set value(newValue: unknown) {
    this._setSelectionByValue(newValue);
    this.valueChanges.emit(this.value);
  }

  @Output() public readonly itemChanges = new EventEmitter<IdsSegmentedControlItemChange>();
  @Output() public readonly valueChanges = new EventEmitter<unknown>();

  @HostBinding('id') get hostId(): string {
    return this.id();
  }

  @HostBinding('class') get hostClasses(): string {
    return this._hostClasses();
  }

  public ngOnInit(): void {
    this._selectionModel = new SelectionModel<IdsSegmentedControlItemComponent>(this.multiSelect(), undefined, false);
  }

  public ngAfterContentInit(): void {
    const items = this._items();
    const minItemCount = 2;
    const maxItemCount = 5;

    if (isDevMode() && (items.length < minItemCount || items.length > maxItemCount)) {
      throw new Error('Segmented control: invalid count of segmented control items. Minimum item count is 2, maximum is 5.');
    }

    this._selectionModel?.select(...this._items().filter((item) => item.selected));
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
    this.isDisabled.set(isDisabled);
  }

  private _subscribeItemChanges(): void {
    this._items().forEach((item) => {
      this._subscription?.add(item.changes.subscribe(
        (change) => {
          const { source, selected } = change;
          if (!this.multiSelect()) {
            this._clearSelection();
          }
          source.selected = selected;
          if (selected) {
            this._selectionModel?.select(source);
          } else {
            this._selectionModel?.deselect(source);
          }
          this.itemChanges.emit(change);
          this._emitValueChangeEvent();
          this._onTouched();
        },
      ));
    });
  }

  private _setSelectionByValue(value: unknown | unknown[]): void {
    this._rawValue = value;

    if (this._items().length === 0) {
      return;
    }

    if (this.multiSelect() && value) {
      if (!Array.isArray(value)) {
        throw new Error('Segmented control: value must be an array in multiple-selection mode.');
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
      correspondingItem.selected = true;
      this._selectionModel?.select(correspondingItem);
    }
  }

  private _clearSelection(): void {
    this._selectionModel?.clear();
    this._items().forEach((item) => {
      item.selected = false;
    });
  }

  private _emitValueChangeEvent(): void {
    if (this.multiSelect()) {
      const value = this._selectionModel?.selected.map((item) => item.value());
      this.valueChanges.emit(value);
      this._onChange(value);
    } else {
      const selected = this._selectionModel?.selected.map((item) => item.value());
      const value = selected && selected.length > 0 ? selected : undefined;
      this.valueChanges.emit(value);
      this._onChange(value);
    }
  }

  public isItemPreSelected(item: IdsSegmentedControlItemComponent): boolean {
    if (this._rawValue === undefined) {
      return false;
    }

    if (this.multiSelect() && Array.isArray(this._rawValue)) {
      return this._rawValue.some((value) => item.value() != null && value === item.value());
    }

    return item.value() === this._rawValue;
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
