import { IDS_SIDE_NAV_DEFAULT_CONFIG, IDS_SIDE_NAV_DEFAULT_CONFIG_FACTORY, IdsSideNavDefaultConfig } from './side-nav-defaults';
import { IDS_SIDE_NAV_PARENT } from './tokens/ids-side-nav-parent';
import { IDS_SIDE_NAV_ROUTER } from './tokens/ids-side-nav-router';
import { IdsSideNavAppearanceType } from './types/side-nav-appearance.type';
import { IdsSideNavVariantType } from './types/side-nav-variant.type';

import { Component, computed, inject, input } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { NavigationEnd, Router } from '@angular/router';
import { coerceBooleanAttribute, ComponentBaseWithDefaults, IdsSize, IdsSizeType } from '@i-cell/ids-angular/core';
import {
  IDS_ICON_BUTTON_PARENT,
  IdsIconButtonAppearanceType,
  IdsIconButtonVariantType,
  IdsIconButtonParent,
} from '@i-cell/ids-angular/icon-button';
import { filter } from 'rxjs';

const defaultConfig = IDS_SIDE_NAV_DEFAULT_CONFIG_FACTORY();

/**
 * Side navigation
 * - wrapper element for side navigation elements (sections, then title and items as part of section)
 * - content should be projected
 */
@Component({
  selector: 'nav[idsSideNav]',
  template: '<ng-content/>',
  host: {
    class: 'ids-side-nav',
  },
  providers: [
    {
      provide: IDS_ICON_BUTTON_PARENT,
      useExisting: IdsSideNavComponent,
    },
    {
      provide: IDS_SIDE_NAV_PARENT,
      useExisting: IdsSideNavComponent,
    },
    {
      provide: IDS_SIDE_NAV_ROUTER,
      useExisting: Router,
    },
  ],
})
export class IdsSideNavComponent extends ComponentBaseWithDefaults<IdsSideNavDefaultConfig> implements IdsIconButtonParent {
  protected override get _hostName(): string {
    return 'side-nav';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_SIDE_NAV_DEFAULT_CONFIG);
  protected readonly _router = inject(IDS_SIDE_NAV_ROUTER);

  public appearance = input<IdsSideNavAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsSideNavVariantType>(this._defaultConfig.variant);
  public hasLabel = input<boolean>(coerceBooleanAttribute(this._defaultConfig.hasLabel));
  public hasActiveIndicator = input<boolean>(coerceBooleanAttribute(this._defaultConfig.hasActiveIndicator));
  public navigationChange = toSignal(
    this._router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
    ),
  );

  public embeddedIconButtonAppearance = computed<IdsIconButtonAppearanceType>(() => this.appearance());
  public embeddedIconButtonVariant = computed<IdsIconButtonVariantType>(() => this.variant());
  public embeddedIconButtonSize = computed<IdsSizeType>(() => {
    switch (this.size()) {
      // NOTE: SPACIOUS icon button size sticks out of side-nav item, size need to be adjusted
      case IdsSize.SPACIOUS:
        return IdsSize.COMFORTABLE;
      default:
        return this.size();
    }
  });

  protected _hostClasses = computed(() => this._getHostClasses([
    this.appearance(),
    this.variant(),
    this.size(),
  ]));
}
