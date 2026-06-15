import { LoadingService } from '../services/loading.service';

import { HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { finalize } from 'rxjs';

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
