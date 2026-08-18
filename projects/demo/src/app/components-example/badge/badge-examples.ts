import { BadgeEmptyExampleComponent } from './badge-empty-example/badge-empty-example.component';
import { BadgeIconExampleComponent } from './badge-icon-example/badge-icon-example.component';
import { BadgeLimitExampleComponent } from './badge-limit-example/badge-limit-example.component';
import { BadgeSizeExampleComponent } from './badge-size-example/badge-size-example.component';
import { BadgeVariantsExampleComponent } from './badge-variants-example/badge-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const BADGE_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'badge-variants',
    title: 'EXAMPLES.BADGE.VARIANTS.TITLE',
    description: 'EXAMPLES.BADGE.VARIANTS.DESCRIPTION',
    component: BadgeVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/badge/badge-variants-example/badge-variants-example.component.html',
        TSpath: 'assets/examples/badge/badge-variants-example/badge-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'badge-sizes',
    title: 'EXAMPLES.BADGE.SIZES.TITLE',
    description: 'EXAMPLES.BADGE.SIZES.DESCRIPTION',
    component: BadgeSizeExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/badge/badge-size-example/badge-size-example.component.html',
        TSpath: 'assets/examples/badge/badge-size-example/badge-size-example.component.ts',
      },
    ],
  },
  {
    id: 'badge-icon',
    title: 'EXAMPLES.BADGE.ICONS.TITLE',
    description: 'EXAMPLES.BADGE.ICONS.DESCRIPTION',
    component: BadgeIconExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/badge/badge-icon-example/badge-icon-example.component.html',
        TSpath: 'assets/examples/badge/badge-icon-example/badge-icon-example.component.ts',
      },
    ],
  },
  {
    id: 'badge-limit',
    title: 'EXAMPLES.BADGE.LIMIT.TITLE',
    description: 'EXAMPLES.BADGE.LIMIT.DESCRIPTION',
    component: BadgeLimitExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/badge/badge-limit-example/badge-limit-example.component.html',
        TSpath: 'assets/examples/badge/badge-limit-example/badge-limit-example.component.ts',
      },
    ],
  },
  {
    id: 'badge-empty',
    title: 'EXAMPLES.BADGE.EMPTY.TITLE',
    description: 'EXAMPLES.BADGE.EMPTY.DESCRIPTION',
    component: BadgeEmptyExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/badge/badge-empty-example/badge-empty-example.component.html',
        TSpath: 'assets/examples/badge/badge-empty-example/badge-empty-example.component.ts',
      },
    ],
  },
];
