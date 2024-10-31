import { IdsFormFieldComponent } from '../components/form-field/form-field.component';
import { IDS_FORM_FIELD } from '../components/form-field/tokens/form-field-tokens';
import { IDS_MESSAGE_DEFAULT_CONFIG, IDS_MESSAGE_DEFAULT_CONFIG_FACTORY, IdsMessageDefaultConfig } from '../components/message/message-defaults';
import { IdsMessageVariantType } from '../components/message/types/message-variant.type';

import { Directive, InjectionToken, computed, inject, input } from '@angular/core';
import { createClassList, IdsSizeType } from '@i-cell/ids-angular/core';

let nextUniqueId = 0;

const defaultConfig = IDS_MESSAGE_DEFAULT_CONFIG_FACTORY();

@Directive({
  selector: '[idsMessage]',
  standalone: true,
  host: {
    '[id]': 'id()',
    '[class]': '_hostClasses()',
  },
})
export class IdsMessageDirective {
  private readonly _componentClass = 'ids-message';
  private readonly _parent = inject<IdsFormFieldComponent>(IDS_FORM_FIELD, { skipSelf: true, optional: true });
  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_MESSAGE_DEFAULT_CONFIG);

  public id = input<string, number>(
    `${this._componentClass}-${nextUniqueId++}`,
    { transform: (value: number) => `${this._componentClass}-${value}` },
  );

  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsMessageVariantType>(this._defaultConfig.variant);
  private _parentOrSelfSize = computed(() => this._parent?.size() ?? this.size());
  private _parentOrSelfVariant = computed(() => this._parent?.variant() ?? this.variant());
  private _parentDisabled = computed(() => this._parent?.disabled());

  private _hostClasses = computed(() => createClassList(this._componentClass, [
    this._parentOrSelfSize(),
    this._parentOrSelfVariant(),
    this._parentDisabled() ? 'disabled' : null,
  ]));

  protected _getDefaultConfig(
    defaultConfig: Required<IdsMessageDefaultConfig>,
    injectionToken: InjectionToken<IdsMessageDefaultConfig>,
  ): Required<IdsMessageDefaultConfig> {
    return {
      ...defaultConfig,
      ...inject(injectionToken, { optional: true }),
    };
  }
}
