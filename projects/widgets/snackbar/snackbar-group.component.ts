import { snackbarAnimation } from './animations';
import { IdsSnackbarService } from './services/snackbar.service';
import { IDS_SNACKBAR_DEFAULT_CONFIG, IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY, IdsSnackbarDefaultConfig } from './snackbar-defaults';
import { IdsSnackbarComponent } from './snackbar.component';
import { IdsSnackbarInnerData } from './types/snackbar-inner-data.type';
import { IdsSnackbarPosition, IdsSnackbarPositionType } from './types/snackbar-position.type';

import { ChangeDetectionStrategy, Component, computed, inject, signal, Signal, ViewEncapsulation } from '@angular/core';
import { ComponentBaseWithDefaults } from '@i-cell/ids-angular/core';

const defaultConfig = IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-snackbar-group',
  imports: [IdsSnackbarComponent],
  templateUrl: './snackbar-group.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [snackbarAnimation],
})
export class IdsSnackbarGroupComponent extends ComponentBaseWithDefaults<IdsSnackbarDefaultConfig> {
  protected override get _hostName(): string {
    return 'snackbar-group';
  }

  private readonly _snackbarService = inject(IdsSnackbarService);
  protected readonly _defaultConfig = this._getDefaultConfig(defaultConfig, IDS_SNACKBAR_DEFAULT_CONFIG);

  public position = signal<IdsSnackbarPositionType>(this._defaultConfig.position);
  public snackbars: Signal<IdsSnackbarInnerData[]> = this._snackbarService.snackbars;

  protected _hostClasses = computed(() =>  this._getHostClasses([
    this._defaultConfig.size,
    [
      'position',
      this.position(),
    ],
    this._defaultConfig.newestAtStartPosition ? 'newest-at-start' : null,
  ]));

  protected _animationParams = computed<{ translateY: number, translateX: number, height: string }>(() => {
    switch (this.position()) {
      case IdsSnackbarPosition.BOTTOM_CENTER:
        return {
          translateY: 100,
          translateX: 0,
          height: '0',
        };
      case IdsSnackbarPosition.TOP_CENTER:
        return {
          translateY: -100,
          translateX: 0,
          height: '0',
        };
      case IdsSnackbarPosition.TOP_LEFT:
      case IdsSnackbarPosition.BOTTOM_LEFT:
        return {
          translateY: 0,
          translateX: -100,
          height: '*',
        };
      case IdsSnackbarPosition.TOP_RIGHT:
      case IdsSnackbarPosition.BOTTOM_RIGHT:
        return {
          translateY: 0,
          translateX: 100,
          height: '*',
        };
    }
  });

  public closeSnackbar(id: number): void {
    this._snackbarService.remove(id);
  }

  protected _onAnimateStart(): void {
    this._updatePosition();
  }

  protected _onAnimateDone(): void {
    this._updatePosition();
    if (this._snackbarService.snackbars().length === 0) {
      this._snackbarService.clear();
    }
  }

  protected _updatePosition(): void {
    this._snackbarService.update();
  }
}
