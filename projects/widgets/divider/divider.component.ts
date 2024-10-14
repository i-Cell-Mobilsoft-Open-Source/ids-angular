import { IDS_DIVIDER_DEFAULT_CONFIG, IDS_DIVIDER_DEFAULT_CONFIG_FACTORY, IdsDividerDefaultConfig } from './divider-defaults';

import {
  Component,
  InjectionToken,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import {
  AllVariantsType,
  createClassList,
  Orientation,
  OrientationType,
  SizeType,
} from '@i-cell/ids-angular/core';

const defaultConfig = IDS_DIVIDER_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-divider,div[idsDivider]',
  standalone: true,
  imports: [],
  template: '',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '_hostClasses()',
    '[style.width]': '_safeWidth()',
    '[style.height]': '_safeHeight()',
  },
})
export class IdsDividerComponent {
  private readonly _componentClass = 'ids-divider';

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_DIVIDER_DEFAULT_CONFIG);

  public orientation = input<OrientationType | null>(this._defaultConfig.orientation);
  public size = input<SizeType | null>(this._defaultConfig.size);
  public variant = input<AllVariantsType | null>(this._defaultConfig.variant);
  public width = input<string | null>('100%');
  public height = input<string | null>('100%');
  private _safeWidth = computed(() => (this.orientation() === Orientation.HORIZONTAL ? this.width() : null));
  private _safeHeight = computed(() => (this.orientation() === Orientation.VERTICAL ? this.height() : null));

  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      this.orientation(),
      this.size(),
      this.variant(),
    ]),
  );

  // eslint-disable-next-line @stylistic/js/max-len
  protected _getDefaultConfig(defaultConfig: Required<IdsDividerDefaultConfig>, injectionToken: InjectionToken<IdsDividerDefaultConfig>): Required<IdsDividerDefaultConfig> {
    return {
      ...defaultConfig,
      ...inject(injectionToken, { optional: true }),
    };
  }
}
