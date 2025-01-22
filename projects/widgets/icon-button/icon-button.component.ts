import { IDS_ICON_BUTTON_DEFAULT_CONFIG, IDS_ICON_BUTTON_DEFAULT_CONFIG_FACTORY, IdsIconButtonDefaultConfig } from './icon-button-defaults';
import { IDS_ICON_BUTTON_PARENT } from './tokens/icon-button-parent';
import { IdsIconButtonAppearanceType } from './types/icon-button-appearance.type';
import { IdsIconButtonVariantType } from './types/icon-button-variant.type';

import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  contentChildren,
  inject,
  input,
} from '@angular/core';
import {
  ComponentBaseWithDefaults,
  IdsSizeType,
  coerceBooleanAttribute,
} from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

const defaultConfig = IDS_ICON_BUTTON_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'button[idsIconButton]',
  imports: [],
  templateUrl: './icon-button.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.disabled]': '_parentOrSelfDisabled() ? "" : null',
    '[attr.aria-disabled]': '_parentOrSelfDisabled()',
  },
})
export class IdsIconButtonComponent extends ComponentBaseWithDefaults<IdsIconButtonDefaultConfig> {
  protected override get _hostName(): string {
    return 'icon-button';
  }

  private readonly _parent = inject(IDS_ICON_BUTTON_PARENT, { optional: true });

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_ICON_BUTTON_DEFAULT_CONFIG);

  public appearance = input<IdsIconButtonAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsIconButtonVariantType>(this._defaultConfig.variant);
  public disabled = input(false, { transform: coerceBooleanAttribute });

  public icons = contentChildren(IdsIconComponent);

  private _parentOrSelfAppearance = computed(() => this._parent?.embeddedIconButtonAppearance() ?? this.appearance());
  private _parentOrSelfVariant = computed(() => this._parent?.embeddedIconButtonVariant() ?? this.variant());
  private _parentOrSelfDisabled = computed(() => this._parent?.disabled() ?? this.disabled());
  protected _hostClasses = computed(() => this._getHostClasses([
    this._parentOrSelfAppearance(),
    this.size(),
    this._parentOrSelfVariant(),
  ]));
}
