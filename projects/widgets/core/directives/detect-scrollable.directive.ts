import { ResizeObserverService } from '../services/resize-observer.service';

import { Directive, ElementRef, OnDestroy, OnInit, inject, signal } from '@angular/core';


@Directive({
  selector: '[idsDetectScrollable]',
  standalone: true,
  exportAs: 'idsDetectScrollable',
})
export class IdsDetectScrollableDirective implements OnInit, OnDestroy {
  private _hostElement = inject(ElementRef).nativeElement;
  private _resizeObserver = inject(ResizeObserverService);

  public isScrollable = signal(false);

  public ngOnInit(): void {
    this._resizeObserver.observe(this._hostElement).subscribe(() => {
      this.isScrollable.set(this._hostElement.scrollHeight > this._hostElement.clientHeight);
    },
    );
  }

  public ngOnDestroy(): void {
    this._resizeObserver.unobserve(this._hostElement);
  }
}
