import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { finalize } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoadingService {
  public isLoading = signal<boolean>(false);

  public showSpinner(): void {
    this.isLoading.set(true);
  }

  public hideSpinner(): void {
    this.isLoading.set(false);
  }
}

export const loadingInterceptor: HttpInterceptorFn = (req: HttpRequest<unknown>, next: HttpHandlerFn) => {

  //just the graphql requests should trigger the loading indicator, the rest of the requests are not relevant for the user
  if (req.url.includes('/graphql')) {

    const loadingService = inject(LoadingService);
    loadingService.showSpinner();

    return next(req).pipe(
      finalize(() => loadingService.hideSpinner()),
    );
  }

  return next(req);
};
