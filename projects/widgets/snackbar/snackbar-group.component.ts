import { snackbarAnimation } from './animations';
import { IdsSnackbarService } from './public-api';
import { IDS_SNACKBAR_DEFAULT_CONFIG, IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY } from './snackbar-defaults';
import { IdsSnackbarComponent } from './snackbar.component';
import { IdsSnackbarInnerData } from './types/snackbar-inner-data.type';
import { SnackbarPosition, SnackbarPositionType } from './types/snackbar-position.type';

import { ChangeDetectionStrategy, Component, computed, HostBinding, inject, signal, Signal, ViewEncapsulation } from '@angular/core';
import { createClassList } from '@i-cell/ids-angular/core';

const defaultOptions = IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY();

@Component({
  selector: 'ids-snackbar-group',
  standalone: true,
  imports: [IdsSnackbarComponent],
  templateUrl: './snackbar-group.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [snackbarAnimation],
})
export class IdsSnackbarGroupComponent {
  private readonly _componentClass = 'ids-snackbar-group';
  private readonly _snackbarService = inject(IdsSnackbarService);
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...inject(IDS_SNACKBAR_DEFAULT_CONFIG, { optional: true }),
  };

  public position = signal<SnackbarPositionType>(this._defaultOptions.position);
  public snackbars: Signal<IdsSnackbarInnerData[]> = this._snackbarService.snackbars;

  private _hostClasses = createClassList(this._componentClass, [
    this._defaultOptions.size,
    [
      'position',
      this.position(),
    ],
    this._defaultOptions.newestAtStartPosition ? 'newest-at-start' : null,
  ]);

  protected _animationParams = computed<{ translateY: number, translateX: number, height: string }>(() => {
    switch (this.position()) {
      case SnackbarPosition.BOTTOM_CENTER:
        return {
          translateY: 100,
          translateX: 0,
          height: '0',
        };
      case SnackbarPosition.TOP_CENTER:
        return {
          translateY: -100,
          translateX: 0,
          height: '0',
        };
      case SnackbarPosition.TOP_LEFT:
      case SnackbarPosition.BOTTOM_LEFT:
        return {
          translateY: 0,
          translateX: -100,
          height: '*',
        };
      case SnackbarPosition.TOP_RIGHT:
      case SnackbarPosition.BOTTOM_RIGHT:
        return {
          translateY: 0,
          translateX: 100,
          height: '*',
        };
    }
  });

  @HostBinding('class') get hostClasses(): string {
    return this._hostClasses;
  }

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
