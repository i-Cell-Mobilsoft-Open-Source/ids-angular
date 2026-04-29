import { Injectable, signal } from '@angular/core';

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

