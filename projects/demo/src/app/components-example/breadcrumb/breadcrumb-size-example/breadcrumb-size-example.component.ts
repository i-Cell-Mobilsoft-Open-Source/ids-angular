import { Component } from '@angular/core';
import { IdsBreadcrumbComponent, IdsBreadcrumbHierarchyType } from '@i-cell/ids-angular/breadcrumb';

@Component({
  selector: 'app-breadcrumb-size-example',
  imports: [IdsBreadcrumbComponent],
  templateUrl: './breadcrumb-size-example.component.html',
})
export class BreadcrumbSizeExampleComponent {
  public readonly hierarchy: IdsBreadcrumbHierarchyType[] = [
    { label: 'Home', path: '/index' },
    { label: 'Components', path: '/components' },
    { label: 'Breadcrumb', path: '/breadcrumb' },
  ];
}
