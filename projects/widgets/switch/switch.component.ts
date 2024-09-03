import { switchIconAnimation } from './animations';
import { IDS_SWITCH_DEFAULT_CONFIG, IDS_SWITCH_DEFAULT_CONFIG_FACTORY } from './switch-defaults';
import { SwitchIconPosition } from './types/switch-positions';
import { SwitchVariantType } from './types/switch-variant';

import { coerceNumberAttribute } from '../core';
import { safeValue } from '../core/utils/safe-value';

import { ChangeDetectionStrategy, Component, computed, ElementRef, HostBinding, inject, Input, input, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanAttribute, createClassList, SizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { mdiCheck, mdiClose } from '@mdi/js';

let nextUniqueId = 0;

const defaultConfig = IDS_SWITCH_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-switch[ngModel], ids-switch[formControl], ids-switch[formControlName]',
  standalone: true,
  imports: [IdsIconComponent],
  templateUrl: './switch.component.html',
  styleUrl: './switch.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: IdsSwitchComponent,
      multi: true,
    },
  ],
  animations: [switchIconAnimation],
})
export class IdsSwitchComponent {
  private readonly _componentClass = 'ids-switch';
  private readonly _uniqueId = `${this._componentClass}-${++nextUniqueId}`;
  private readonly _defaultConfig = {
    ...defaultConfig,
    ...inject(IDS_SWITCH_DEFAULT_CONFIG, { optional: true }),
  };

  protected readonly _onIcon = mdiCheck;
  protected readonly _offIcon = mdiClose;

  private _switchElement = viewChild<ElementRef<HTMLInputElement>>('switch');

  public isChecked = signal(false);

  public id = input<string, string | undefined>(this._uniqueId, { transform: (val) => safeValue(val, this._uniqueId) });
  public label = input<string>();
  public ariaLabel = input<string>();
  public ariaLabelledBy = input<string | undefined, string>(undefined, { transform: (val) => safeValue(val, this.id()) });
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

  protected _hasHandleIcon = computed(() => this.hasIcon() && this.iconPosition() === SwitchIconPosition.ONHANDLE);
  protected _hasTrackIcon = computed(() => this.hasIcon() && this.iconPosition() === SwitchIconPosition.ONTRACK);
  private _isFocusable = computed(() => !this.isDisabled() && !this.readonly());
  private _hostClasses = computed(() => createClassList(this._componentClass, [
    this.size(),
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
    if (!this.isDisabled()) {
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
