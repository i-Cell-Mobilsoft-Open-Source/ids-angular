import { IDS_SNACKBAR_DEFAULT_CONFIG, IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY } from '../snackbar-defaults';
import { IdsSnackbarGroupComponent } from '../snackbar-group.component';
import { getSnackbarGlobalPositionStrategy } from '../snackbar-position-strategies';
import { IdsSnackbarData } from '../types/snackbar-data.type';
import { IdsSnackbarInnerData } from '../types/snackbar-inner-data.type';

import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable, signal } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const defaultConfig = IDS_SNACKBAR_DEFAULT_CONFIG_FACTORY();

@Injectable({
  providedIn: 'root',
})
export class IdsSnackbarService {
  private readonly _router = inject(Router);
  private readonly _overlay = inject(Overlay);
  private readonly _defaultConfig = {
    ...defaultConfig,
    ...inject(IDS_SNACKBAR_DEFAULT_CONFIG, { optional: true }),
  };

  private _overlayRef?: OverlayRef;
  private _snackbarGroupPortal = new ComponentPortal(IdsSnackbarGroupComponent, null);
  private _snackbarNextUniqueId = 0;
  private _snackbars = signal<IdsSnackbarInnerData[]>([]);

  public snackbars = this._snackbars.asReadonly();

  constructor() {
    this._router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => this._clearSnackbarsOnNavigationEnd());
  }

  private _clearSnackbarsOnNavigationEnd(): void {
    const snackbars = this._snackbars();
    const snackbarsToKeep = snackbars.filter((snackbar) => snackbar.clearOnNavigation === false);

    if (snackbarsToKeep.length === 0) {
      this.clear();
      return;
    }

    if (snackbarsToKeep.length !== snackbars.length) {
      this._snackbars.set(snackbarsToKeep);
    }

    this.update();
  }

  private _attachGroup(): void {
    if (!this._overlayRef?.hasAttached()) {
      this._overlayRef = this._createOverlay();
      this._overlayRef.attach(this._snackbarGroupPortal);
    }
  }

  private _createOverlay(): OverlayRef {
    const overlayConfig = new OverlayConfig({
      positionStrategy: this._getPositionStrategy(),
      hasBackdrop: false,
      scrollStrategy: this._overlay.scrollStrategies.noop(),
    });
    return this._overlay.create(overlayConfig);
  }

  private _getPositionStrategy(): PositionStrategy {
    const position = this._overlay.position();
    const margin = this._defaultConfig.viewportMargin;
    const globalPosition = position.global();
    return getSnackbarGlobalPositionStrategy(globalPosition, this._defaultConfig.position, margin);
  }

  private _detachGroup(): void {
    this._overlayRef?.detach();
    this._overlayRef?.dispose();
  }

  public add(snackbar: IdsSnackbarData): void {
    if (this.snackbars().length === 0) {
      this._attachGroup();
    }
    this._snackbars.update((snackbars) => {
      const id = ++this._snackbarNextUniqueId;
      return [
        ...snackbars,
        {
          id,
          ...snackbar,
        },
      ];
    });
  }

  public remove(id: number): void {
    this._snackbars.update((snackbars) => {
      const index = snackbars.findIndex((snackbar) => snackbar.id === id);
      if (index !== -1) {
        const restSnackbars = [...snackbars];
        restSnackbars.splice(index, 1);
        return restSnackbars;
      }
      return snackbars;
    });
  }

  public clear(): void {
    this._snackbars.set([]);
    this._detachGroup();
  }

  public update(): void {
    this._overlayRef?.updatePosition();
  }
}
