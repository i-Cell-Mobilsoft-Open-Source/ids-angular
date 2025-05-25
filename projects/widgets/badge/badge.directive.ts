import {
  IDS_BADGE_DEFAULT_CONFIG,
  IDS_BADGE_DEFAULT_CONFIG_FACTORY,
  IdsBadgeDefaultConfig,
} from './badge-defaults';
import { IdsBadgeComponent } from './badge.component';
import { IdsBadgeAppearanceType } from './types/badge-appearance.type';
import { IdsBadgeVariantType } from './types/badge-variant.type';

import {
  ComponentRef,
  computed,
  Directive, effect, EffectRef,
  ElementRef,
  Injector,
  input, OnDestroy,
  OnInit, runInInjectionContext,
  ViewContainerRef,
} from '@angular/core';
import { DirectiveBaseWithDefaults, IdsSizeType } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_BADGE_DEFAULT_CONFIG_FACTORY();

@Directive({
  selector: '[idsBadge]',
  standalone: true,
})
export class IdsBadgeDirective extends DirectiveBaseWithDefaults<IdsBadgeDefaultConfig> implements OnInit, OnDestroy {
  private _badgeRef!: ComponentRef<IdsBadgeComponent>;
  private _iconEffectRef?: EffectRef;

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_BADGE_DEFAULT_CONFIG);

  public appearance = input<IdsBadgeAppearanceType>(this._defaultConfig.appearance, { alias: 'badgeAppearance' });
  public label = input<string>('', { alias: 'badgeLabel' });
  public size = input<IdsSizeType>(this._defaultConfig.size, { alias: 'badgeSize' });
  public variant = input<IdsBadgeVariantType>(this._defaultConfig.variant, { alias: 'badgeVariant' });
  public limit = input<number | null>(null, { alias: 'badgeLimit' });
  public showLeadingElement = input<boolean>(this._defaultConfig.showLeadingElement, { alias: 'badgeShowLeadingElement' });

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _viewContainerRef: ViewContainerRef,
    private _injector: Injector,
  ) {
    super();
  }

  public ngOnInit(): void {
    const originalEl = this._elementRef.nativeElement;

    runInInjectionContext(this._injector, () => {
      this._badgeRef = this._viewContainerRef.createComponent(IdsBadgeComponent, {
        injector: this._injector,
      });
      const badgeEl = this._badgeRef.location.nativeElement;

      const parent = originalEl.parentElement;
      if (!parent) {
        return;
      }

      const placeholder = document.createComment('ids-badge-wrapper');
      parent.replaceChild(placeholder, originalEl);
      badgeEl.appendChild(originalEl);
      parent.replaceChild(badgeEl, placeholder);

      effect(() => {
        this._badgeRef.setInput('appearance', this.appearance());
        this._badgeRef.setInput('variant', this.variant());
        this._badgeRef.setInput('label', this.label());
        this._badgeRef.setInput('size', this.size());
        this._badgeRef.setInput('limit', this.limit());
        this._badgeRef.setInput('showLeadingElement', this.showLeadingElement());
      });

      this._iconEffectRef = effect(() => {
        if (this.showLeadingElement()) {
          queueMicrotask(() => this._moveIconIfNeeded());
        }
      });

      this._moveIconIfNeeded();
    });
  }

  private _moveIconIfNeeded(): void {
    const host = this._elementRef.nativeElement;
    const icon = host.querySelector('ids-icon[icon-leading]');
    const badgeEl = this._badgeRef?.location.nativeElement;
    if (!icon || !badgeEl) {
      return;
    }
    const container =
      badgeEl.querySelector('.ids-badge__container') ||
      badgeEl.querySelector('.ids-badge__container-no-element');
    if (container && !container.contains(icon)) {
      container.prepend(icon);
    }
  }

  public ngOnDestroy(): void {
    this._iconEffectRef?.destroy();
    this._badgeRef?.destroy();
  }

  protected _hostClasses = computed(() => this._getHostClasses([]));
}
