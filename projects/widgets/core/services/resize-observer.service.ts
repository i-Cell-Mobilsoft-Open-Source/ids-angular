import { Injectable, NgZone, OnDestroy, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ResizeObserverService implements OnDestroy {
  private _zone = inject(NgZone);

  private _observers = new Map<Element, Subject<ResizeObserverEntry>>();
  private _resizeObserver = new ResizeObserver((entries) => {
    entries.forEach((entry) => {
      const observer = this._observers.get(entry.target);
      this._zone.run(() => observer?.next(entry));
    });
  });

  public observe(target: Element): Observable<ResizeObserverEntry> {
    if (this._observers.has(target)) {
      return this._observers.get(target)!.asObservable();
    }

    const newObserver = new Subject<ResizeObserverEntry>();

    this._observers.set(target, newObserver);
    this._resizeObserver.observe(target);

    return newObserver.asObservable();
  }

  public unobserve(target: Element): void {
    const observer = this._observers.get(target);

    if (observer) {
      observer.complete();
      this._observers.delete(target);
    }

    this._resizeObserver.unobserve(target);
  }

  public ngOnDestroy(): void {
    this._resizeObserver.disconnect();
  }
}
