import { IDS_RADIO_DEFAULT_CONFIG, IDS_RADIO_DEFAULT_CONFIG_FACTORY } from './radio-defaults';
import { IdsRadioItemComponent } from './radio-item/radio-item.component';
import { RadioChangeEvent } from './types/radio-events';
import { RadioVariantType } from './types/radio-variant';

import { AfterContentInit, computed, contentChildren, Directive, EventEmitter, forwardRef, HostBinding, HostListener, inject, Injector, Input, input, isDevMode, OnDestroy, OnInit, Output, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanAttribute, createClassList, createComponentError, Orientation, OrientationType, PositionType, SelectionModel, SizeType, VerticalPosition } from '@i-cell/ids-angular/core';
import { Subscription } from 'rxjs';

let nextUniqueId = 0;

const defaultOptions = IDS_RADIO_DEFAULT_CONFIG_FACTORY();

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
})
export class IdsRadioGroupDirective implements OnInit, AfterContentInit, OnDestroy, ControlValueAccessor {
  private readonly _componentClass = 'ids-radio-group';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _injector = inject(Injector);
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...this._injector.get(IDS_RADIO_DEFAULT_CONFIG, null, { optional: true }),
  };

  private readonly _subscription = new Subscription();

  private _selectionModel?: SelectionModel<IdsRadioItemComponent>;
  private _rawValue: unknown;
  private _items = contentChildren<IdsRadioItemComponent>(IdsRadioItemComponent);

  public id = input<string>(this._uniqueId);
  public name = input.required<string>();
  public required = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  public size = input<SizeType>(this._defaultOptions.size);
  public variant = input<RadioVariantType>(this._defaultOptions.variant);
  public orientation = input<OrientationType>(this._defaultOptions.orientation);
  public labelPosition = input<PositionType>(this._defaultOptions.labelPosition);
  public isDisabled = signal<boolean>(false);

  private _hostClasses = computed(() => createClassList(
    this._componentClass,
    [
      this.size(),
      this.orientation(),
      this.labelPosition(),
    ],
  ));

  private _onChange: (value: unknown) => void = () => {};
  private _onTouched: () => unknown = () => {};

  @Input() public valueCompareFn?: (o1: IdsRadioItemComponent, o2: IdsRadioItemComponent) => boolean;
  @Input({ transform: coerceBooleanAttribute })
  set disabled(value: boolean) {
    if (value !== this.disabled) {
      this.isDisabled.set(value);
    }
  }

  @Output() public readonly itemChanges = new EventEmitter<RadioChangeEvent>();

  @HostBinding('class') get hostClasses(): string {
    return this._hostClasses();
  }

  @HostListener('keydown', ['$event']) public handleKeyDown(event: KeyboardEvent): void {
    const navigationKeys: Record<OrientationType, Set<string>> = {
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
        if (orientation === Orientation.HORIZONTAL) {
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
        if (orientation === Orientation.VERTICAL) {
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
        if (orientation === Orientation.HORIZONTAL) {
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
        if (orientation === Orientation.VERTICAL) {
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
    this._selectionModel = new SelectionModel<IdsRadioItemComponent>(false, undefined, false, this.valueCompareFn);

    if (this._hasInvalidLabelPosition()) {
      throw new Error(
        createComponentError(this._componentClass, 'invalid `orientation` + `labelPosition` combination.'),
      );
    }
  }

  public ngAfterContentInit(): void {
    const items = this._items();
    const minItemCount = 2;

    if (isDevMode() && (items.length < minItemCount)) {
      throw new Error(
        createComponentError(this._componentClass, 'invalid count of radio items. Minimum item count is 2.'),
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
    this.isDisabled.set(isDisabled);
  }

  private _subscribeItemChanges(): void {
    this._items().forEach((item) => {
      this._subscription?.add(item.changes.subscribe(
        (change) => {
          this._handleItemChanges(change);
        },
      ));
    });
  }

  private _handleItemChanges(change: RadioChangeEvent): void {
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

    return (orientation === Orientation.VERTICAL && Object.values(VerticalPosition).some((pos) => pos === labelPosition));
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
