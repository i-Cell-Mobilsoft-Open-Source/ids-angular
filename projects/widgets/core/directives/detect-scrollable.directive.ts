import { Directive, ElementRef, OnDestroy, OnInit, inject, signal } from '@angular/core';
import { ResizeObserverService } from '../services/resize-observer.service';

@Directive({
  selector: '[idsDetectScrollable]',
  standalone: true,
  exportAs: 'idsDetectScrollable',
})
export class IdsDetectScrollableDirective implements OnInit, OnDestroy {
  private hostElement = inject(ElementRef).nativeElement;
  private resizeObserver = inject(ResizeObserverService);

  public isScrollable = signal(false);

  ngOnInit(): void {
    this.resizeObserver.observe(this.hostElement).subscribe(() => {
      this.isScrollable.set(this.hostElement.scrollHeight > this.hostElement.clientHeight);
    });
  }

  ngOnDestroy(): void {
    this.resizeObserver.unobserve(this.hostElement);
  }
}
