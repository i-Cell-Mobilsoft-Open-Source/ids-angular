import { IDS_MENU_ITEM_DEFAULT_CONFIG, IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY, IdsMenuItemDefaultConfig } from './menu-item-defaults';
import { IdsMenuItemAppearanceType } from './types/menu-item-appearance.type';
import { IdsMenuItemVariantType } from './types/menu-item-variant.type';

import { CdkMenuItem } from '@angular/cdk/menu';
import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, computed, contentChildren, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComponentBaseWithDefaults, IdsSizeType, coerceBooleanAttribute } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

const defaultConfig = IDS_MENU_ITEM_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'button[idsMenuItem],a[idsMenuItem]',
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
  private _routerLink = inject(RouterLink, { optional: true, self: true });

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_MENU_ITEM_DEFAULT_CONFIG);

  public label = input<string>();
  public appearance = input<IdsMenuItemAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsMenuItemVariantType>(this._defaultConfig.variant);
  public disabled = input(false, { transform: coerceBooleanAttribute });

  public iconLeading = contentChildren<IdsIconComponent>('[icon-leading]');
  public iconTrailing = contentChildren<IdsIconComponent>('[icon-trailing]');

  protected _hostClasses = computed(() => this._getHostClasses([
    this.appearance(),
    this.size(),
    this.variant(),
    this.disabled() ? 'disabled' : null,
    !this.label() ? 'no-label' : null,
  ]));

  public get buttonType(): string | null {
    return this._hostElement.tagName === 'BUTTON' ? 'button' : null;
  }

  constructor() {
    super();

    effect(() => {
      if (this.buttonType) {
        return;
      }

      const link = this._hostElement as HTMLAnchorElement;

      if (this.disabled()) {
        this._disableLink(link);
      } else {
        this._enableLink(link);
      }
    });
  }

  private _disableLink(link: HTMLAnchorElement): void {
    if (!this._routerLink) {
      link.setAttribute('data-href', link.href);
    }
    link.removeAttribute('href');
  }

  private _enableLink(link: HTMLAnchorElement): void {
    const prevHref = this._routerLink?.href ?? link.getAttribute('data-href') ?? '';

    if (prevHref) {
      link.href = prevHref;
      link.removeAttribute('data-href');
    }
  }
}
