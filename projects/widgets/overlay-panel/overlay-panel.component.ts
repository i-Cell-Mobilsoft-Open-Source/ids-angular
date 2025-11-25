import {
  IDS_OVERLAY_PANEL_DEFAULT_CONFIG,
  IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY,
  IdsOverlayPanelDefaultConfig,
} from './overlay-panel-defaults';
import { IdsOverlayPanelAppearanceType } from './types/overlay-panel-appearance.type';
import { IdsOverlayPanelVariantType } from './types/overlay-panel-variant.type';

import { A11yModule } from '@angular/cdk/a11y';
import { CdkMenu } from '@angular/cdk/menu';
import { OverlayModule, CdkOverlayOrigin } from '@angular/cdk/overlay';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input, output, computed, contentChild,
} from '@angular/core';
import { IdsSizeType, ComponentBaseWithDefaults } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-overlay-panel',
  imports: [
    OverlayModule,
    A11yModule,
    NgClass,
  ],
  templateUrl: './overlay-panel.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class OverlayPanelComponent extends ComponentBaseWithDefaults<IdsOverlayPanelDefaultConfig> {
  protected override get _hostName(): string {
    return 'overlay-panel';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_OVERLAY_PANEL_DEFAULT_CONFIG);

  public open = input<boolean>(false);
  public origin = input.required<CdkOverlayOrigin>();
  public closed = output<void>();

  public appearance = input<IdsOverlayPanelAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsOverlayPanelVariantType>(this._defaultConfig.variant);

  private _cdkMenu = contentChild(CdkMenu, { descendants: true });

  protected _hasCdkMenu = computed(() => !!this._cdkMenu());

  protected _handleOverlayOutsideClick(): void {
    if (this.open()) {
      this.closed.emit();
    }
  }

  protected _handleDetach(): void {
    this.closed.emit();
  }

  protected _panelClasses = computed(() => this._getHostClasses([
    this.appearance(),
    this.size(),
    this.variant(),
    this._hasCdkMenu() ? 'has-menu' : null,
  ]),
  );

  protected _hostClasses = computed(() => '');
}
