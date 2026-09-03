import { Component } from '@angular/core';
import { IdsBreadcrumbComponent, IdsBreadcrumbHierarchyType } from '@i-cell/ids-angular/breadcrumb';

@Component({
  selector: 'app-breadcrumb-divider-types-example',
  imports: [IdsBreadcrumbComponent],
  templateUrl: './breadcrumb-divider-types-example.component.html',
})
export class BreadcrumbDividerTypesExampleComponent {
  public readonly hierarchy: IdsBreadcrumbHierarchyType[] = [
    { label: 'Home', path: '/index' },
    { label: 'Components', path: '/components' },
    { label: 'Breadcrumb', path: '/breadcrumb' },
  ];
}
