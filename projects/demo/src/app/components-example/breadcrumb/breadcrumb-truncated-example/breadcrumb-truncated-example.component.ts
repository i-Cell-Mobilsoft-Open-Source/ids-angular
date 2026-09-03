import { Component } from '@angular/core';
import { IdsBreadcrumbComponent, IdsBreadcrumbHierarchyType } from '@i-cell/ids-angular/breadcrumb';

@Component({
  selector: 'app-breadcrumb-truncated-example',
  imports: [IdsBreadcrumbComponent],
  templateUrl: './breadcrumb-truncated-example.component.html',
})
export class BreadcrumbTruncatedExampleComponent {
  public readonly hierarchy: IdsBreadcrumbHierarchyType[] = [
    { label: 'Home', path: '/index' },
    { label: 'Documents', path: '/documents' },
    { label: 'Projects', path: '/documents/projects' },
    { label: 'Design system', path: '/documents/projects/design-system' },
    { label: 'Components', path: '/documents/projects/design-system/components' },
    { label: 'Navigation', path: '/documents/projects/design-system/components/navigation' },
    { label: 'Breadcrumb', path: '/documents/projects/design-system/components/navigation/breadcrumb' },
  ];
}
