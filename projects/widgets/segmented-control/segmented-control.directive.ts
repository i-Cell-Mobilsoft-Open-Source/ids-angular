import { IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG, IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG_FACTORY, IdsSegmentedControlDefaultConfig } from './segmented-control-defaults';
import { IdsSegmentedControlItemComponent } from './segmented-control-item.component';
import { IdsSegmentedControlAppearanceType } from './types/segmented-control-appearance.type';
import { IdsSegmentedControlItemChange } from './types/segmented-control-item-change.class';
import { IdsSegmentedControlVariantType } from './types/segmented-control-variant.type';

import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, computed, contentChildren, Directive, forwardRef, Input, input, isDevMode, OnInit, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBaseWithDefaults, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG_FACTORY();

@Directive({
  selector: `ids-segmented-control[ngModel]:not([formControl]):not([formControlName]),
             ids-segmented-control[formControl]:not([ngModel]):not([formControlName]),
             ids-segmented-control[formControlName]:not([ngModel]):not([formControl])`,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdsSegmentedControlDirective),
      multi: true,
    },
  ],
  host: {
    '[attr.role]': 'multiSelect() ? "group" : "radiogroup"',
    '(keydown)': '_handleKeyDown($event)',
  },
})
export class IdsSegmentedControlDirective
  extends ComponentBaseWithDefaults<IdsSegmentedControlDefaultConfig>
  implements
    AfterContentInit,
    OnInit,
    ControlValueAccessor {
  protected override get _hostName(): string {
    return 'segmented-control';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_SEGMENTED_CONTROL_DEFAULT_CONFIG);

  private _selectionModel?: SelectionModel<IdsSegmentedControlItemComponent>;
  private _rawValue: unknown | unknown[];
  private _items = contentChildren<IdsSegmentedControlItemComponent>(IdsSegmentedControlItemComponent);

  public name = input<string>();
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsSegmentedControlVariantType>(this._defaultConfig.variant);
  public appearance = input<IdsSegmentedControlAppearanceType>(this._defaultConfig.appearance);
  public multiSelect = input<boolean>(false);
  public disabled = signal<boolean>(false);

  protected _hostClasses = computed(() => this._getHostClasses([
    this.size(),
    this.variant(),
    this.appearance(),
    this.disabled() ? 'disabled' : null,
  ]));

  private _onChange: (value: unknown) => void = () => {};
  private _onTouched: () => unknown = () => {};

  @Input() public valueCompareFn?: (o1: IdsSegmentedControlItemComponent, o2: IdsSegmentedControlItemComponent) => boolean;

  public readonly itemChanges = output<IdsSegmentedControlItemChange>();

  private _handleKeyDown(event: KeyboardEvent): void {
    // eslint-disable-next-line @stylistic/js/array-bracket-newline, @stylistic/js/array-element-newline
    const navigationKeys = ['ArrowLeft', 'ArrowRight', 'Enter', 'Spacebar', ' '];

    if (!navigationKeys.includes(event.key)) {
      return;
    }

    event.preventDefault();

    const items = this._items();
    const target = event.target as HTMLElement | null;
    const buttonId = target?.closest('button')?.id;
    const index = items.findIndex((item) => `${item.id()}-button` === buttonId);

    if (index < 0) {
      return;
    }

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
      case ' ':
      case 'Spacebar': {
        items[index].onClick();
        break;
      }
      default:
        return;
    }
  }

  public ngOnInit(): void {
    this._selectionModel = new SelectionModel<IdsSegmentedControlItemComponent>(this.multiSelect(), undefined, false, this.valueCompareFn);
  }

  public ngAfterContentInit(): void {
    const items = this._items();
    const minItemCount = 2;

    if (isDevMode() && (items.length < minItemCount)) {
      throw this._createHostError('invalid count of segmented control items. Minimum item count is 2.');
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
      item.changes.subscribe(
        (change) => {
          this._handleItemChanges(change);
        },
      );
    });
  }

  private _handleItemChanges(change: IdsSegmentedControlItemChange): void {
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
    this.itemChanges.emit(change);
    this._handleChange();
    this._onTouched();
  }

  private _setSelectionByValue(value: unknown | unknown[]): void {
    this._rawValue = value;

    if (this._items().length === 0) {
      return;
    }

    if (this.multiSelect() && value) {
      if (!Array.isArray(value)) {
        throw this._createHostError('value must be an array in multiple-selection mode');
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

  private _clearSelection(): void {
    this._selectionModel?.clear();
    this._items().forEach((item) => {
      item.selected.set(false);
    });
  }

  private _handleChange(): void {
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
}
