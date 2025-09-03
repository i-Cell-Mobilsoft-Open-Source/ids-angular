import { IDS_ICON_BUTTON_DEFAULT_CONFIG, IDS_ICON_BUTTON_DEFAULT_CONFIG_FACTORY, IdsIconButtonDefaultConfig } from './icon-button-defaults';
import { IDS_ICON_BUTTON_PARENT } from './tokens/icon-button-parent';
import { IdsIconButtonAppearanceType } from './types/icon-button-appearance.type';
import { IdsIconButtonVariantType } from './types/icon-button-variant.type';

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  contentChildren,
  effect,
  inject,
  input,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  ComponentBaseWithDefaults,
  IdsSizeType,
  coerceBooleanAttribute,
} from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';

const defaultConfig = IDS_ICON_BUTTON_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'button[idsIconButton], a[idsIconButton]',
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
  private _hostElement = inject<ElementRef<HTMLElement>>(ElementRef<HTMLElement>).nativeElement;
  private _routerLink = inject(RouterLink, { optional: true, self: true });

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_ICON_BUTTON_DEFAULT_CONFIG);

  public appearance = input<IdsIconButtonAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsIconButtonVariantType>(this._defaultConfig.variant);
  public disabled = input(false, { transform: coerceBooleanAttribute });

  protected _icons = contentChildren(IdsIconComponent);

  private _parentOrSelfAppearance = computed(() => this._parent?.embeddedIconButtonAppearance() ?? this.appearance());
  private _parentOrSelfSize = computed(() => {
    const embeddedIconButtonSize = this._parent?.embeddedIconButtonSize;
    return embeddedIconButtonSize ? embeddedIconButtonSize() : this.size();
  });

  private _parentOrSelfVariant = computed(() => this._parent?.embeddedIconButtonVariant() ?? this.variant());
  private _parentOrSelfDisabled = computed(() => {
    const parentDisabled = this._parent?.disabled;
    return parentDisabled ? parentDisabled() : this.disabled();
  });

  protected _hostClasses = computed(() => this._getHostClasses([
    this._parentOrSelfAppearance(),
    this._parentOrSelfSize(),
    this._parentOrSelfVariant(),
    this.disabled() ? 'disabled' : null,
  ]));

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
