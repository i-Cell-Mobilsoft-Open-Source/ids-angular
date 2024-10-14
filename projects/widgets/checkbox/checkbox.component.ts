import { IDS_CHECKBOX_DEFAULT_CONFIG, IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY } from './checkbox-defaults';
import { IdsCheckboxGroupComponent } from './checkbox-group.component';
import { CheckBoxChangeEvent } from './types/checkbox-events';
import { CheckboxState, CheckboxStateType } from './types/checkbox-state';
import { CheckboxVariantType } from './types/checkbox-variant';

import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostBinding, Injector, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewEncapsulation, computed, contentChildren, inject, input, output, signal, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, Validators } from '@angular/forms';
import { SizeType, coerceBooleanAttribute, coerceNumberAttribute, createClassList } from '@i-cell/ids-angular/core';
import { IDS_FORM_FIELD_CONTROL, IdsErrorMessageComponent, IdsHintMessageComponent, IdsValidators } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

let nextUniqueId = 0;

const defaultConfig = IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-checkbox',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './checkbox.component.html',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IdsCheckboxComponent,
      multi: true,
    },
    {
      provide: IDS_FORM_FIELD_CONTROL,
      useExisting: IdsCheckboxComponent,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsCheckboxComponent implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor {
  private readonly _componentClass = 'ids-checkbox';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _injector = inject(Injector);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  private readonly _defaultConfig = {
    ...defaultConfig,
    ...this._injector.get(IDS_CHECKBOX_DEFAULT_CONFIG, null, { optional: true }),
  };

  private _checkboxGroup = inject(IdsCheckboxGroupComponent, { optional: true });

  private _checkboxState = signal<CheckboxStateType>(CheckboxState.UNCHECKED);

  public id = input<string>(this._uniqueId);
  public inputId = computed(() => this.id() || this._uniqueId);
  public name = input<string | null>();
  public required = input(false, { transform: coerceBooleanAttribute });
  public readonly = input(false, { transform: coerceBooleanAttribute });
  public size = input<SizeType>(this._defaultConfig.size);
  public tabIndex = input(0, { transform: coerceNumberAttribute });
  public value = input<string>();
  public variant = input<CheckboxVariantType>(this._defaultConfig.variant);
  public checked = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  public indeterminate = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });

  public disabled = signal(false);

  public isChecked = computed(() => this._checkboxState() === CheckboxState.CHECKED);
  public isIndeterminate = computed(() => this._checkboxState() === CheckboxState.INDETERMINATE);
  public isFocusable = computed(() => !this.disabled() && !this.readonly());
  private _hostClasses = computed(() => createClassList(this._componentClass, [
    this._safeSize(),
    this._safeVariant(),
    this.disabled() ? 'disabled' : null,
  ]),
  );

  private _safeSize = computed(() => this._checkboxGroup?.size() ?? this.size());
  private _safeVariant = computed(() => this._checkboxGroup?.variant() ?? this.variant());

  private _onChange: (value: unknown) => void = () => { };
  private _onTouched: () => unknown = () => { };

  public controlDir: NgControl | null = null;

  public readonly change = output<CheckBoxChangeEvent>();
  public readonly indeterminateChange = output<boolean>();

  private _inputElement = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');

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
      this._syncIndeterminate(this.indeterminate());
    }
  }

  public focus(): void {
    this._inputElement().nativeElement.focus();
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
    this.disabled.set(isDisabled);
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

  public select(): void {
    this._checkboxState.set(CheckboxState.CHECKED);
    this._onChange(this.isChecked());
  }
  
  public deselect(): void {
    this._checkboxState.set(CheckboxState.UNCHECKED);
    this._onChange(this.isChecked());
  }

  private _handleInputClick(): void {
    if (this.isIndeterminate()) {
      this._checkboxState.set(CheckboxState.CHECKED);
      this.indeterminateChange.emit(this.isIndeterminate());
    } else {
      this._checkboxState.set(this._checkboxState() === CheckboxState.CHECKED ? CheckboxState.UNCHECKED : CheckboxState.CHECKED);
    }

    this._emitChangeEvent();
    this._syncIndeterminate(this.isIndeterminate());
  }

  public onBlur(): void {
    Promise.resolve().then(() => {
      this._onTouched();
      this._changeDetectorRef.markForCheck();
    });
  }

  private _syncChecked(value: boolean): void {
    const nativeCheckbox = this._inputElement();
    nativeCheckbox.nativeElement.checked = value;
  }

  private _syncIndeterminate(value: boolean): void {
    const nativeCheckbox = this._inputElement();
    nativeCheckbox.nativeElement.indeterminate = value;
  }

  public onInputClick(): void {
    if (!this.readonly() && !this.disabled()) {
      this._handleInputClick();
    }
  }

  public onTouchTargetClick(): void {
    if (!this.readonly() && !this.disabled()) {
      this._handleInputClick();
    }

    if (!this.disabled()) {
      this._inputElement().nativeElement.focus();
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
