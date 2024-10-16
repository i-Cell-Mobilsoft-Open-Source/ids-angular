import { IdsFormFieldComponent } from '../components/form-field/form-field.component';
import { IDS_FORM_FIELD } from '../components/form-field/tokens/form-field-tokens';
import { IdsFormFieldVariantType } from '../components/form-field/types/form-field-variant.type';
import { IDS_MESSAGE_DEFAULT_CONFIG, IDS_MESSAGE_DEFAULT_CONFIG_FACTORY, IdsMessageDefaultConfig } from '../components/message/message-defaults';
import { IdsMessageVariantType } from '../components/message/types/message-variant.type';

import { Directive, HostBinding, InjectionToken, OnInit, computed, inject, input, signal } from '@angular/core';
import { createClassList, IdsSizeType } from '@i-cell/ids-angular/core';

let nextUniqueId = 0;

const defaultConfig = IDS_MESSAGE_DEFAULT_CONFIG_FACTORY();

@Directive({
  selector: '[idsMessage]',
  standalone: true,
  host: {
    '[id]': 'id()',
  },
})
export class IdsMessageDirective implements OnInit {
  private readonly _componentClass = 'ids-message';
  private readonly _parent = inject<IdsFormFieldComponent>(IDS_FORM_FIELD, { skipSelf: true, optional: true });
  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_MESSAGE_DEFAULT_CONFIG);

  public id = input<string, number>(
    `${this._componentClass}-${nextUniqueId++}`,
    { transform: (value: number) => `${this._componentClass}-${value}` },
  );

  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsMessageVariantType>(this._defaultConfig.variant);
  private _parentSize = signal<IdsSizeType | null | undefined>(this._parent?.size());
  private _parentVariant = signal<IdsFormFieldVariantType | null | undefined>(this._parent?.variant());
  private _safeSize = computed(() => this._parentSize() ?? this.size());
  private _safeVariant = computed(() => this._parentVariant() ?? this.variant());
  private _disabled = signal<boolean>(false);
  
  private _hostClasses = computed(() => createClassList(this._componentClass, [
    this._safeSize(),
    this._safeVariant(),
    this._disabled() ? 'disabled' : null,
  ]));

  public ngOnInit(): void {
    if (this._parent) {
      this._parentSize.set(this._parent.safeSize());
      this._parentVariant.set(this._parent.safeVariant());
      this._disabled.set(this._parent.disabled());
    }
  }

  @HostBinding('class') get classes(): string {
    return this._hostClasses();
  }

  // eslint-disable-next-line @stylistic/js/max-len
  protected _getDefaultConfig(defaultConfig: Required<IdsMessageDefaultConfig>, injectionToken: InjectionToken<IdsMessageDefaultConfig>): Required<IdsMessageDefaultConfig> {
    return {
      ...defaultConfig,
      ...inject(injectionToken, { optional: true }),
    };
  }
}
