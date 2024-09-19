import { switchAnimation } from './switch-animations';
import { IDS_SWITCH_DEFAULT_CONFIG, IDS_SWITCH_DEFAULT_CONFIG_FACTORY } from './switch-defaults';
import { IdsSwitchGroupComponent } from './switch-group.component';
import { SwitchIconPosition } from './types/switch-positions';
import { SwitchVariantType } from './types/switch-variant';

import { ChangeDetectionStrategy, Component, computed, ElementRef, HostBinding, inject, Input, input, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanAttribute, createClassList, SizeType, fallbackValue, coerceNumberAttribute } from '@i-cell/ids-angular/core';
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
  host: {
    '[id]': 'id()',
  },
})
export class IdsSwitchComponent {
  /** @ignore **/
  private readonly _componentClass = 'ids-switch';
  /** @ignore **/
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  /** @ignore **/
  private readonly _defaultConfig = {
    ...defaultConfig,
    ...inject(IDS_SWITCH_DEFAULT_CONFIG, { optional: true }),
  };

  /** @ignore **/
  private _switchGroup = inject(IdsSwitchGroupComponent, { optional: true });

  /** @ignore **/
  protected readonly _onIcon = mdiCheck;
  /** @ignore **/
  protected readonly _offIcon = mdiClose;

  /** @ignore **/
  private _switchElement = viewChild<ElementRef<HTMLInputElement>>('switch');

  /** @ignore **/
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
  /** @ignore **/
  public isDisabled = signal(false);

  /** @ignore **/
  protected _safeSize = computed(() => this._switchGroup?.size() ?? this.size());
  /** @ignore **/
  protected _safeHasIcon = computed(() => this._switchGroup?.hasIcon() ?? this.hasIcon());
  /** @ignore **/
  protected _safeIconPosition = computed(() => this._switchGroup?.iconPosition() ?? this.iconPosition());
  /** @ignore **/
  protected _safeLabelPosition = computed(() => this._switchGroup?.labelPosition() ?? this.labelPosition());
  /** @ignore **/
  protected _hasHandleIcon = computed(() => this._safeHasIcon() && this._safeIconPosition() === SwitchIconPosition.ONHANDLE);
  /** @ignore **/
  protected _hasTrackIcon = computed(() => this._safeHasIcon() && this._safeIconPosition() === SwitchIconPosition.ONTRACK);
  /** @ignore **/
  private _isFocusable = computed(() => !this.isDisabled() && !this.readonly());
  /** @ignore **/
  private _hostClasses = computed(() => createClassList(this._componentClass, [
    this._safeSize(),
    this.variant(),
    this.isDisabled() ? 'disabled' : null,
    this.isChecked() ? 'on' : null,
  ]),
  );

  /** @ignore **/
  private _onChange: (value: unknown) => void = () => { };
  /** @ignore **/
  private _onTouched: () => unknown = () => { };

  @Input({ transform: coerceBooleanAttribute })
  set disabled(value: boolean) {
    if (value !== this.disabled) {
      this.isDisabled.set(value);
    }
  }

  /** @ignore **/
  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  /** @ignore **/
  public focus(): void {
    if (this._isFocusable()) {
      this._switchElement()?.nativeElement.focus();
    }
  }

  /** @ignore **/
  public writeValue(value: boolean | undefined): void {
    this.isChecked.set(Boolean(value));
  }

  /** @ignore **/
  public registerOnChange(fn: () => void): void {
    this._onChange = fn;
  }

  /** @ignore **/
  public registerOnTouched(fn: () => unknown): void {
    this._onTouched = fn;
  }

  /** @ignore **/
  public setDisabledState?(isDisabled: boolean): void {
    this.isDisabled.set(isDisabled);
  }

  /** @ignore **/
  public toggle(): void {
    if (!this.isDisabled() && !this.readonly()) {
      this.isChecked.update((checked) => !checked);
      this._onChange(this.isChecked());
      this._onTouched();
    }
  }

  /** @ignore **/
  public handleClick(): void {
    if (!this.isDisabled()) {
      this.toggle();
    }
  }
}
