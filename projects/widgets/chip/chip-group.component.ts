import { IDS_CHIP_DEFAULT_CONFIG } from './chip-defaults';
import { IDS_CHIP_GROUP_DEFAULT_CONFIG_FACTORY, IdsChipGroupDefaultConfig } from './chip-group-defaults';
import { IdsChipAppearanceType } from './types/chip-appearance.type';

import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { ComponentBaseWithDefaults, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_CHIP_GROUP_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-chip-group',
  imports: [],
  template: '<ng-content select="ids-chip, button[idsChip]" />',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsChipGroupComponent extends ComponentBaseWithDefaults<IdsChipGroupDefaultConfig> {
  protected override get _hostName(): string {
    return 'chip-group';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_CHIP_DEFAULT_CONFIG);

  public appearance = input<IdsChipAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public disabled = input<boolean>(false);

  protected _hostClasses = computed(() => this._getHostClasses([
    this.appearance(),
    this.size(),
    this.disabled() ? 'disabled' : null,
  ]));
}
