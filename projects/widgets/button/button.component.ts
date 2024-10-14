import { IDS_BUTTON_DEFAULT_CONFIG, IDS_BUTTON_DEFAULT_CONFIG_FACTORY, IdsButtonDefaultConfig } from './button-defaults';
import { ButtonAppearanceType } from './types/button-appearance';

import {
  Component,
  InjectionToken,
  ViewEncapsulation,
  computed,
  contentChildren,
  inject,
  input,
} from '@angular/core';
import {
  AllVariantsType,
  SizeType,
  coerceBooleanAttribute,
  createClassList,
} from '@i-cell/ids-angular/core';

const defaultConfig = IDS_BUTTON_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'button[idsButton]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '_hostClasses()',
    '[attr.aria-disabled]': 'this.disabled() || null',
    '[disabled]': 'this.disabled() || null',
  },
})
export class IdsButtonComponent {
  private readonly _componentClass = 'ids-button';

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_BUTTON_DEFAULT_CONFIG);

  public appearance = input<ButtonAppearanceType | null>(this._defaultConfig.appearance);

  public size = input<SizeType | null>(this._defaultConfig.size);
  public variant = input<AllVariantsType | null>(this._defaultConfig.variant);
  public disabled = input(false, {
    transform: (value: boolean | string) => coerceBooleanAttribute(value),
  });

  public iconLeading = contentChildren<unknown>('[icon-leading]');
  public iconTrailing = contentChildren<unknown>('[icon-trailing]');

  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      this.appearance(),
      this.size(),
      this.variant(),
    ]),
  );

  // eslint-disable-next-line @stylistic/js/max-len
  protected _getDefaultConfig(defaultConfig: Required<IdsButtonDefaultConfig>, injectionToken: InjectionToken<IdsButtonDefaultConfig>): Required<IdsButtonDefaultConfig> {
    return {
      ...defaultConfig,
      ...inject(injectionToken, { optional: true }),
    };
  }
}
