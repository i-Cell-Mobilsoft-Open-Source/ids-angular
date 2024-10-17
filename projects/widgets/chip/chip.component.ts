import { IDS_CHIP_DEFAULT_CONFIG, IDS_CHIP_DEFAULT_CONFIG_FACTORY, IdsChipDefaultConfig } from './chip-defaults';
import { IdsChipRemoveDirective } from './chip-remove.directive';
import { IdsChipAppearanceType } from './types/chip-appearance.type';
import { IdsChipVariant, IdsChipVariantType } from './types/chip-variant.type';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component, computed, inject, input, OnDestroy, signal, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { coerceNumberAttribute, ComponentBaseWithDefaults, IdsAllVariants, IdsAllVariantsType, IdsSizeType } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { IDS_ICON_BUTTON_PARENT, IdsIconButtonAppearance, IdsIconButtonComponent, IdsIconButtonParent } from '@i-cell/ids-angular/icon-button';

const defaultConfig = IDS_CHIP_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-chip',
  standalone: true,
  imports: [
    IdsIconButtonComponent,
    IdsIconComponent,
    IdsChipRemoveDirective,
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
  ],
  host: {
    '[attr.role]': '_safeRole()',
    '[attr.tabindex]': '_safeTabIndex()',
  },
})
export class IdsChipComponent extends ComponentBaseWithDefaults<IdsChipDefaultConfig> implements IdsIconButtonParent, OnDestroy {
  protected override get _componentName(): string {
    return 'chip';
  }
  
  private readonly _viewContainerRef = inject(ViewContainerRef);
  private readonly _changeDetectorRef = inject(ChangeDetectorRef);

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_CHIP_DEFAULT_CONFIG);
  
  public closable = input<boolean>(this._defaultConfig.closable);
  public appearance = input<IdsChipAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsChipVariantType>(this._defaultConfig.variant);
  public disabled = input<boolean>(false);
  public tabIndex = input<number, unknown>(0, { transform: coerceNumberAttribute });

  private _safeRole = computed(() => (this.closable() ? null : 'button'));
  private _safeTabIndex = computed(() => (this.closable() || this.disabled() ? -1 : this.tabIndex()));
  protected _hostClasses = computed(() => this._getHostClasses([
    this.appearance(),
    this.size(),
    this.variant(),
    this.disabled() ? 'disabled' : null,
  ]));

  public embeddedIconButtonVariant = computed<IdsAllVariantsType>(() => {
    const chipVariant = this.variant();
    switch (chipVariant) {
      case IdsChipVariant.PRIMARY:
      case IdsChipVariant.SECONDARY:
      case IdsChipVariant.DARK:
        return IdsAllVariants.LIGHT;
      
      case IdsChipVariant.LIGHT:
        return IdsAllVariants.SECONDARY;
      
      case IdsChipVariant.SURFACE:
        return IdsAllVariants.SURFACE;
    }
  });

  public embeddedIconButtonAppearance = signal(IdsIconButtonAppearance.STANDARD);

  public remove(): void {
    // console.log(this._viewContainerRef);
    this._viewContainerRef.clear();
    // this._viewContainerRef.remove(0);
    // this._changeDetectorRef.detectChanges();
  }

  public ngOnDestroy(): void {
    console.info('chip destroyed');
  }
}
