import {
  IDS_OVERLAY_PANEL_DEFAULT_CONFIG,
  IDS_OVERLAY_PANEL_DEFAULT_CONFIG_FACTORY,
  IdsOverlayPanelDefaultConfig,
} from './overlay-panel-defaults';
import { IdsOverlayPanelAppearanceType } from './types/overlay-panel-appearance.type';
import { IdsOverlayPanelVariantType } from './types/overlay-panel-variant.type';

import { A11yModule, CdkTrapFocus } from '@angular/cdk/a11y';
import { CdkMenu } from '@angular/cdk/menu';
import { OverlayModule, CdkOverlayOrigin, ConnectedPosition } from '@angular/cdk/overlay';
import { NgClass } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
  input, output, computed, contentChild,
  viewChild,
  effect,
  linkedSignal,
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

  public open = input<boolean>(false);
  public origin = input.required<CdkOverlayOrigin>();
  public closed = output<void>();
  public positions = input<ConnectedPosition[]>(this._defaultConfig.positions);

  public appearance = input<IdsOverlayPanelAppearanceType>(this._defaultConfig.appearance);
  public size = input<IdsSizeType>(this._defaultConfig.size);
  public variant = input<IdsOverlayPanelVariantType>(this._defaultConfig.variant);

  protected _open = linkedSignal(() => this.open());
  protected _hasCdkMenu = computed(() => !!this._cdkMenu());

  private _cdkMenu = contentChild(CdkMenu, { descendants: true });

  private _focusTrap = viewChild(CdkTrapFocus);

  public get isOpen(): boolean {
    return this._open();
  }

  constructor() {
    super();

    effect(() => {
      if (this._focusTrap()) {
        this._focusTrap()?.focusTrap.focusInitialElementWhenReady({ preventScroll: true });
      }
    });
  }

  public toggle(): void {
    this._open.set(!this._open());
  }

  protected _handleOverlayOutsideClick(): void {
    if (this._open()) {
      this._open.set(false);
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
