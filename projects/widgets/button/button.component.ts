import { IDS_BUTTON_DEFAULT_CONFIG, IDS_BUTTON_DEFAULT_CONFIG_FACTORY, IdsButtonDefaultConfig } from './button-defaults';
import { IdsButtonGroupComponent } from './button-group.component';
import { IDS_BUTTON_PARENT } from './tokens/button-parent';
import { IdsButtonAppearanceType } from './types/button-appearance.type';
import { IdsButtonVariantType } from './types/button-variant.type';

import { ChangeDetectionStrategy, Component, ElementRef, ViewEncapsulation, computed, contentChildren, effect, inject, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ComponentBaseWithDefaults, IdsSizeType, coerceBooleanAttribute } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

const defaultConfig = IDS_BUTTON_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'button[idsButton], a[idsButton]',
  imports: [],
  templateUrl: './button.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.aria-disabled]': 'this.disabled()? "" : null',
    '[attr.disabled]': 'this.disabled() ? "" : null',
  },
})
export class IdsButtonComponent extends ComponentBaseWithDefaults<IdsButtonDefaultConfig> {
  protected override get _hostName(): string {
    return 'button';
  }

  private readonly _parent = inject(IDS_BUTTON_PARENT, { optional: true });
  private readonly _group = inject(IdsButtonGroupComponent, { optional: true });
  private _hostElement = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>).nativeElement;
  private _routerLink = inject(RouterLink, { optional: true, self: true });

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_BUTTON_DEFAULT_CONFIG);

  public appearance = input<IdsButtonAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsButtonVariantType>(this._defaultConfig.variant);
  public disabled = input(false, { transform: (value: boolean | string) => coerceBooleanAttribute(value) });

  private _parentOrSelfSize = computed(() => this._group?.size() ?? this.size());
  private _parentOrSelfVariant = computed(() => this._parent?.embeddedButtonVariant() ?? this.variant());

  protected _iconLeading = contentChildren<IdsIconComponent>('[icon-leading]');
  protected _iconTrailing = contentChildren<IdsIconComponent>('[icon-trailing]');

  private get _buttonType(): string | null {
    return this._hostElement.tagName === 'BUTTON' ? 'button' : null;
  }

  constructor() {
    super();

    effect(() => {
      if (this._buttonType) {
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

  protected _hostClasses = computed(() => this._getHostClasses([
    this.appearance(),
    this._parentOrSelfSize(),
    this._parentOrSelfVariant(),
    this.disabled() ? 'disabled' : null,
  ]));

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
