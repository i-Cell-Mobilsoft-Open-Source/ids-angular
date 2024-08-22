import { IDS_CHECKBOX_DEFAULT_OPTIONS, IDS_CHECKBOX_DEFAULT_OPTIONS_FACTORY } from './ids-checkbox-config';
import { CheckBoxChangeEvent } from './types/ids-checkbox-events';
import { CheckboxState, CheckboxStateType } from './types/ids-checkbox-state';
import { CheckboxVariantType } from './types/ids-checkbox-variant';

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Injector, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild, ViewEncapsulation, computed, contentChildren, inject, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, Validators } from '@angular/forms';
import { SizeType, coerceBooleanAttribute, coerceNumberAttribute, createClassList } from '@i-cell/ids-angular/core';
import { FormElement, IDS_FORM_ELEMENT, IdsErrorMessageComponent, IdsHintMessageComponent, IdsValidators } from '@i-cell/ids-angular/forms';

let nextUniqueId = 0;

const defaultOptions = IDS_CHECKBOX_DEFAULT_OPTIONS_FACTORY();

@Component({
  selector: 'ids-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './ids-checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IdsCheckboxComponent,
      multi: true,
    },
    {
      provide: IDS_FORM_ELEMENT,
      useExisting: IdsCheckboxComponent,
    },
  ],
  encapsulation: ViewEncapsulation.None,
})
export class IdsCheckboxComponent implements FormElement<CheckboxVariantType>, OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
  /** @ignore */
  private readonly _componentClass = 'ids-checkbox';
  /** @ignore */
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  /** @ignore */
  private readonly _injector = inject(Injector);
  /** @ignore */
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...this._injector.get(IDS_CHECKBOX_DEFAULT_OPTIONS, null, { optional: true }),
  };

  /** @ignore */
  private _checkboxState = signal<CheckboxStateType>(CheckboxState.UNCHECKED);

  public id = input<string>(this._uniqueId);
  /** @ignore */
  public inputId = computed(() => this.id() || this._uniqueId);
  public name = input<string | null>();
  public required = input(false, { transform: coerceBooleanAttribute });
  public readonly = input(false, { transform: coerceBooleanAttribute });
  public size = input<SizeType | null>(this._defaultOptions.size);
  public tabIndex = input(0, { transform: coerceNumberAttribute });
  public value = input<string>();
  public variant = input<CheckboxVariantType | null>(this._defaultOptions.variant);

  /** @ignore */
  public isDisabled = signal(false);

  /** @ignore */
  public isChecked = computed(() => this._checkboxState() === CheckboxState.CHECKED);
  /** @ignore */
  public isIndeterminate = computed(() => this._checkboxState() === CheckboxState.INDETERMINATE);
  /** @ignore */
  public isFocusable = computed(() => !this.isDisabled() && !this.readonly());
  /** @ignore */
  private _hostClasses = computed(() => createClassList(this._componentClass, [
    this.size(),
    this.variant(),
    this.isDisabled() ? 'disabled' : null,
  ]),
  );

  /** @ignore */
  private _onChange: (value: unknown) => void = () => { };
  /** @ignore */
  private _onTouched: () => unknown = () => { };

  /** @ignore */
  private _changeDetectorRef = inject(ChangeDetectorRef);
  /** @ignore */
  public controlDir: NgControl | null = null;

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

  /** @ignore */
  @ViewChild('inputEl', { static: true }) private _inputElement!: ElementRef<HTMLInputElement>;

  /** @ignore */
  private _hintMessages = contentChildren(IdsHintMessageComponent, { descendants: true });
  /** @ignore */
  private _errorMessages = contentChildren(IdsErrorMessageComponent, { descendants: true });

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  /** @ignore */
  public ngOnChanges(changes: SimpleChanges): void {
    const checkedChange = changes['checked'] as SimpleChange | undefined;
    const indeterminateChange = changes['indeterminate'] as SimpleChange | undefined;
    if (indeterminateChange || checkedChange) {
      const currentChecked = checkedChange?.currentValue;
      const currentIndeterminate = indeterminateChange?.currentValue;
      if (currentIndeterminate === true) {
        this._checkboxState.set(CheckboxState.INDETERMINATE);
      } else if (currentChecked === true) {
        this._checkboxState.set(CheckboxState.CHECKED);
      } else {
        this._checkboxState.set(CheckboxState.UNCHECKED);
      }
    }
  }

  /** @ignore */
  public ngOnInit(): void {
    this.controlDir = this._injector.get(NgControl, null, { self: true, optional: true });
  }

  /** @ignore */
  public ngAfterViewInit(): void {
    if (this.indeterminate !== undefined) {
      this._syncIndeterminate(this.indeterminate);
    }
  }

  public focus(): void {
    this._inputElement.nativeElement.focus();
  }

  /** @ignore */
  public writeValue(value: boolean): void {
    if (this.isIndeterminate()) {
      this._checkboxState.set(CheckboxState.INDETERMINATE);
    } else {
      this._checkboxState.set(value ? CheckboxState.CHECKED : CheckboxState.UNCHECKED);
    }
  }

  /** @ignore */
  public registerOnChange(fn: () => void): void {
    this._onChange = fn;
  }

  /** @ignore */
  public registerOnTouched(fn: () => unknown): void {
    this._onTouched = fn;
  }

  /** @ignore */
  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  /** @ignore */
  protected _createChangeEvent(isChecked: boolean, value: string | undefined): CheckBoxChangeEvent {
    const event = new CheckBoxChangeEvent();
    event.source = this;
    event.checked = isChecked;
    event.value = value;
    return event;
  }

  /** @ignore */
  private _emitChangeEvent(): void {
    this._onChange(this.isChecked());
    this.change.emit(this._createChangeEvent(this.isChecked(), this.value()));
    this._syncChecked(this.isChecked());
  }

  public toggle(): void {
    if (this.isIndeterminate()) {
      this._checkboxState.set(CheckboxState.CHECKED);
    } else {
      this._checkboxState.set(this._checkboxState() === CheckboxState.CHECKED ? CheckboxState.UNCHECKED : CheckboxState.CHECKED);
    }
    this._onChange(this.isChecked());
  }

  /** @ignore */
  private _handleInputClick(): void {
    if (!this.isDisabled()) {
      if (this.isIndeterminate()) {
        this._checkboxState.set(CheckboxState.CHECKED);
        this.indeterminateChange.emit(this.isIndeterminate());
      } else {
        this._checkboxState.set(this._checkboxState() === CheckboxState.CHECKED ? CheckboxState.UNCHECKED : CheckboxState.CHECKED);
      }

      this._emitChangeEvent();
      this._syncIndeterminate(this.isIndeterminate());
    }
  }

  /** @ignore */
  public onBlur(): void {
    Promise.resolve().then(() => {
      this._onTouched();
      this._changeDetectorRef.markForCheck();
    });
  }

  /** @ignore */
  private _syncChecked(value: boolean): void {
    const nativeCheckbox = this._inputElement;
    nativeCheckbox.nativeElement.checked = value;
  }

  /** @ignore */
  private _syncIndeterminate(value: boolean): void {
    const nativeCheckbox = this._inputElement;
    nativeCheckbox.nativeElement.indeterminate = value;
  }

  /** @ignore */
  public onInputClick(): void {
    if (!this.readonly()) {
      this._handleInputClick();
    }
  }

  /** @ignore */
  public onTouchTargetClick(): void {
    if (!this.readonly()) {
      this._handleInputClick();
    }

    if (!this.isDisabled()) {
      this._inputElement.nativeElement.focus();
    }
  }

  /** @ignore */
  public get displayedMessages(): 'error' | 'hint' | undefined {
    if (this._errorMessages().length > 0 && this.controlDir?.errors) {
      return 'error';
    }
    if (this._hintMessages().length > 0) {
      return 'hint';
    }
    return undefined;
  }

  /** @ignore */
  public get hasRequiredValidator(): boolean {
    const control = this.controlDir?.control;
    if (!control) {
      return this.required();
    }
    return control.hasValidator(Validators.required)
      || control.hasValidator(Validators.requiredTrue)
      || control.hasValidator(IdsValidators.required)
      || control.hasValidator(IdsValidators.requiredTrue)
      || control.hasValidator(IdsValidators.requiredFalse);
  }
}
