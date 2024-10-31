import { IDS_MENU_ITEM_DEFAULT_CONFIG, IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY, IdsMenuItemDefaultConfig } from './menu-item-defaults';
import { IdsMenuItemAppearanceType } from './types/menu-item-appearance.type';
import { MenuItemVariantType } from './types/menu-item-variant.type';

import { CdkMenuItem } from '@angular/cdk/menu';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
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
    '[class]': '_hostClasses()',
    '[type]': 'buttonType',
    '[attr.disabled]': 'disabled() ? "" : null',
    '[attr.aria-disabled]': 'disabled() || null',
  },
})
export class IdsMenuItemComponent {
  private readonly _componentClass = 'ids-menu-item';

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

  private _hostClasses = computed(() =>
    createClassList(this._componentClass, [
      this.appearance(),
      this.size(),
      this.variant(),
      this.active() ? 'active' : null,
    ]),
  );

  public get buttonType(): string | null {
    return this._hostElement.tagName === 'BUTTON' ? 'button' : null;
  }

  // eslint-disable-next-line @stylistic/js/max-len
  protected _getDefaultConfig(defaultConfig: Required<IdsMenuItemDefaultConfig>, injectionToken: InjectionToken<IdsMenuItemDefaultConfig>): Required<IdsMenuItemDefaultConfig> {
    return {
      ...defaultConfig,
      ...inject(injectionToken, { optional: true }),
    };
  }
}
