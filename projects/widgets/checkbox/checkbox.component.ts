import { IDS_CHECKBOX_DEFAULT_CONFIG, IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY, IdsCheckboxDefaultConfig } from './checkbox-defaults';
import { IdsCheckBoxChangeEvent } from './types/checkbox-events.class';
import { IDS_CHECKBOX_GROUP_CHILD, IdsCheckboxGroupChild } from './types/checkbox-group-child';
import { IDS_CHECKBOX_PARENT } from './types/checkbox-parent';
import { IdsCheckboxState, IdsCheckboxStateType } from './types/checkbox-state.type';
import { IdsCheckboxVariantType } from './types/checkbox-variant.type';

import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, Injector, OnChanges, OnInit, SimpleChange, SimpleChanges, ViewEncapsulation, computed, contentChildren, inject, input, model, output, signal, viewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NgControl, Validators } from '@angular/forms';
import { ComponentBaseWithDefaults, IdsSizeType, coerceBooleanAttribute, coerceNumberAttribute, isString } from '@i-cell/ids-angular/core';
import { IDS_FORM_FIELD_CONTROL, IdsErrorMessageComponent, IdsHintMessageComponent, IdsValidators } from '@i-cell/ids-angular/forms';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

const defaultConfig = IDS_CHECKBOX_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-checkbox',
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
    {
      provide: IDS_CHECKBOX_GROUP_CHILD,
      useExisting: IdsCheckboxComponent,
    },
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-label]': 'null',
    '[attr.aria-labelledby]': 'null',
  },
})
export class IdsCheckboxComponent
  extends ComponentBaseWithDefaults<IdsCheckboxDefaultConfig>
  implements OnInit, OnChanges, AfterViewInit, ControlValueAccessor, IdsCheckboxGroupChild {
  protected override get _hostName(): string {
    return 'checkbox';
  }

  private readonly _injector = inject(Injector);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);
  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_CHECKBOX_DEFAULT_CONFIG);

  private _checkboxGroup = inject(IDS_CHECKBOX_PARENT, { optional: true });

  private _checkboxState = signal<IdsCheckboxStateType>(IdsCheckboxState.UNCHECKED);
  public checkboxState = this._checkboxState.asReadonly();

  protected _inputId = computed(() => `${this.id()}-input`);
  public name = input<string | null>();
  public required = input(false, { transform: coerceBooleanAttribute });
  public readonly = input(false, { transform: coerceBooleanAttribute });
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public tabIndex = input(0, { transform: coerceNumberAttribute });
  public value = input<unknown>();
  public variant = input<IdsCheckboxVariantType>(this._defaultConfig.variant);
  public checked = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  public indeterminate = input<boolean, unknown>(false, { transform: coerceBooleanAttribute });
  public ariaLabel = input<string>('', { alias: 'aria-label' });
  public ariaLabelledby = input<string | null>(null, { alias: 'aria-labelledby' });
  public ariaDescribedby = input<string>('', { alias: 'aria-describedby' });

  public disabled = model(false);

  protected _isChecked = computed(() => this._checkboxState() === IdsCheckboxState.CHECKED);
  protected _isIndeterminate = computed(() => this._checkboxState() === IdsCheckboxState.INDETERMINATE);
  protected _isFocusable = computed(() => !this.disabled() && !this.readonly());
  protected _hostClasses = computed(() => this._getHostClasses([
    this._parentOrSelfSize(),
    this._parentOrSelfVariant(),
    this.disabled() ? 'disabled' : null,
  ]),
  );

  protected _nativeValue = computed(() => {
    const value = this.value();
    return isString(value) ? value : undefined;
  });

  private _parentOrSelfSize = computed(() => this._checkboxGroup?.size() ?? this.size());
  private _parentOrSelfVariant = computed(() => this._checkboxGroup?.variant() ?? this.variant());

  private _onChange: (value: unknown) => void = () => { };
  private _onTouched: () => unknown = () => { };

  public controlDir: NgControl | null = null;

  // eslint-disable-next-line @angular-eslint/no-output-native
  public readonly change = output<IdsCheckBoxChangeEvent>();
  public readonly indeterminateChange = output<boolean>();

  private _inputElement = viewChild.required<ElementRef<HTMLInputElement>>('inputEl');

  private _hintMessages = contentChildren(IdsHintMessageComponent, { descendants: true });
  private _errorMessages = contentChildren(IdsErrorMessageComponent, { descendants: true });

  public ngOnChanges(changes: SimpleChanges): void {
    const checkedChange = changes['checked'] as SimpleChange | undefined;
    const indeterminateChange = changes['indeterminate'] as SimpleChange | undefined;
    if (indeterminateChange || checkedChange) {
      const currentChecked = checkedChange?.currentValue;
      const currentIndeterminate = indeterminateChange?.currentValue;
      if (currentIndeterminate === true) {
        this._checkboxState.set(IdsCheckboxState.INDETERMINATE);
      } else if (currentChecked === true) {
        this._checkboxState.set(IdsCheckboxState.CHECKED);
      } else {
        this._checkboxState.set(IdsCheckboxState.UNCHECKED);
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
    if (this._isIndeterminate()) {
      this._checkboxState.set(IdsCheckboxState.INDETERMINATE);
    } else {
      this._checkboxState.set(value ? IdsCheckboxState.CHECKED : IdsCheckboxState.UNCHECKED);
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

  protected _createChangeEvent(isChecked: boolean, value: unknown): IdsCheckBoxChangeEvent {
    const event = new IdsCheckBoxChangeEvent();
    event.source = this;
    event.checked = isChecked;
    event.value = value;
    return event;
  }

  private _emitChangeEvent(): void {
    this._onChange(this._isChecked());
    this.change.emit(this._createChangeEvent(this._isChecked(), this.value()));
    this._syncChecked(this._isChecked());
  }

  public toggle(): void {
    if (this._isIndeterminate()) {
      this._checkboxState.set(IdsCheckboxState.CHECKED);
    } else {
      this._checkboxState.set(this._checkboxState() === IdsCheckboxState.CHECKED ? IdsCheckboxState.UNCHECKED : IdsCheckboxState.CHECKED);
    }
    this._onChange(this._isChecked());
  }

  public select(): void {
    this._checkboxState.set(IdsCheckboxState.CHECKED);
    this._onChange(this._isChecked());
  }

  public deselect(): void {
    this._checkboxState.set(IdsCheckboxState.UNCHECKED);
    this._onChange(this._isChecked());
  }

  private _handleInputClick(): void {
    if (this._isIndeterminate()) {
      this._checkboxState.set(IdsCheckboxState.CHECKED);
      this.indeterminateChange.emit(this._isIndeterminate());
    } else {
      this._checkboxState.set(this._checkboxState() === IdsCheckboxState.CHECKED ? IdsCheckboxState.UNCHECKED : IdsCheckboxState.CHECKED);
    }

    this._emitChangeEvent();
    this._syncIndeterminate(this._isIndeterminate());
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

  protected get _hasRequiredValidator(): boolean {
    const control = this.controlDir?.control;
    const attrRequired = this.required();

    if (!control) {
      return attrRequired;
    }

    return attrRequired
      || control.hasValidator(Validators.required)
      || control.hasValidator(Validators.requiredTrue)
      || control.hasValidator(IdsValidators.required)
      || control.hasValidator(IdsValidators.requiredTrue)
      || control.hasValidator(IdsValidators.requiredFalse);
  }
}
