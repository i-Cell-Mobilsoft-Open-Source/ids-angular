import { IDS_MENU_ITEM_DEFAULT_CONFIG, IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY, IdsMenuItemDefaultConfig } from './menu-item-defaults';
import { IdsMenuItemAppearanceType } from './types/menu-item-appearance.type';
import { MenuItemVariantType } from './types/menu-item-variant.type';

import { CdkMenuItem } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, computed, contentChildren, inject, input } from '@angular/core';
import { ComponentBaseWithDefaults, IdsSizeType, coerceBooleanAttribute } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'button[idsMenuItem],a[idsMenuItem]',
  standalone: true,
  imports: [],
  hostDirectives: [CdkMenuItem],
  templateUrl: './menu-item.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[type]': 'buttonType',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.aria-disabled]': 'disabled() || null',
  },
})
export class IdsMenuItemComponent extends ComponentBaseWithDefaults<IdsMenuItemDefaultConfig> {
  protected override get _hostName(): string {
    return 'menu-item';
  }

  private _hostElement = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>).nativeElement;

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_MENU_ITEM_DEFAULT_CONFIG);

  public label = input.required<string>();
  public appearance = input<IdsMenuItemAppearanceType>(this._defaultConfig.appearance);

  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<MenuItemVariantType>(this._defaultConfig.variant);
  public active = input(false);
  public disabled = input(false, {
    transform: (value: boolean | string) => coerceBooleanAttribute(value),
  });

  public iconLeading = contentChildren<unknown>('[icon-leading]');
  public iconTrailing = contentChildren<unknown>('[icon-trailing]');

  protected _hostClasses = computed(() => this._getHostClasses([
    this.appearance(),
    this.size(),
    this.variant(),
    this.active() ? 'active' : null,
  ]));

  public get buttonType(): string | null {
    return this._hostElement.tagName === 'BUTTON' ? 'button' : null;
  }
}
