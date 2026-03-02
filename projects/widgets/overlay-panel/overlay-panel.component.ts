import {
  IDS_OVERLAY_PANEL_DEFAULT_CONFIG,
  IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY,
  IdsOverlayPanelDefaultConfig,
} from './overlay-panel-defaults';
import { IdsOverlayPanelAppearanceType } from './types/overlay-panel-appearance.type';
import { IdsOverlayPanelVariantType } from './types/overlay-panel-variant.type';

import { A11yModule, CdkTrapFocus } from '@angular/cdk/a11y';
import { CdkMenu } from '@angular/cdk/menu';
import { OverlayModule, CdkOverlayOrigin, CdkConnectedOverlay, ConnectedPosition } from '@angular/cdk/overlay';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input, computed, contentChild,
  ElementRef,
  viewChild,
  untracked,
  effect,
  model,
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
export class IdsOverlayPanelComponent extends ComponentBaseWithDefaults<IdsOverlayPanelDefaultConfig> {
  protected override get _hostName(): string {
    return 'overlay-panel';
  }

  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_OVERLAY_PANEL_DEFAULT_CONFIG);

  public open = model<boolean>(false);
  public origin = input.required<CdkOverlayOrigin | ElementRef>();
  public positions = input<ConnectedPosition[]>(this._defaultConfig.positions);

  public appearance = input<IdsOverlayPanelAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsOverlayPanelVariantType>(this._defaultConfig.variant);
  public panelClasses = input<string>('');
  public width = input<string | number>();
  public readonly overlayDir = viewChild(CdkConnectedOverlay);

  protected _hasCdkMenu = computed(() => !!this._cdkMenu());
  private _cdkMenu = contentChild(CdkMenu, { descendants: true });
  private _focusTrap = viewChild(CdkTrapFocus);

  constructor() {
    super();

    effect(() => {
      if (this._focusTrap()) {
        this._focusTrap()?.focusTrap.focusInitialElementWhenReady({ preventScroll: true });
      }
    });

    effect(() => {
      const overlayDir = this.overlayDir();
      const overlayWidth = this.width();

      // apply width after the overlay has been rendered
      untracked(() => {
        if (overlayDir && overlayWidth) {
          overlayDir.width = overlayWidth;
        }
      });
    });
  }

  public toggle(): void {
    this.open.update((open) => !open);
  }

  protected _close(): void {
    if (this.open()) {
      this.open.set(false);
    }
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
