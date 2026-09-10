import { PaginatorCompactLayoutExampleComponent } from './paginator-compact-layout-example/paginator-compact-layout-example.component';
import { PaginatorFirstLastButtonExampleComponent } from './paginator-first-last-button-example/paginator-first-last-button-example.component';
import { PaginatorSizesExampleComponent } from './paginator-sizes-example/paginator-sizes-example.component';
import { PaginatorTruncatedPagesExampleComponent } from './paginator-truncated-pages-example/paginator-truncated-pages-example.component';
import { PaginatorVariantsExampleComponent } from './paginator-variants-example/paginator-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const PAGINATOR_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'paginator-variants',
    title: 'EXAMPLES.PAGINATOR.VARIANTS.TITLE',
    description: 'EXAMPLES.PAGINATOR.VARIANTS.DESCRIPTION',
    component: PaginatorVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/paginator/paginator-variants-example/paginator-variants-example.component.html',
        TSpath: 'assets/examples/paginator/paginator-variants-example/paginator-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'paginator-sizes',
    title: 'EXAMPLES.PAGINATOR.SIZES.TITLE',
    description: 'EXAMPLES.PAGINATOR.SIZES.DESCRIPTION',
    component: PaginatorSizesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/paginator/paginator-sizes-example/paginator-sizes-example.component.html',
        TSpath: 'assets/examples/paginator/paginator-sizes-example/paginator-sizes-example.component.ts',
      },
    ],
  },
  {
    id: 'paginator-compact-layout',
    title: 'EXAMPLES.PAGINATOR.COMPACT_LAYOUT.TITLE',
    description: 'EXAMPLES.PAGINATOR.COMPACT_LAYOUT.DESCRIPTION',
    component: PaginatorCompactLayoutExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/paginator/paginator-compact-layout-example/paginator-compact-layout-example.component.html',
        TSpath: 'assets/examples/paginator/paginator-compact-layout-example/paginator-compact-layout-example.component.ts',
      },
    ],
  },
  {
    id: 'paginator-first-last-button',
    title: 'EXAMPLES.PAGINATOR.FIRST_LAST_BUTTON.TITLE',
    description: 'EXAMPLES.PAGINATOR.FIRST_LAST_BUTTON.DESCRIPTION',
    component: PaginatorFirstLastButtonExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/paginator/paginator-first-last-button-example/paginator-first-last-button-example.component.html',
        TSpath: 'assets/examples/paginator/paginator-first-last-button-example/paginator-first-last-button-example.component.ts',
      },
    ],
  },
  {
    id: 'paginator-truncated-pages',
    title: 'EXAMPLES.PAGINATOR.TRUNCATED_PAGES.TITLE',
    description: 'EXAMPLES.PAGINATOR.TRUNCATED_PAGES.DESCRIPTION',
    component: PaginatorTruncatedPagesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/paginator/paginator-truncated-pages-example/paginator-truncated-pages-example.component.html',
        TSpath: 'assets/examples/paginator/paginator-truncated-pages-example/paginator-truncated-pages-example.component.ts',
      },
    ],
  },
];
