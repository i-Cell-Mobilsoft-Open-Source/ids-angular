import { IDS_OVERLAY_PANEL_DEFAULT_CONFIG, IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY, IdsOverlayPanelDefaultConfig } from './overlay-panel-defaults';
import { IdsOverlayPanelAppearanceType } from './types/overlay-panel-appearance.type';
import { IdsOverlayPanelVariantType } from './types/overlay-panel-variant.type';

import { CdkMenu, CdkTargetMenuAim } from '@angular/cdk/menu';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  computed,
  contentChildren,
  input,
} from '@angular/core';
import {
  ComponentBaseWithDefaults,
  IdsSizeType,
} from '@i-cell/ids-angular/core';
import { IdsMenuItemComponent } from '@i-cell/ids-angular/menu';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IdsOverlayPanelComponent extends ComponentBaseWithDefaults<IdsOverlayPanelDefaultConfig> {
  protected override get _hostName(): string {
    return 'overlay-panel';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_OVERLAY_PANEL_DEFAULT_CONFIG);

  public appearance = input<IdsOverlayPanelAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsOverlayPanelVariantType>(this._defaultConfig.variant);

  public actionItems = contentChildren(IdsMenuItemComponent);

  protected _hostClasses = computed(() => this._getHostClasses([
    this.appearance(),
    this.size(),
    this.variant(),
  ]),
  );
}
