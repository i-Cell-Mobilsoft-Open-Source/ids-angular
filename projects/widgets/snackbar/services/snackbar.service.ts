import { IDS_SNACKBAR_DEFAULT_OPTIONS, IDS_SNACKBAR_DEFAULT_OPTIONS_FACTORY } from '../snackbar-default-options';
import { IdsSnackbarGroupComponent } from '../snackbar-group.component';
import { getSnackbarFlexibleConnectedPositionStrategy, getSnackbarGlobalPositionStrategy } from '../snackbar-position-strategies';
import { IdsSnackbarData } from '../types/snackbar-data.type';
import { IdsSnackbarInnerData } from '../types/snackbar-inner-data.type';

import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { inject, Injectable, signal, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const defaultOptions = IDS_SNACKBAR_DEFAULT_OPTIONS_FACTORY();

@Injectable({
  providedIn: 'root',
})
export class IdsSnackbarService {
  private readonly _router = inject(Router);
  private readonly _overlay = inject(Overlay);
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...inject(IDS_SNACKBAR_DEFAULT_OPTIONS, { optional: true }),
  };

  private _overlayRef?: OverlayRef;
  private _snackbarGroupPortal = new ComponentPortal(IdsSnackbarGroupComponent, null);
  private _viewContainerRef?: ViewContainerRef;
  private _snackbarNextUniqueId = 0;
  private _snackbars = signal<IdsSnackbarInnerData[]>([]);

  public snackbars = this._snackbars.asReadonly();

  constructor() {
    this._router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.clear();
    });
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
    const margin = this._defaultOptions.viewportMargin;
    if (this._viewContainerRef) {
      const connectedTo = position
        .flexibleConnectedTo(this._viewContainerRef.element);
      return getSnackbarFlexibleConnectedPositionStrategy(connectedTo, this._defaultOptions.position, margin);
    } else {
      const globalPosition = position.global();
      return getSnackbarGlobalPositionStrategy(globalPosition, this._defaultOptions.position, margin);
    }
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

  public setViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this._viewContainerRef = viewContainerRef;
  }

  public update(): void {
    this._overlayRef?.updatePosition();
  }
}
