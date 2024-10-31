import { IDS_ICON_BUTTON_DEFAULT_CONFIG, IDS_ICON_BUTTON_DEFAULT_CONFIG_FACTORY, IdsIconButtonDefaultConfig } from './icon-button-defaults';
import { IdsIconButtonAppearanceType } from './types/icon-button-appearance.type';
import { IdsIconButtonVariantType } from './types/icon-button-variant.type';

import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  ViewEncapsulation,
  computed,
  contentChildren,
  inject,
  input,
} from '@angular/core';
import {
  IdsSizeType,
  coerceBooleanAttribute,
  createClassList,
} from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

const defaultConfig = IDS_ICON_BUTTON_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'button[idsIconButton]',
  standalone: true,
  imports: [],
  templateUrl: './icon-button.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.class]': '_hostClasses()',
    '[disabled]': 'disabled() || null',
    '[attr.aria-disabled]': 'disabled()',
  },
})
export class IdsIconButtonComponent {
  private readonly _componentClass = 'ids-icon-button';

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_ICON_BUTTON_DEFAULT_CONFIG);

  public appearance = input<IdsIconButtonAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsIconButtonVariantType>(this._defaultConfig.variant);
  public disabled = input(false, { transform: coerceBooleanAttribute });

  public icon = contentChildren(IdsIconComponent);

  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      this.appearance(),
      this.size(),
      this.variant(),
    ]),
  );

  // eslint-disable-next-line @stylistic/js/max-len
  protected _getDefaultConfig(defaultConfig: Required<IdsIconButtonDefaultConfig>, injectionToken: InjectionToken<IdsIconButtonDefaultConfig>): Required<IdsIconButtonDefaultConfig> {
    return {
      ...defaultConfig,
      ...inject(injectionToken, { optional: true }),
    };
  }
}
