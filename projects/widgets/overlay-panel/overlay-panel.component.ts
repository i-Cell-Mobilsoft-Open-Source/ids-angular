import { IDS_OVERLAY_PANEL_DEFAULT_CONFIG, IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY, IdsOverlayPanelDefaultConfig } from './overlay-panel-defaults';
import { IdsOverlayPanelAppearanceType } from './types/overlay-panel-appearance.type';
import { IdsOverlayPanelVariantType } from './types/overlay-panel-variant.type';

import { CdkMenu, CdkTargetMenuAim } from '@angular/cdk/menu';
import {
  Component,
  InjectionToken,
  ViewEncapsulation,
  computed,
  contentChildren,
  inject,
  input,
} from '@angular/core';
import {
  createClassList,
  IdsSizeType,
} from '@i-cell/ids-angular/core';
import { IdsMenuItemComponent } from '@i-cell/ids-angular/menu-item';

const defaultConfig = IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-overlay-panel,div[idsOverlayPanel]',
  standalone: true,
  imports: [IdsMenuItemComponent],
  hostDirectives: [
    CdkMenu,
    CdkTargetMenuAim,
  ],
  template: '<ng-content />',
  encapsulation: ViewEncapsulation.None,
  host: {
    '[class]': '_hostClasses()',
  },
})
export class IdsOverlayPanelComponent {
  private readonly _componentClass = 'ids-overlay-panel';

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_OVERLAY_PANEL_DEFAULT_CONFIG);

  public appearance = input<IdsOverlayPanelAppearanceType>(this._defaultConfig.appearance);

  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsOverlayPanelVariantType>(this._defaultConfig.variant);

  public actionItems = contentChildren(IdsMenuItemComponent);

  private _hostClasses = computed(() => createClassList(this._componentClass, [
    this.appearance(),
    this.size(),
    this.variant(),
  ]),
  );

  // eslint-disable-next-line @stylistic/js/max-len
  protected _getDefaultConfig(defaultConfig: Required<IdsOverlayPanelDefaultConfig>, injectionToken: InjectionToken<IdsOverlayPanelDefaultConfig>): Required<IdsOverlayPanelDefaultConfig> {
    return {
      ...defaultConfig,
      ...inject(injectionToken, { optional: true }),
    };
  }
}
