import { IDS_BUTTON_GROUP_DEFAULT_CONFIG, IDS_BUTTON_GROUP_DEFAULT_CONFIG_FACTORY, IdsButtonGroupDefaultConfig } from './button-group-defaults';

import { ChangeDetectionStrategy, Component, input, signal, ViewEncapsulation } from '@angular/core';
import { ComponentBaseWithDefaults, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_BUTTON_GROUP_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-button-group',
  standalone: true,
  imports: [],
  template: '<ng-content select="button[idsButton], button[idsIconButton]">',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsButtonGroupComponent extends ComponentBaseWithDefaults<IdsButtonGroupDefaultConfig> {
  protected override get _hostName(): string {
    return 'button-group';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_BUTTON_GROUP_DEFAULT_CONFIG);
  public size = input<IdsSizeType>(this._defaultConfig.size);

  protected _hostClasses =signal(this._getHostClasses([this.size()]));
}
