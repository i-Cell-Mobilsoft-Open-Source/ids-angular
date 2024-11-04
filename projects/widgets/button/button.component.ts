import { IDS_BUTTON_DEFAULT_CONFIG, IDS_BUTTON_DEFAULT_CONFIG_FACTORY, IdsButtonDefaultConfig } from './button-defaults';
import { IdsButtonAppearanceType } from './types/button-appearance.type';
import { IdsButtonVariantType } from './types/button-variant.type';

import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  contentChildren,
  input,
} from '@angular/core';
import {
  ComponentBaseWithDefaults,
  IdsSizeType,
  coerceBooleanAttribute,
} from '@i-cell/ids-angular/core';

const defaultConfig = IDS_BUTTON_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'button[idsButton]',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': '_hostClasses()',
    '[attr.aria-disabled]': 'this.disabled()? "" : null',
    '[attr.disabled]': 'this.disabled() ? "" : null',
  },
})
export class IdsButtonComponent extends ComponentBaseWithDefaults<IdsButtonDefaultConfig> {
  protected override get _componentName(): string {
    return 'button';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_BUTTON_DEFAULT_CONFIG);

  public appearance = input<IdsButtonAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsButtonVariantType>(this._defaultConfig.variant);
  public disabled = input(false, { transform: (value: boolean | string) => coerceBooleanAttribute(value) });

  public iconLeading = contentChildren<unknown>('[icon-leading]');
  public iconTrailing = contentChildren<unknown>('[icon-trailing]');

  protected _hostClasses = computed(() => this._getHostClasses([
    this.appearance(),
    this.size(),
    this.variant(),
  ]));
}
