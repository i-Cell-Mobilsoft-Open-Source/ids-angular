import { IDS_CHECKBOX_DEFAULT_OPTIONS, IDS_CHECKBOX_DEFAULT_OPTIONS_FACTORY } from './ids-checkbox-config';
import { CheckBoxChangeEvent } from './types/checkbox-events';
import { CheckboxState, CheckboxStateType } from './types/checkbox-state';
import { CheckboxVariantType } from './types/checkbox-variant';

import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Injector, Input, OnChanges, OnInit, Output, SimpleChange, SimpleChanges, ViewChild, ViewEncapsulation, computed, contentChildren, inject, input, signal } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, Validators } from '@angular/forms';
import { SizeType, coerceBooleanAttribute, coerceNumberAttribute, createHostClassList } from '@i-cell/widgets/core';
import { FormElement, IDS_FORM_ELEMENT, IdsErrorMessageComponent, IdsHintMessageComponent, IdsValidators } from '@i-cell/widgets/forms';

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
  private readonly _componentClass = 'ids-checkbox';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _injector = inject(Injector);
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...this._injector.get(IDS_CHECKBOX_DEFAULT_OPTIONS, null, { optional: true }),
  };

  private _checkboxState = signal<CheckboxStateType>(CheckboxState.UNCHECKED);

  public id = input<string>(this._uniqueId);
  public inputId = computed(() => this.id() || this._uniqueId);
  public name = input<string | null>();
  public required = input(false, { transform: coerceBooleanAttribute });
  public readonly = input(false, { transform: coerceBooleanAttribute });
  public size = input<SizeType | null>(this._defaultOptions.size);
  public tabIndex = input(0, { transform: coerceNumberAttribute });
  public value = input<string>();
  public variant = input<CheckboxVariantType | null>(this._defaultOptions.variant);

  public isDisabled = signal(false);

  public isChecked = computed(() => this._checkboxState() === CheckboxState.CHECKED);
  public isIndeterminate = computed(() => this._checkboxState() === CheckboxState.INDETERMINATE);
  public isFocusable = computed(() => !this.isDisabled() && !this.readonly());
  private _hostClasses = computed(() => createHostClassList(this._componentClass, [
    this.size(),
    this.variant(),
    this.isDisabled() ? 'disabled' : null,
  ]),
  );

  private _onChange: (value: unknown) => void = () => {};
  private _onTouched: () => unknown = () => {};

  private _changeDetectorRef = inject(ChangeDetectorRef);
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

  @ViewChild('inputEl', { static: true }) private _inputElement!: ElementRef<HTMLInputElement>;

  private _hintMessages = contentChildren(IdsHintMessageComponent, { descendants: true });
  private _errorMessages = contentChildren(IdsErrorMessageComponent, { descendants: true });

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
        this._checkboxState.set(CheckboxState.INDETERMINATE);
      } else if (currentChecked === true) {
        this._checkboxState.set(CheckboxState.CHECKED);
      } else {
        this._checkboxState.set(CheckboxState.UNCHECKED);
      }
    }
  }

  public ngOnInit(): void {
    this.controlDir = this._injector.get(NgControl, null, { self: true, optional: true });
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
      this._checkboxState.set(CheckboxState.INDETERMINATE);
    } else {
      this._checkboxState.set(value ? CheckboxState.CHECKED : CheckboxState.UNCHECKED);
    }
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

  protected _createChangeEvent(isChecked: boolean, value: string | undefined): CheckBoxChangeEvent {
    const event = new CheckBoxChangeEvent();
    event.source = this;
    event.checked = isChecked;
    event.value = value;
    return event;
  }

  private _emitChangeEvent(): void {
    this._onChange(this.isChecked());
    this.change.emit(this._createChangeEvent(this.isChecked(), this.value()));

    this._inputElement.nativeElement.checked = this.isChecked();
  }

  public toggle(): void {
    if (this.isIndeterminate()) {
      this._checkboxState.set(CheckboxState.CHECKED);
    } else {
      this._checkboxState.set(this._checkboxState() === CheckboxState.CHECKED ? CheckboxState.UNCHECKED : CheckboxState.CHECKED);
    }
    this._onChange(this.isChecked());
  }

  private _handleInputClick(): void {
    if (!this.isDisabled()) {
      if (this.isIndeterminate()) {
        this._checkboxState.set(CheckboxState.CHECKED);
        this.indeterminateChange.emit(this.isIndeterminate());
      } else {
        this._checkboxState.set(this._checkboxState() === CheckboxState.CHECKED ? CheckboxState.UNCHECKED : CheckboxState.CHECKED);
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

  public get displayedMessages(): 'error' | 'hint' | undefined {
    if (this._errorMessages().length > 0 && this.controlDir?.errors) {
      return 'error';
    }
    if (this._hintMessages().length > 0) {
      return 'hint';
    }
    return undefined;
  }

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
