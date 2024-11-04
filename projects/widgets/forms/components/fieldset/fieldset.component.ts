import { IdsFieldsetMessageDirective } from './fieldset-message.directive';

import { ChangeDetectionStrategy, Component, computed, contentChildren, input, ViewEncapsulation } from '@angular/core';
import { ComponentBaseWithDefaults, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsFormFieldVariantType, IDS_FIELDSET_DEFAULT_CONFIG, IDS_FIELDSET_DEFAULT_CONFIG_FACTORY, IdsFieldsetDefaultConfig } from '@i-cell/ids-angular/forms';

const defaultConfig = IDS_FIELDSET_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'fieldset[idsFieldset]',
  standalone: true,
  imports: [],
  templateUrl: './fieldset.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsFieldsetComponent extends ComponentBaseWithDefaults<IdsFieldsetDefaultConfig> {
  protected override get _componentName(): string {
    return 'fieldset';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_FIELDSET_DEFAULT_CONFIG);

  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsFormFieldVariantType>(this._defaultConfig.variant);
  public legend = input<string>('');
  protected _legendClass = `${this._componentClass}-legend`;
  protected _messageClass = `${this._componentClass}-message`;

  private _fieldsetMessage = contentChildren<IdsFieldsetMessageDirective>(IdsFieldsetMessageDirective);

  protected _hasMessage = computed(() => this._fieldsetMessage().length > 0);

  protected _hostClasses = computed(() => this._getHostClasses([
    this.size(),
    this.variant(),
  ]));
}
