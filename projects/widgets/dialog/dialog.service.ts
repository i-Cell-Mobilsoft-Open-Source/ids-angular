import { IdsCustomDialogBase } from './custom-dialog-base';

import { DOCUMENT } from '@angular/common';
import { ApplicationRef, EnvironmentInjector, Injectable, Injector, Provider, Signal, StaticProvider, Type, createComponent, inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class IdsDialogService {
  private _appRef = inject(ApplicationRef);
  private _document = inject(DOCUMENT) as Document;
  private _injector = inject(EnvironmentInjector);

  public open<C extends IdsCustomDialogBase<R>, R = unknown>(
    component: Type<C>,
    options?: { providers?: (Provider | StaticProvider)[], inputs?: { [P in keyof C]?: C[P] extends Signal<infer T> ? T : C[P] } },
  ): Observable<R | undefined> {
    let elementInjector = undefined;

    if (options?.providers) {
      elementInjector = Injector.create({
        parent: this._injector,
        providers: options.providers,
      });
    }

    const createOptions = {
      environmentInjector: this._injector,
      ...(elementInjector && { elementInjector }),
    };
    const dialogRef = createComponent(component, createOptions);

    if (options?.inputs) {
      Object.keys(options.inputs).forEach((key) => dialogRef.setInput(key, options.inputs![key as keyof C]));
    }

    this._document.body.appendChild(dialogRef.location.nativeElement);

    this._appRef.attachView(dialogRef.hostView);

    const onClose = dialogRef.instance.dialogResult.asObservable();

    onClose.subscribe(() => {
      this._document.body.removeChild(dialogRef.location.nativeElement);
      dialogRef.destroy();
    },
    );

    return onClose;
  }
}
