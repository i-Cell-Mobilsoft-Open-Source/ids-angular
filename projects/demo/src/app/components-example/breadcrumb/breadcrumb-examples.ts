import { BreadcrumbDividerTypesExampleComponent } from './breadcrumb-divider-types-example/breadcrumb-divider-types-example.component';
import { BreadcrumbSizeExampleComponent } from './breadcrumb-size-example/breadcrumb-size-example.component';
import { BreadcrumbTruncatedExampleComponent } from './breadcrumb-truncated-example/breadcrumb-truncated-example.component';
import { BreadcrumbVariantsExampleComponent } from './breadcrumb-variants-example/breadcrumb-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const BREADCRUMB_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'breadcrumb-variants',
    title: 'EXAMPLES.BREADCRUMB.VARIANTS.TITLE',
    description: 'EXAMPLES.BREADCRUMB.VARIANTS.DESCRIPTION',
    component: BreadcrumbVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/breadcrumb/breadcrumb-variants-example/breadcrumb-variants-example.component.html',
        TSpath: 'assets/examples/breadcrumb/breadcrumb-variants-example/breadcrumb-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'breadcrumb-sizes',
    title: 'EXAMPLES.BREADCRUMB.SIZES.TITLE',
    description: 'EXAMPLES.BREADCRUMB.SIZES.DESCRIPTION',
    component: BreadcrumbSizeExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/breadcrumb/breadcrumb-size-example/breadcrumb-size-example.component.html',
        TSpath: 'assets/examples/breadcrumb/breadcrumb-size-example/breadcrumb-size-example.component.ts',
      },
    ],
  },
  {
    id: 'breadcrumb-divider-types',
    title: 'EXAMPLES.BREADCRUMB.DIVIDER_TYPES.TITLE',
    description: 'EXAMPLES.BREADCRUMB.DIVIDER_TYPES.DESCRIPTION',
    component: BreadcrumbDividerTypesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/breadcrumb/breadcrumb-divider-types-example/breadcrumb-divider-types-example.component.html',
        TSpath: 'assets/examples/breadcrumb/breadcrumb-divider-types-example/breadcrumb-divider-types-example.component.ts',
      },
    ],
  },
  {
    id: 'breadcrumb-truncated',
    title: 'EXAMPLES.BREADCRUMB.TRUNCATED.TITLE',
    description: 'EXAMPLES.BREADCRUMB.TRUNCATED.DESCRIPTION',
    component: BreadcrumbTruncatedExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/breadcrumb/breadcrumb-truncated-example/breadcrumb-truncated-example.component.html',
        TSpath: 'assets/examples/breadcrumb/breadcrumb-truncated-example/breadcrumb-truncated-example.component.ts',
      },
    ],
  },
];
