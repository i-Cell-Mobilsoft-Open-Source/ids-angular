import { IDS_TAG_GROUP_DEFAULT_CONFIG, IDS_TAG_GROUP_DEFAULT_CONFIG_FACTORY, IdsTagGroupDefaultConfig } from './tag-group-defaults';
import { IdsTagAppearanceType } from './types/tag-appearance.type';

import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { ComponentBaseWithDefaults, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_TAG_GROUP_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-tag-group',
  standalone: true,
  imports: [],
  template: '<ng-content select="ids-tag, a[idsTag]" />',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsTagGroupComponent extends ComponentBaseWithDefaults<IdsTagGroupDefaultConfig> {
  protected override get _hostName(): string {
    return 'tag-group';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_TAG_GROUP_DEFAULT_CONFIG);

  public appearance = input<IdsTagAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);

  protected _hostClasses = computed(() => this._getHostClasses([
    this.appearance(),
    this.size(),
  ]));
}
