import { IdsSegmentedControlToggleItemComponent } from './segmented-control-item/segmented-control-toggle-item.component';
import { IDS_SEGMENTED_CONTROL_TOGGLE_DEFAULT_CONFIG, IDS_SEGMENTED_CONTROL_TOGGLE_DEFAULT_CONFIG_FACTORY, IdsSegmentedControlToggleDefaultConfig } from './segmented-control-toggle-defaults';
import { IdsSegmentedControlToggleItemChange } from './types/segmented-control-item-change.class';
import { IdsSegmentedControlToggleAppearanceType } from './types/segmented-control-toggle-appearance.type';
import { IdsSegmentedControlToggleButtonVariantType, IdsSegmentedControlToggleVariantType } from './types/segmented-control-toggle-variant.type';

import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentInit, computed, contentChildren, Directive, forwardRef, Input, input, isDevMode, OnInit, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBaseWithDefaults, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_SEGMENTED_CONTROL_TOGGLE_DEFAULT_CONFIG_FACTORY();

@Directive({
  selector: `ids-segmented-control-toggle[ngModel]:not([formControl]):not([formControlName]),
             ids-segmented-control-toggle[formControl]:not([ngModel]):not([formControlName]),
             ids-segmented-control-toggle[formControlName]:not([ngModel]):not([formControl])`,
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdsSegmentedControlToggleDirective),
      multi: true,
    },
  ],
  host: {
    '[attr.role]': 'radiogroup',
    '(keydown)': '_handleKeyDown($event)',
  },
})
export class IdsSegmentedControlToggleDirective
  extends ComponentBaseWithDefaults<IdsSegmentedControlToggleDefaultConfig>
  implements
    AfterContentInit,
    OnInit,
    ControlValueAccessor {
  protected override get _hostName(): string {
    return 'segmented-control-toggle';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_SEGMENTED_CONTROL_TOGGLE_DEFAULT_CONFIG);

  private _selectionModel?: SelectionModel<IdsSegmentedControlToggleItemComponent>;
  private _rawValue: unknown | unknown[];
  private _items = contentChildren<IdsSegmentedControlToggleItemComponent>(IdsSegmentedControlToggleItemComponent);

  public name = input<string>();
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsSegmentedControlToggleVariantType>(this._defaultConfig.variant);
  public buttonVariant = input<IdsSegmentedControlToggleButtonVariantType>(this._defaultConfig.buttonVariant);
  public appearance = input<IdsSegmentedControlToggleAppearanceType>(this._defaultConfig.appearance);
  public disabled = signal<boolean>(false);

  protected _hostClasses = computed(() => this._getHostClasses([
    this.size(),
    this.variant(),
    this.appearance(),
    this.disabled() ? 'disabled' : null,
  ]));

  private _onChange: (value: unknown) => void = () => {};
  private _onTouched: () => unknown = () => {};

  @Input() public valueCompareFn?: (o1: IdsSegmentedControlToggleItemComponent, o2: IdsSegmentedControlToggleItemComponent) => boolean;

  public readonly itemChanges = output<IdsSegmentedControlToggleItemChange>();

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
    this._selectionModel = new SelectionModel<IdsSegmentedControlToggleItemComponent>(false, undefined, false, this.valueCompareFn);
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

  private _handleItemChanges(change: IdsSegmentedControlToggleItemChange): void {
    const { source } = change;
    this._clearSelection();
    source.selected.set(true);
    this._selectionModel?.select(source);
    this.itemChanges.emit(change);
    this._handleChange();
    this._onTouched();
  }

  private _setSelectionByValue(value: unknown | unknown[]): void {
    this._rawValue = value;

    if (this._items().length === 0) {
      return;
    }

    this._clearSelection();
    this._selectValue(value);

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
    this._onChange(selectionModelValues?.[0]);
  }

  public isItemPreSelectedByValue(itemValue: unknown): boolean {
    if (this._rawValue === undefined) {
      return false;
    }

    return itemValue === this._rawValue;
  }
}
