import { IdsCustomDialogBase } from './custom-dialog-base';

import { Dialog, DialogRef } from '@angular/cdk/dialog';
import { Injectable, Signal, StaticProvider, Type, afterNextRender, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IdsDialogService {
  private readonly _dialog = inject(Dialog);

  public open<C extends IdsCustomDialogBase<R>, R = unknown>(
    component: Type<C>,
    options?: {
      providers?: StaticProvider[] | undefined,
      inputs?: {
        [P in keyof C]?: C[P] extends Signal<infer T> ? T : C[P];
      };
      showBackdrop?: boolean;
    },
  ): Observable<R | undefined> {
    const panelClass = [
      'ids-dialog-overlay-panel',
      'ids-dialog',
      options?.showBackdrop === false ? '' : 'ids-dialog-with-backdrop',
    ];
    const dialogRef = this._dialog.open<R | undefined, unknown, C>(component, {
      hasBackdrop: true,
      disableClose: true,
      panelClass,
      backdropClass: options?.showBackdrop === false
        ? 'ids-dialog-transparent-backdrop'
        : 'ids-dialog-backdrop',
      providers: options?.providers,
    });

    if (options?.inputs && dialogRef.componentRef) {
      for (const key of Object.keys(options.inputs)) {
        dialogRef.componentRef.setInput(
          key,
          options.inputs[key as keyof C],
        );
      }
    }

    this._applyDialogSizeFromComponent(dialogRef);

    return dialogRef.closed;
  }

  private _applyDialogSizeFromComponent<R, C extends IdsCustomDialogBase<R>>(
    dialogRef: DialogRef<R | undefined, C>,
  ): void {
    const applySize = (): void => {
      const resolvedSize = dialogRef.componentInstance?.size();
      if (resolvedSize != null) {
        dialogRef.addPanelClass(`ids-dialog-${resolvedSize}`);
      }
    };

    if (dialogRef.componentRef) {
      afterNextRender(applySize, { injector: dialogRef.componentRef.injector });
    } else {
      applySize();
    }
  }
}
