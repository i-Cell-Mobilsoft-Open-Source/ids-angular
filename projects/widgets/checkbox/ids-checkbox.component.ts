import { CheckboxVariant, CheckboxVariantType } from './public-api';
import { CheckBoxChangeEvent } from './types/checkbox-events';
import { CheckboxState, CheckboxStateType } from './types/checkbox-state';

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, OnChanges, Output, SimpleChange, SimpleChanges, ViewChild, ViewEncapsulation, computed, inject, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Size, SizeType, coerceBooleanAttribute, coerceNumberAttribute, hostClassGenerator } from '@i-cell/widgets/core';

let nextUniqueId = 0;

@Component({
  selector: 'ids-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './ids-checkbox.component.html',
  styleUrl: './ids-checkbox.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IdsCheckboxComponent,
      multi: true,
    },
  ],
  exportAs: 'matCheckbox',
  encapsulation: ViewEncapsulation.None,
})
export class IdsCheckboxComponent implements OnChanges, AfterViewInit, ControlValueAccessor {
  private readonly _componentClass = 'ids-checkbox';
  private _uniqueId = `${this._componentClass}-${++nextUniqueId}`;

  public checkboxState = signal<CheckboxStateType>(CheckboxState.UNCHECKED);

  public id = input<string>(this._uniqueId);
  public inputId = computed(() => this.id() || this._uniqueId);
  public label = input<string>();
  public name = input<string | null>();
  public required = input(false, { transform: coerceBooleanAttribute });
  public readonly = input(false, { transform: coerceBooleanAttribute });
  public size = input<SizeType | null>(Size.COMFORTABLE);
  public tabIndex = input(0, { transform: coerceNumberAttribute });
  public value = input<string>();
  public variant = input<CheckboxVariantType | null>(CheckboxVariant.SURFACE);

  public isDisabled = signal(false);

  public isChecked = computed(() => this.checkboxState() === CheckboxState.CHECKED);
  public isIndeterminate = computed(() => this.checkboxState() === CheckboxState.INDETERMINATE);
  private _hostClasses = computed(() => hostClassGenerator(this._componentClass, [
    this.size(),
    this.variant(),
    ...[this.isDisabled() ? 'disabled' : null],
  ]),
  );

  private _controlValueAccessorChangeFn: (value: unknown) => void = () => {};
  private _onTouched: () => unknown = () => {};

  private _changeDetectorRef = inject(ChangeDetectorRef);

  @Input({ transform: coerceBooleanAttribute }) public checked?: boolean;

  @Input({ transform: coerceBooleanAttribute }) public indeterminate?: boolean;

  @Input({ transform: coerceBooleanAttribute })
  set disabled(value: boolean) {
    if (value !== this.disabled) {
      this.isDisabled.set(value);
      this._changeDetectorRef.markForCheck();
    }
  }

  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() public readonly change = new EventEmitter<CheckBoxChangeEvent>();
  @Output() public readonly indeterminateChange = new EventEmitter<boolean>();

  @ViewChild('inputEl', { static: true }) private _inputElement!: ElementRef<HTMLInputElement>;
  @ViewChild('labelEl', { static: true }) private _labelElement!: ElementRef<HTMLInputElement>;

  // @ContentChildren(IdsMessageHint, { descendants: true }) private _hintMessages?: QueryList<IdsMessageHint>;
  // @ContentChildren(IdsMessageError, { descendants: true }) private _errorMessages?: QueryList<IdsMessageError>;
  // @ContentChildren(IdsMessageSuccess, { descendants: true }) private _successMessages?: QueryList<IdsMessageSuccess>;

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  public ngOnChanges(changes: SimpleChanges): void {
    const checkedChange = changes['checked'] as SimpleChange | undefined;
    const indeterminateChange = changes['indeterminate'] as SimpleChange | undefined;
    if (indeterminateChange || checkedChange) {
      const currentChecked = checkedChange?.currentValue;
      const currentIndeterminate = indeterminateChange?.currentValue;
      if (currentIndeterminate === true) {
        this.checkboxState.set(CheckboxState.INDETERMINATE);
      } else if (currentChecked === true) {
        this.checkboxState.set(CheckboxState.CHECKED);
      } else {
        this.checkboxState.set(CheckboxState.UNCHECKED);
      }
    }
  }

  public ngAfterViewInit(): void {
    if (this.indeterminate !== undefined) {
      this._syncIndeterminate(this.indeterminate);
    }
  }

  public focus(): void {
    this._inputElement.nativeElement.focus();
  }

  public writeValue(value: boolean): void {
    if (this.isIndeterminate()) {
      this.checkboxState.set(CheckboxState.INDETERMINATE);
    } else {
      this.checkboxState.set(value ? CheckboxState.CHECKED : CheckboxState.UNCHECKED);
    }
  }

  public registerOnChange(fn: () => void): void {
    this._controlValueAccessorChangeFn = fn;
  }

  public registerOnTouched(fn: () => unknown): void {
    this._onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  protected _createChangeEvent(isChecked: boolean, value: string | undefined): CheckBoxChangeEvent {
    const event = new CheckBoxChangeEvent();
    event.source = this;
    event.checked = isChecked;
    event.value = value;
    return event;
  }

  private _emitChangeEvent(): void {
    this._controlValueAccessorChangeFn(this.isChecked());
    this.change.emit(this._createChangeEvent(this.isChecked(), this.value()));

    this._inputElement.nativeElement.checked = this.isChecked();
  }

  public toggle(): void {
    if (this.isIndeterminate()) {
      this.checkboxState.set(CheckboxState.CHECKED);
    } else {
      this.checkboxState.set(this.checkboxState() === CheckboxState.CHECKED ? CheckboxState.UNCHECKED : CheckboxState.CHECKED);
    }
    this._controlValueAccessorChangeFn(this.isChecked());
  }

  private _handleInputClick(): void {
    if (!this.isDisabled()) {
      if (this.isIndeterminate()) {
        this.checkboxState.set(CheckboxState.CHECKED);
        this.indeterminateChange.emit(this.isIndeterminate());
      } else {
        this.checkboxState.set(this.checkboxState() === CheckboxState.CHECKED ? CheckboxState.UNCHECKED : CheckboxState.CHECKED);
      }

      this._emitChangeEvent();
      this._inputElement.nativeElement.indeterminate = this.isIndeterminate();
    }
  }

  public onBlur(): void {
    Promise.resolve().then(() => {
      this._onTouched();
      this._changeDetectorRef.markForCheck();
    });
  }

  private _syncIndeterminate(value: boolean): void {
    const nativeCheckbox = this._inputElement;
    nativeCheckbox.nativeElement.indeterminate = value;
  }

  public onInputClick(): void {
    if (!this.readonly()) {
      this._handleInputClick();
    }
  }

  public onTouchTargetClick(): void {
    if (!this.readonly()) {
      this._handleInputClick();
    }

    if (!this.isDisabled()) {
      this._inputElement.nativeElement.focus();
    }
  }

  public preventBubblingFromLabel(event: MouseEvent): void {
    if (!!event.target && this._labelElement.nativeElement.contains(event.target as HTMLElement)) {
      event.stopPropagation();
    }
  }

  public getDisplayedMessages(): 'error' | 'hint' | undefined {
    // if (this._errorMessages && this._ngControl.errors) {
    //   return 'error';
    // }
    // if (this._hintMessages) {
    //   return 'hint';
    // }
    return undefined;
  }
}
