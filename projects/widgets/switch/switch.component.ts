import { switchAnimation } from './switch-animations';
import { IDS_SWITCH_DEFAULT_CONFIG, IDS_SWITCH_DEFAULT_CONFIG_FACTORY } from './switch-defaults';
import { IdsSwitchGroupComponent } from './switch-group.component';
import { SwitchIconPosition } from './types/switch-positions';
import { SwitchVariantType } from './types/switch-variant';

import { coerceNumberAttribute } from '../core';

import { ChangeDetectionStrategy, Component, computed, ElementRef, HostBinding, inject, Input, input, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanAttribute, createClassList, SizeType, fallbackValue } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { mdiCheck, mdiClose } from '@mdi/js';

let nextUniqueId = 0;

const defaultConfig = IDS_SWITCH_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-switch[ngModel], ids-switch[formControl], ids-switch[formControlName]',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './switch.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IdsSwitchComponent,
      multi: true,
    },
  ],
  animations: [switchAnimation],
})
export class IdsSwitchComponent {
  private readonly _componentClass = 'ids-switch';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _defaultConfig = {
    ...defaultConfig,
    ...inject(IDS_SWITCH_DEFAULT_CONFIG, { optional: true }),
  };

  private _switchGroup = inject(IdsSwitchGroupComponent, { optional: true });

  protected readonly _onIcon = mdiCheck;
  protected readonly _offIcon = mdiClose;

  private _switchElement = viewChild<ElementRef<HTMLInputElement>>('switch');

  public isChecked = signal(false);

  public id = input<string, string | undefined>(this._uniqueId, { transform: (val) => fallbackValue(val, this._uniqueId) });
  public label = input<string>();
  public ariaLabel = input<string>();
  public ariaLabelledBy = input<string | undefined, string>(undefined, { transform: (val) => fallbackValue(val, this.id()) });
  public ariaDescribedBy = input<string>();
  public name = input<string | null>();
  public required = input(false, { transform: coerceBooleanAttribute });
  public readonly = input(false, { transform: coerceBooleanAttribute });
  public size = input<SizeType | null>(this._defaultConfig.size);
  public tabIndex = input(0, { transform: coerceNumberAttribute });
  public value = input<boolean>();
  public variant = input<SwitchVariantType | null>(this._defaultConfig.variant);
  public hasIcon = input(this._defaultConfig.hasIcon);
  public iconPosition = input(this._defaultConfig.iconPosition);
  public labelPosition = input(this._defaultConfig.labelPosition);
  public isDisabled = signal(false);

  protected _safeSize = computed(() => this._switchGroup?.size() ?? this.size());
  protected _safeHasIcon = computed(() => this._switchGroup?.hasIcon() ?? this.hasIcon());
  protected _safeIconPosition = computed(() => this._switchGroup?.iconPosition() ?? this.iconPosition());
  protected _safeLabelPosition = computed(() => this._switchGroup?.labelPosition() ?? this.labelPosition());
  protected _hasHandleIcon = computed(() => this._safeHasIcon() && this._safeIconPosition() === SwitchIconPosition.ONHANDLE);
  protected _hasTrackIcon = computed(() => this._safeHasIcon() && this._safeIconPosition() === SwitchIconPosition.ONTRACK);
  private _isFocusable = computed(() => !this.isDisabled() && !this.readonly());
  private _hostClasses = computed(() => createClassList(this._componentClass, [
    this._safeSize(),
    this.variant(),
    this.isDisabled() ? 'disabled' : null,
    this.isChecked() ? 'on' : null,
  ]),
  );

  private _onChange: (value: unknown) => void = () => { };
  private _onTouched: () => unknown = () => { };

  @Input({ transform: coerceBooleanAttribute })
  set disabled(value: boolean) {
    if (value !== this.disabled) {
      this.isDisabled.set(value);
    }
  }

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  public focus(): void {
    if (this._isFocusable()) {
      this._switchElement()?.nativeElement.focus();
    }
  }

  public writeValue(value: boolean | undefined): void {
    this.isChecked.set(Boolean(value));
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

  public toggle(): void {
    if (!this.isDisabled() && !this.readonly()) {
      this.isChecked.update((checked) => !checked);
      this._onChange(this.isChecked());
      this._onTouched();
    }
  }

  public handleClick(): void {
    if (!this.isDisabled()) {
      this.toggle();
    }
  }
}
