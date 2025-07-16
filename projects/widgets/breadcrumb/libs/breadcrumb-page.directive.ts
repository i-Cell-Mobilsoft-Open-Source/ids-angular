import { Directive } from '@angular/core';

@Directive({
  selector: 'span[idsBreadcrumbPage]',
  host: {
    role: 'link',
    'aria-current': 'page',
    'class': 'ids-breadcrumb-page',
  },
})
export class IdsBreadcrumbPageDirective {}
