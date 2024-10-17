import { IDS_ICON_BUTTON_PARENT } from './public-api';
import { IDS_ICON_BUTTON_DEFAULT_CONFIG, IDS_ICON_BUTTON_DEFAULT_CONFIG_FACTORY, IdsIconButtonDefaultConfig } from './tokens/icon-button-defaults';
import { IdsIconButtonAppearanceType } from './types/icon-button-appearance.type';

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
  IdsAllVariantsType,
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
  host: {
    '[attr.class]': '_hostClasses()',
    '[attr.disabled]': '_safeDisabled() ? "" : null',
    '[attr.aria-disabled]': '_safeDisabled()',
  },
})
export class IdsIconButtonComponent {
  private readonly _componentClass = 'ids-icon-button';

  private readonly _embeddedParent = inject(IDS_ICON_BUTTON_PARENT, { optional: true });

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_ICON_BUTTON_DEFAULT_CONFIG);

  public appearance = input<IdsIconButtonAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsAllVariantsType>(this._defaultConfig.variant);
  public disabled = input(false, { transform: coerceBooleanAttribute });

  public icon = contentChildren(IdsIconComponent);

  private _safeAppearance = computed(() => this._embeddedParent?.embeddedIconButtonAppearance() ?? this.appearance());
  private _safeVariant = computed(() => this._embeddedParent?.embeddedIconButtonVariant() ?? this.variant());
  private _safeDisabled = computed(() => this._embeddedParent?.disabled() ?? this.disabled());
  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      this._safeAppearance(),
      this.size(),
      this._safeVariant(),
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
