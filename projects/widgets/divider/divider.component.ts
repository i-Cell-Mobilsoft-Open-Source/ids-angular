import { IDS_DIVIDER_DEFAULT_CONFIG, IDS_DIVIDER_DEFAULT_CONFIG_FACTORY, IdsDividerDefaultConfig } from './divider-defaults';
import { IdsDividerVariantType } from './types/divider-variant.type';

import { ChangeDetectionStrategy, Component, ViewEncapsulation, computed, input } from '@angular/core';
import { ComponentBaseWithDefaults, IdsOrientation, IdsOrientationType, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_DIVIDER_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-divider,div[idsDivider]',
  standalone: true,
  imports: [],
  template: '',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[style.width]': '_safeWidth()',
    '[style.height]': '_safeHeight()',
  },
})
export class IdsDividerComponent extends ComponentBaseWithDefaults<IdsDividerDefaultConfig> {
  protected override get _hostName(): string {
    return 'divider';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_DIVIDER_DEFAULT_CONFIG);

  public orientation = input<IdsOrientationType>(this._defaultConfig.orientation);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsDividerVariantType>(this._defaultConfig.variant);
  public width = input<string>(this._defaultConfig.width);
  public height = input<string>(this._defaultConfig.height);
  private _safeWidth = computed(() => (this.orientation() === IdsOrientation.HORIZONTAL ? this.width() : null));
  private _safeHeight = computed(() => (this.orientation() === IdsOrientation.VERTICAL ? this.height() : null));

  protected _hostClasses = computed(() => this._getHostClasses([
    this.orientation(),
    this.size(),
    this.variant(),
  ]),
  );
}
