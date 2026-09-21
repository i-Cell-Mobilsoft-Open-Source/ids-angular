import { FieldsetBasicExampleComponent } from './fieldset-basic-example/fieldset-basic-example.component';
import { FieldsetMessageExampleComponent } from './fieldset-message-example/fieldset-message-example.component';
import { FieldsetRowsExampleComponent } from './fieldset-rows-example/fieldset-rows-example.component';
import { FieldsetSizesExampleComponent } from './fieldset-sizes-example/fieldset-sizes-example.component';
import { FieldsetVariantsExampleComponent } from './fieldset-variants-example/fieldset-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const FIELDSET_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'fieldset-basic',
    title: 'EXAMPLES.FIELDSET.BASIC.TITLE',
    description: 'EXAMPLES.FIELDSET.BASIC.DESCRIPTION',
    component: FieldsetBasicExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/fieldset/fieldset-basic-example/fieldset-basic-example.component.html',
        TSpath: 'assets/examples/fieldset/fieldset-basic-example/fieldset-basic-example.component.ts',
      },
    ],
  },
  {
    id: 'fieldset-variants',
    title: 'EXAMPLES.FIELDSET.VARIANTS.TITLE',
    description: 'EXAMPLES.FIELDSET.VARIANTS.DESCRIPTION',
    component: FieldsetVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/fieldset/fieldset-variants-example/fieldset-variants-example.component.html',
        TSpath: 'assets/examples/fieldset/fieldset-variants-example/fieldset-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'fieldset-sizes',
    title: 'EXAMPLES.FIELDSET.SIZES.TITLE',
    description: 'EXAMPLES.FIELDSET.SIZES.DESCRIPTION',
    component: FieldsetSizesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/fieldset/fieldset-sizes-example/fieldset-sizes-example.component.html',
        TSpath: 'assets/examples/fieldset/fieldset-sizes-example/fieldset-sizes-example.component.ts',
      },
    ],
  },
  {
    id: 'fieldset-message',
    title: 'EXAMPLES.FIELDSET.MESSAGE.TITLE',
    description: 'EXAMPLES.FIELDSET.MESSAGE.DESCRIPTION',
    component: FieldsetMessageExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/fieldset/fieldset-message-example/fieldset-message-example.component.html',
        TSpath: 'assets/examples/fieldset/fieldset-message-example/fieldset-message-example.component.ts',
      },
    ],
  },
  {
    id: 'fieldset-rows',
    title: 'EXAMPLES.FIELDSET.ROWS.TITLE',
    description: 'EXAMPLES.FIELDSET.ROWS.DESCRIPTION',
    component: FieldsetRowsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/fieldset/fieldset-rows-example/fieldset-rows-example.component.html',
        TSpath: 'assets/examples/fieldset/fieldset-rows-example/fieldset-rows-example.component.ts',
      },
    ],
  },
];
