import { IDS_RADIO_DEFAULT_CONFIG, IDS_RADIO_DEFAULT_CONFIG_FACTORY, IdsRadioDefaultConfig } from './radio-defaults';
import { IdsRadioComponent } from './radio.component';
import { IdsRadioChangeEvent } from './types/radio-events.class';
import { IdsRadioVariantType } from './types/radio-variant.type';

import { SelectionModel } from '@angular/cdk/collections';
import { AfterContentChecked, computed, contentChildren, Directive, forwardRef, Input, input, isDevMode, OnInit, output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanAttribute, IdsOrientation, IdsOrientationType, IdsPositionType, IdsSizeType, IdsVerticalPosition, ComponentBaseWithDefaults } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_RADIO_DEFAULT_CONFIG_FACTORY();

@Directive({
  selector: 'ids-radio-group',
  standalone: true,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => IdsRadioGroupDirective),
      multi: true,
    },
  ],
  host: {
    '(keydown)': '_handleKeyDown($event)',
  },
})
export class IdsRadioGroupDirective
  extends ComponentBaseWithDefaults<IdsRadioDefaultConfig>
  implements OnInit, AfterContentChecked, ControlValueAccessor {
  protected override get _hostName(): string {
    return 'radio-group';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_RADIO_DEFAULT_CONFIG);

  private _selectionModel?: SelectionModel<IdsRadioComponent>;
  private _rawValue: unknown;
  private _items = contentChildren<IdsRadioComponent>(IdsRadioComponent, { descendants: true });

  public name = input.required<string>();
  public required = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsRadioVariantType>(this._defaultConfig.variant);
  public orientation = input<IdsOrientationType>(this._defaultConfig.orientation);
  public labelPosition = input<IdsPositionType>(this._defaultConfig.labelPosition);
  public isDisabled = signal<boolean>(false);

  protected _hostClasses = computed(() => this._getHostClasses([
    this.size(),
    this.orientation(),
    this.labelPosition(),
  ]));

  private _onChange: (value: unknown) => void = () => {};
  private _onTouched: () => unknown = () => {};

  @Input() public valueCompareFn?: (o1: IdsRadioComponent, o2: IdsRadioComponent) => boolean;
  @Input({ transform: coerceBooleanAttribute })
  set disabled(value: boolean) {
    if (value !== this.disabled) {
      this.isDisabled.set(value);
    }
  }

  public readonly itemChanges = output<IdsRadioChangeEvent>();

  private _handleKeyDown(event: KeyboardEvent): void {
    const navigationKeys: Record<IdsOrientationType, Set<string>> = {
      // eslint-disable-next-line @stylistic/js/array-bracket-newline, @stylistic/js/array-element-newline
      horizontal: new Set(['ArrowLeft', 'ArrowRight', 'Enter', ' ']),
      // eslint-disable-next-line @stylistic/js/array-bracket-newline, @stylistic/js/array-element-newline
      vertical: new Set(['ArrowUp', 'ArrowDown', 'Enter', ' ']),
    };

    const orientation = this.orientation();

    if (navigationKeys.horizontal.has(event.key) || navigationKeys.vertical.has(event.key)) {
      event.preventDefault();
    }
    if (!navigationKeys[orientation].has(event.key)) {
      return;
    }

    const items = this._items();
    const target = event.target as HTMLButtonElement;
    const inputId = target.id;
    const index = items.findIndex((item) => item.inputId() === inputId);

    switch (event.key) {
      case 'ArrowUp': {
        if (orientation === IdsOrientation.HORIZONTAL) {
          return;
        }
        if (index === 0) {
          return;
        }
        const prevItem = items[index - 1];
        prevItem.focus();
        break;
      }
      case 'ArrowLeft': {
        if (orientation === IdsOrientation.VERTICAL) {
          return;
        }
        if (index === 0) {
          return;
        }
        const prevItem = items[index - 1];
        prevItem.focus();
        break;
      }
      case 'ArrowDown': {
        if (orientation === IdsOrientation.HORIZONTAL) {
          return;
        }
        if (index === (items.length - 1)) {
          return;
        }
        const nextItem = items[index + 1];
        nextItem.focus();
        break;
      }
      case 'ArrowRight': {
        if (orientation === IdsOrientation.VERTICAL) {
          return;
        }
        if (index === (items.length - 1)) {
          return;
        }
        const nextItem = items[index + 1];
        nextItem.focus();
        break;
      }
      case 'Enter':
      case ' ': {
        items[index].onChange();
        break;
      }
      default:
        return;
    }
  }

  public ngOnInit(): void {
    this._selectionModel = new SelectionModel<IdsRadioComponent>(false, undefined, false, this.valueCompareFn);

    if (this._hasInvalidLabelPosition()) {
      throw this._createHostError('invalid `orientation` + `labelPosition` combination.');
    }
  }

  public ngAfterContentChecked(): void {
    const items = this._items();
    const minItemCount = 2;

    if (isDevMode() && (items.length < minItemCount)) {
      throw this._createHostError('invalid count of radio items. Minimum item count is 2.');
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
    this.isDisabled.set(isDisabled);
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

  private _handleItemChanges(change: IdsRadioChangeEvent): void {
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

  private _hasInvalidLabelPosition(): boolean {
    const orientation = this.orientation();
    const labelPosition = this.labelPosition();

    return (orientation === IdsOrientation.VERTICAL && Object.values(IdsVerticalPosition).some((pos) => pos === labelPosition));
  }
}
