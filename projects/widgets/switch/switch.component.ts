import { switchAnimation } from './switch-animations';
import { IDS_SWITCH_DEFAULT_CONFIG, IDS_SWITCH_DEFAULT_CONFIG_FACTORY, IdsSwitchDefaultConfig } from './switch-defaults';
import { IdsSwitchGroupComponent } from './switch-group.component';
import { IdsSwitchIconPosition } from './types/switch-positions.type';
import { IdsSwitchVariantType } from './types/switch-variant.type';

import { ChangeDetectionStrategy, Component, computed, ElementRef, inject, Input, input, signal, viewChild, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { coerceBooleanAttribute, IdsSizeType, fallbackValue, coerceNumberAttribute, ComponentBaseWithDefaults } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

const defaultConfig = IDS_SWITCH_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: `ids-switch[ngModel]:not([formControl]):not([formControlName]),
             ids-switch[formControl]:not([ngModel]):not([formControlName]),
             ids-switch[formControlName]:not([ngModel]):not([formControl])`,
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
    '[aria-label]': 'ariaLabel()',
    '[aria-labelledby]': 'ariaLabelledBy()',
    '[aria-describedby]': 'ariaDescribedBy()',
  },
})
export class IdsSwitchComponent extends ComponentBaseWithDefaults<IdsSwitchDefaultConfig> {
  protected override get _hostName(): string {
    return 'switch';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_SWITCH_DEFAULT_CONFIG);

  private _switchGroup = inject(IdsSwitchGroupComponent, { optional: true });

  private _switchElement = viewChild<ElementRef<HTMLInputElement>>('switch');

  protected _isChecked = signal(false);

  public label = input<string>();
  public name = input<string | null>();
  public readonly = input(false, { transform: coerceBooleanAttribute });
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public tabIndex = input(0, { transform: coerceNumberAttribute });
  public variant = input<IdsSwitchVariantType>(this._defaultConfig.variant);
  public hasIcon = input(this._defaultConfig.hasIcon);
  public iconPosition = input(this._defaultConfig.iconPosition);
  public labelPosition = input(this._defaultConfig.labelPosition);
  protected _isDisabled = signal(false);
  public ariaLabel = input<string| null>(null, { alias: 'aria-label' });
  public ariaLabelledBy = input<string | null, string>(null,
    { alias: 'aria-labelledby', transform: (val) => fallbackValue(val, this.id()) },
  );

  public ariaDescribedBy = input<string | null>(null, { alias: 'aria-describedby' });

  protected _parentOrSelfSize = computed(() => this._switchGroup?.size() ?? this.size());
  protected _parentOrSelfHasIcon = computed(() => this._switchGroup?.hasIcon() ?? this.hasIcon());
  protected _parentOrSelfIconPosition = computed(() => this._switchGroup?.iconPosition() ?? this.iconPosition());
  protected _parentOrSelfLabelPosition = computed(() => this._switchGroup?.labelPosition() ?? this.labelPosition());
  protected _hasHandleIcon = computed(() =>
    this._parentOrSelfHasIcon() && this._parentOrSelfIconPosition() === IdsSwitchIconPosition.ONHANDLE,
  );

  protected _hasTrackIcon = computed(() =>
    this._parentOrSelfHasIcon() && this._parentOrSelfIconPosition() === IdsSwitchIconPosition.ONTRACK,
  );

  private _isFocusable = computed(() => !this._isDisabled() && !this.readonly());
  protected _hostClasses = computed(() => this._getHostClasses([
    this._parentOrSelfSize(),
    this.variant(),
    this._isDisabled() ? 'disabled' : null,
    this._isChecked() ? 'on' : null,
    [
      'label',
      this._parentOrSelfLabelPosition(),
    ],
  ]),
  );

  private _onChange: (value: unknown) => void = () => { };
  private _onTouched: () => unknown = () => { };

  @Input({ transform: coerceBooleanAttribute })
  set disabled(value: boolean) {
    if (value !== this.disabled) {
      this._isDisabled.set(value);
    }
  }

  public focus(): void {
    if (this._isFocusable()) {
      this._switchElement()?.nativeElement.focus();
    }
  }

  public writeValue(value: boolean | undefined): void {
    this._isChecked.set(Boolean(value));
  }

  public registerOnChange(fn: () => void): void {
    this._onChange = fn;
  }

  public registerOnTouched(fn: () => unknown): void {
    this._onTouched = fn;
  }

  public setDisabledState?(isDisabled: boolean): void {
    this._isDisabled.set(isDisabled);
  }

  private _toggle(): void {
    if (!this._isDisabled() && !this.readonly()) {
      this._isChecked.update((checked) => !checked);
      this._onChange(this._isChecked());
      this._onTouched();
    }
  }

  protected _handleClick(): void {
    if (!this._isDisabled()) {
      this._toggle();
    }
  }
}
