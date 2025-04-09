import {
  IDS_SPINNER_DEFAULT_CONFIG,
  IDS_SPINNER_DEFAULT_CONFIG_FACTORY,
  IdsSpinnerDefaultConfig,
} from './spinner-defaults';
import { IdsSpinnerVariantType } from './types/spinner-variant.type';

import { Component, computed, input } from '@angular/core';
import { ComponentBaseWithDefaults } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_SPINNER_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-spinner',
  templateUrl: './spinner.component.html',
  host: {
    '[attr.aria-busy]': 'true',
    '[attr.aria-live]': '\'polite\'',
    '[attr.aria-label]': 'this.ariaLabel()',
  },
})
export class IdsSpinnerComponent extends ComponentBaseWithDefaults<IdsSpinnerDefaultConfig>  {
  protected override get _hostName(): string {
    return 'spinner';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_SPINNER_DEFAULT_CONFIG);

  public size = input<string>(this._defaultConfig.size);
  public sizeCollection = input<string>(this._defaultConfig.sizeCollection);
  public variant = input<IdsSpinnerVariantType>(this._defaultConfig.variant);
  public isTrack = input<boolean>(this._defaultConfig.isTrack);
  public ariaLabel = input<string>('', { alias: 'aria-label' });

  constructor() {
    super();
  }

  protected _hostClasses = computed(() => this._getHostClasses([
    this.variant(),
    [
      `${this.sizeCollection()}collection`,
      this.size(),
    ],
  ]));

}
