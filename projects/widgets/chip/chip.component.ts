import { IDS_CHIP_DEFAULT_CONFIG, IDS_CHIP_DEFAULT_CONFIG_FACTORY, IdsChipDefaultConfig } from './chip-defaults';
import { IdsChipGroupComponent } from './chip-group.component';
import { IdsChipAppearance, IdsChipAppearanceType } from './types/chip-appearance.type';
import { IdsChipRemoveEvent } from './types/chip-events.type';
import { IdsChipVariant, IdsChipVariantType } from './types/chip-variant.type';

import { ChangeDetectionStrategy, Component, computed, inject, input, output, signal, ViewEncapsulation } from '@angular/core';
import { IDS_AVATAR_PARENT, IdsAvatarParent, IdsAvatarVariant, IdsAvatarVariantType } from '@i-cell/ids-angular/avatar';
import { coerceNumberAttribute, ComponentBaseWithDefaults, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IDS_ICON_BUTTON_PARENT, IdsIconButtonAppearance, IdsIconButtonAppearanceType, IdsIconButtonComponent, IdsIconButtonParent, IdsIconButtonVariant, IdsIconButtonVariantType } from '@i-cell/ids-angular/icon-button';

const defaultConfig = IDS_CHIP_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-chip',
  standalone: true,
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
  ],
  templateUrl: './chip.component.html',
  styleUrl: './chip.component.scss',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: IDS_ICON_BUTTON_PARENT,
      useExisting: IdsChipComponent,
    },
    {
      provide: IDS_AVATAR_PARENT,
      useExisting: IdsChipComponent,
    },
  ],
  host: {
    '[attr.role]': '_safeRole()',
    '[attr.tabindex]': '_safeTabIndex()',
  },
})
export class IdsChipComponent
  extends ComponentBaseWithDefaults<IdsChipDefaultConfig>
  implements IdsIconButtonParent, IdsAvatarParent {
  protected override get _componentName(): string {
    return 'chip';
  }

  private readonly _chipGroup = inject(IdsChipGroupComponent, { optional: true });

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_CHIP_DEFAULT_CONFIG);

  public closable = input<boolean>(this._defaultConfig.removable);
  public appearance = input<IdsChipAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsChipVariantType>(this._defaultConfig.variant);
  public disabled = input<boolean>(false);
  public tabIndex = input<number, unknown>(0, { transform: coerceNumberAttribute });

  public removed = output<IdsChipRemoveEvent>();

  private _safeAppearance = computed(() => this._chipGroup?.appearance() ?? this.appearance());
  private _safeSize = computed(() => this._chipGroup?.size() ?? this.size());
  private _safeDisabled = computed(() => this._chipGroup?.disabled() ?? this.disabled());
  private _safeRole = computed(() => (this.closable() ? null : 'button'));
  private _safeTabIndex = computed(() => (this.closable() || this.disabled() ? -1 : this.tabIndex()));
  protected _hostClasses = computed(() => this._getHostClasses([
    this._safeAppearance(),
    this._safeSize(),
    this.variant(),
    this._safeDisabled() ? 'disabled' : null,
  ]));

  public embeddedAvatarVariant = computed<IdsAvatarVariantType>(() => IdsAvatarVariant.SURFACE);
  public embeddedIconButtonVariant = computed<IdsIconButtonVariantType>(() => {
    const chipVariant = this.variant();
    const chipAppearance = this._safeAppearance();
    if (chipAppearance === IdsChipAppearance.OUTLINED) {
      return chipVariant;
    }

    switch (chipVariant) {
      case IdsChipVariant.PRIMARY:
      case IdsChipVariant.SECONDARY:
      case IdsChipVariant.DARK:
        return IdsIconButtonVariant.LIGHT;

      case IdsChipVariant.LIGHT:
        return IdsIconButtonVariant.SECONDARY;

      case IdsChipVariant.SURFACE:
        return IdsIconButtonVariant.SURFACE;
    }
  });

  public embeddedIconButtonAppearance = signal<IdsIconButtonAppearanceType>(IdsIconButtonAppearance.STANDARD);

  public remove(): void {
    this.removed.emit({ chip: this });
  }
}
