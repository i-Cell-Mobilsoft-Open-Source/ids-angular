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

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _viewContainerRef: ViewContainerRef,
    private _injector: Injector,
  ) {
    super();
  }

  private _badgeRef!: ComponentRef<IdsBadgeComponent>;
  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_BADGE_DEFAULT_CONFIG);

  public appearance = input<IdsBadgeAppearanceType>(this._defaultConfig.appearance, { alias: 'badgeAppearance' });
  public variant = input<IdsBadgeVariantType>(this._defaultConfig.variant, { alias: 'badgeVariant' });
  public label = input<string>(this._defaultConfig.label, { alias: 'badgeLabel' });
  public size = input<IdsSizeType>(this._defaultConfig.size, { alias: 'badgeSize' });
  public limit = input<null | number>(null, { alias: 'badgeLimit' });

  public showLeadingElement = input<boolean>(this._defaultConfig.showLeadingElement, { alias: 'badgeShowLeadingElement' });

  private _iconEffectRef?: EffectRef;

  public ngOnInit(): void {
    const host = this._elementRef.nativeElement;

    runInInjectionContext(this._injector, () => {
      this._badgeRef = this._viewContainerRef.createComponent(IdsBadgeComponent, {
        injector: this._injector,
      });

      const badgeEl = this._badgeRef.location.nativeElement;
      host.appendChild(badgeEl);

      // Inputok frissítése reaktívan
      effect(() => {
        this._badgeRef.setInput('appearance', this.appearance());
        this._badgeRef.setInput('variant', this.variant());
        this._badgeRef.setInput('label', this.label());
        this._badgeRef.setInput('size', this.size());
        this._badgeRef.setInput('limit', this.limit());
      });

      // 👇 Ez az új: figyeli, hogy mutatni kell-e az ikont, és ha igen, DOM manipulációt végez
      this._iconEffectRef = effect(() => {
        if (this.showLeadingElement()) {
          queueMicrotask(() => this._moveIconIfNeeded());
        }
      });
    });

    this._moveIconIfNeeded();
  }

  private _moveIconIfNeeded(): void {
    const host = this._elementRef.nativeElement;
    const icon = host.querySelector('ids-icon[icon-leading]');
    const badgeEl = this._badgeRef?.location.nativeElement;

    if (icon && badgeEl) {
      const container = badgeEl.querySelector('.ids-badge__container');
      if (container && !container.contains(icon)) {
        container.prepend(icon);
      }
    }
  }

  public ngOnDestroy(): void {
    this._iconEffectRef?.destroy(); // helyes törlés!
  }

  protected _hostClasses = computed(() => this._getHostClasses([]));
}
