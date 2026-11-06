import { afterEveryRender, afterNextRender, DestroyRef, Directive, ElementRef, inject, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Directive({
  selector: 'a[idsBreadcrumbLink]',
  hostDirectives: [
    {
      directive: RouterLink,
      inputs: ['routerLink: link'],
    },
  ],
  host: {
    class: 'ids-breadcrumb-link',
    '[attr.aria-disabled]': 'this.disabled() ? "" : null',
    '[attr.disabled]': 'this.disabled() ? "" : null',
  },
})
export class IdsBreadcrumbLinkDirective {
  public readonly disabled = input<boolean>(false);
  public readonly link = input<RouterLink['routerLink'] | null>();
  public readonly hasTooltip = output<boolean>();

  constructor() {
    const host = inject<ElementRef<HTMLAnchorElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);
    let previous: boolean | undefined;
    const updateTooltip = (): void => {
      const clipped = host.offsetWidth < host.scrollWidth;
      if (clipped !== previous) {
        previous = clipped;
        this.hasTooltip.emit(clipped);
      }
    };

    afterEveryRender({ read: updateTooltip });
    afterNextRender({
      read: () => {
        const observer = new ResizeObserver(updateTooltip);
        observer.observe(host);
        destroyRef.onDestroy(() => observer.disconnect());
      },
    });
  }
}
