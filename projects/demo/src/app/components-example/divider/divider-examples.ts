import { DividerOrientationExampleComponent } from './divider-orientation-example/divider-orientation-example.component';
import { DividerSizesExampleComponent } from './divider-sizes-example/divider-sizes-example.component';
import { DividerVariantsExampleComponent } from './divider-variants-example/divider-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const DIVIDER_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'divider-sizes',
    title: 'EXAMPLES.DIVIDER.SIZES.TITLE',
    description: 'EXAMPLES.DIVIDER.SIZES.DESCRIPTION',
    component: DividerSizesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/divider/divider-sizes-example/divider-sizes-example.component.html',
        TSpath: 'assets/examples/divider/divider-sizes-example/divider-sizes-example.component.ts',
      },
    ],
  },
  {
    id: 'divider-variants',
    title: 'EXAMPLES.DIVIDER.VARIANTS.TITLE',
    description: 'EXAMPLES.DIVIDER.VARIANTS.DESCRIPTION',
    component: DividerVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/divider/divider-variants-example/divider-variants-example.component.html',
        TSpath: 'assets/examples/divider/divider-variants-example/divider-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'divider-orientation',
    title: 'EXAMPLES.DIVIDER.ORIENTATION.TITLE',
    description: 'EXAMPLES.DIVIDER.ORIENTATION.DESCRIPTION',
    component: DividerOrientationExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/divider/divider-orientation-example/divider-orientation-example.component.html',
        TSpath: 'assets/examples/divider/divider-orientation-example/divider-orientation-example.component.ts',
      },
    ],
  },
];
