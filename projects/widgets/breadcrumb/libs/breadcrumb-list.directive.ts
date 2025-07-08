import { Directive } from '@angular/core';

@Directive({
  selector: 'ol[idsBreadcrumbList]',
  host: {
    'class': 'ids-breadcrumb-list',
  },
})
export class IdsBreadcrumbListDirective {}
