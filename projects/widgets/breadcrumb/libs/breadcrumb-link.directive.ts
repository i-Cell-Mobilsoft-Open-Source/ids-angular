import { afterNextRender, Directive, ElementRef, inject, input, output } from '@angular/core';
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
    '[attr.aria-disabled]': 'this.disabled()? "" : null',
    '[attr.disabled]': 'this.disabled() ? "" : null',
  },
})
export class IdsBreadcrumbLinkDirective {
  public readonly disabled = input<boolean>(false);
  public readonly link = input<RouterLink['routerLink'] | null>();
  public readonly hasTooltip = output<boolean>();

  constructor() {
    const host = inject(ElementRef).nativeElement;

    afterNextRender({
      read: () => {
        this.hasTooltip.emit(host.offsetWidth < host.scrollWidth);
      },
    });
  }
}
