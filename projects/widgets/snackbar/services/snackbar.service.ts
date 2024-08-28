import { IdsSnackbarGroupComponent } from '../snackbar-group.component';
import { IdsSnackbarItem } from '../types/snackbar-item.type';

import { ComponentRef, createComponent, EnvironmentInjector, inject, Injectable, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SnackbarService {
  private readonly _environmentInjector = inject(EnvironmentInjector);
  private readonly _router = inject(Router);
  private _viewContainerRef?: ViewContainerRef;
  private _snackbarGroupComponentRef?: ComponentRef<IdsSnackbarGroupComponent>;

  constructor() {
    this._router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.clear();
    });
  }

  public createGroup(viewContainerRef?: ViewContainerRef): void {
    if (viewContainerRef) {
      this._snackbarGroupComponentRef = viewContainerRef.createComponent(IdsSnackbarGroupComponent);
    } else {
      createComponent(IdsSnackbarGroupComponent, { environmentInjector: this._environmentInjector });
    }
  }

  public add(snackbar: IdsSnackbarItem): void {
    if (!this._snackbarGroupComponentRef) {
      this.createGroup(this._viewContainerRef);
    }
    this._snackbarGroupComponentRef?.instance.add(snackbar);
  }

  public clear(): void {
    this._snackbarGroupComponentRef?.instance.clear();
    this._snackbarGroupComponentRef?.destroy();
    this._snackbarGroupComponentRef = undefined;
  }

  public setViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this._viewContainerRef = viewContainerRef;
  }
}
