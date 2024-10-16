import { IDS_WINDOW_RESIZE_DEFAULT_OPTIONS, IDS_WINDOW_RESIZE_DEFAULT_OPTIONS_FACTORY } from '../tokens/window-resize-default-options';

import { inject, Injectable, NgZone, OnDestroy } from '@angular/core';
import { auditTime, fromEvent, Subject, Subscription } from 'rxjs';

const defaultOptions = IDS_WINDOW_RESIZE_DEFAULT_OPTIONS_FACTORY();

@Injectable({ providedIn: 'root' })
export class WindowResizeService implements OnDestroy {
  private readonly _ngZone = inject(NgZone);
  private readonly _resized = new Subject<void>();
  private readonly _defaultOptions = {
    ...defaultOptions,
    ...inject(IDS_WINDOW_RESIZE_DEFAULT_OPTIONS, { optional: true }),
  };

  private _subscription?: Subscription;

  public resized = this._resized.asObservable();

  constructor() {
    this._addWindowListener();
  }

  private _addWindowListener(): void {
    this._subscription = this._ngZone.runOutsideAngular(() =>
      fromEvent(window, 'resize').pipe(auditTime(this._defaultOptions.auditTime)).subscribe(() => this._resized.next()),
    );
  }

  public ngOnDestroy(): void {
    this._subscription?.unsubscribe();
  }
}
