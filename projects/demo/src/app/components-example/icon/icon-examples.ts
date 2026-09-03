import { IconSetExampleComponent } from './icon-set-example/icon-set-example.component';
import { IconSizeExampleComponent } from './icon-size-example/icon-size-example.component';
import { IconVariantsExampleComponent } from './icon-variants-example/icon-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const ICON_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'icon-variants',
    title: 'EXAMPLES.ICON.VARIANTS.TITLE',
    description: 'EXAMPLES.ICON.VARIANTS.DESCRIPTION',
    component: IconVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/icon/icon-variants-example/icon-variants-example.component.html',
        TSpath: 'assets/examples/icon/icon-variants-example/icon-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'icon-sizes',
    title: 'EXAMPLES.ICON.SIZES.TITLE',
    description: 'EXAMPLES.ICON.SIZES.DESCRIPTION',
    component: IconSizeExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/icon/icon-size-example/icon-size-example.component.html',
        TSpath: 'assets/examples/icon/icon-size-example/icon-size-example.component.ts',
      },
    ],
  },
  {
    id: 'icon-set',
    title: 'EXAMPLES.ICON.SET.TITLE',
    description: 'EXAMPLES.ICON.SET.DESCRIPTION',
    component: IconSetExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/icon/icon-set-example/icon-set-example.component.html',
        TSpath: 'assets/examples/icon/icon-set-example/icon-set-example.component.ts',
      },
    ],
  },
];
