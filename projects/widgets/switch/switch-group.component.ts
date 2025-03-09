import { IDS_SWITCH_DEFAULT_CONFIG, IDS_SWITCH_DEFAULT_CONFIG_FACTORY, IdsSwitchDefaultConfig } from './switch-defaults';

import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { IdsSizeType, ComponentBaseWithDefaults } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_SWITCH_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-switch-group',
  imports: [],
  templateUrl: './switch-group.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsSwitchGroupComponent extends ComponentBaseWithDefaults<IdsSwitchDefaultConfig> {
  protected override get _hostName(): string {
    return 'switch-group';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_SWITCH_DEFAULT_CONFIG);

  public size = input<IdsSizeType | null>(this._defaultConfig.size);
  public hasIcon = input(this._defaultConfig.hasIcon);
  public iconPosition = input(this._defaultConfig.iconPosition);
  public labelPosition = input(this._defaultConfig.labelPosition);

  protected _hostClasses = computed(() => this._getHostClasses([this.size()]));
}
