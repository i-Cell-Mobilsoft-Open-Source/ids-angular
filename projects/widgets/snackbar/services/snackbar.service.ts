import { IdsSnackbarGroupComponent } from '../snackbar-group.component';
import { IdsSnackbarInnerItem } from '../types/snackbar-inner.type';
import { IdsSnackbarItem } from '../types/snackbar-item.type';

import { ComponentRef, createComponent, EnvironmentInjector, inject, Injectable, signal, ViewContainerRef } from '@angular/core';
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
  private _snackbarNextUniqueId = 0;
  private _snackbars = signal<IdsSnackbarInnerItem[]>([]);

  public snackbars = this._snackbars.asReadonly();

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
    this._snackbarGroupComponentRef?.destroy();
    this._snackbarGroupComponentRef = undefined;
  }

  public setViewContainerRef(viewContainerRef: ViewContainerRef): void {
    this._viewContainerRef = viewContainerRef;
  }
}
