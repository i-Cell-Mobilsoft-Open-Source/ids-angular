import { IdsFormFieldComponent } from '../components/form-field/form-field.component';
import { IDS_MESSAGE_DEFAULT_CONFIG, IDS_MESSAGE_DEFAULT_CONFIG_FACTORY, IdsMessageDefaultConfig } from '../components/message/message-defaults';
import { IdsMessageVariantType } from '../components/message/types/message-variant.type';

import { Directive, computed, inject, input } from '@angular/core';
import { ComponentBaseWithDefaults, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_MESSAGE_DEFAULT_CONFIG_FACTORY();

@Directive({
  selector: '[idsMessage]',
  standalone: true,
})
export class IdsMessageDirective extends ComponentBaseWithDefaults<IdsMessageDefaultConfig> {
  protected override get _hostName(): string {
    return 'message';
  }

  private readonly _parent = inject<IdsFormFieldComponent>(IdsFormFieldComponent, { skipSelf: true, optional: true });
  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_MESSAGE_DEFAULT_CONFIG);

  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsMessageVariantType>(this._defaultConfig.variant);
  private _parentOrSelfSize = computed(() => this._parent?.size() ?? this.size());
  private _parentOrSelfVariant = computed(() => this._parent?.variant() ?? this.variant());
  private _parentDisabled = computed(() => this._parent?.disabled());

  protected _hostClasses = computed(() => this._getHostClasses([
    this._parentOrSelfSize(),
    this._parentOrSelfVariant(),
    this._parentDisabled() ? 'disabled' : null,
  ]));
}
