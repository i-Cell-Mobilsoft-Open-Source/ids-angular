import { Injectable, NgZone, OnDestroy, inject } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ResizeObserverService implements OnDestroy {
  private zone = inject(NgZone);

  private observers = new Map<Element, Subject<ResizeObserverEntry>>();
  private resizeObserver = new ResizeObserver(entries => {
    entries.forEach(entry => {
      const observer = this.observers.get(entry.target);
      this.zone.run(() => observer?.next(entry));
    });
  });

  public observe(target: Element): Observable<ResizeObserverEntry> {
    if (this.observers.has(target)) {
      return this.observers.get(target)!.asObservable();
    }

    const newObserver = new Subject<ResizeObserverEntry>();

    this.observers.set(target, newObserver);
    this.resizeObserver.observe(target);

    return newObserver.asObservable();
  }

  public unobserve(target: Element): void {
    const observer = this.observers.get(target);

    if (observer) {
      observer.complete();
      this.observers.delete(target);
    }

    this.resizeObserver.unobserve(target);
  }

  ngOnDestroy(): void {
      this.resizeObserver.disconnect();
  }
}
