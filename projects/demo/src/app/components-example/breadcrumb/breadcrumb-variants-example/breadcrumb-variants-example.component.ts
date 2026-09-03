import { Component } from '@angular/core';
import { IdsBreadcrumbComponent, IdsBreadcrumbHierarchyType } from '@i-cell/ids-angular/breadcrumb';

@Component({
  selector: 'app-breadcrumb-variants-example',
  imports: [IdsBreadcrumbComponent],
  templateUrl: './breadcrumb-variants-example.component.html',
})
export class BreadcrumbVariantsExampleComponent {
  public readonly hierarchy: IdsBreadcrumbHierarchyType[] = [
    { label: 'Home', path: '/index' },
    { label: 'Components', path: '/components' },
    { label: 'Breadcrumb', path: '/breadcrumb' },
  ];
}
