import { DOCUMENT } from '@angular/common';
import {
  ApplicationRef,
  createComponent,
  EnvironmentInjector,
  inject,
  Injectable,
  Injector,
  Provider,
  Signal,
  StaticProvider,
  Type,
} from '@angular/core';
import { Observable } from 'rxjs';
import { IdsCustomDialogBase } from './custom-dialog-base';

@Injectable({ providedIn: 'root' })
export class IdsDialogService {
  private appRef = inject(ApplicationRef);
  private document = inject(DOCUMENT);
  private injector = inject(EnvironmentInjector);

  open<C extends IdsCustomDialogBase<R>, R = unknown>(
    component: Type<C>,
    options?: { providers?: (Provider | StaticProvider)[]; inputs?: { [P in keyof C]?: C[P] extends Signal<infer T> ? T : C[P] } }
  ): Observable<R | undefined> {
    let elementInjector = undefined;

    if (options?.providers) {
      elementInjector = Injector.create({
        parent: this.injector,
        providers: options.providers,
      });
    }

    const createOptions = {
      environmentInjector: this.injector,
      ...(elementInjector && { elementInjector }),
    };
    const dialogRef = createComponent(component, createOptions);

    if (options?.inputs) {
      Object.keys(options.inputs).forEach((key) => dialogRef.setInput(key, options.inputs![key as keyof C]));
    }

    this.document.body.appendChild(dialogRef.location.nativeElement);

    this.appRef.attachView(dialogRef.hostView);

    const onClose = dialogRef.instance.dialogResult.asObservable();

    onClose.subscribe(() => {
      this.document.body.removeChild(dialogRef.location.nativeElement);
      dialogRef.destroy();
    });

    return onClose;
  }
}
