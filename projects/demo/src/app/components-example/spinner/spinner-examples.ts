import { SpinnerSizesExampleComponent } from './spinner-sizes-example/spinner-sizes-example.component';
import { SpinnerTrackExampleComponent } from './spinner-track-example/spinner-track-example.component';
import { SpinnerVariantsExampleComponent } from './spinner-variants-example/spinner-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const SPINNER_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'spinner-variants',
    title: 'EXAMPLES.SPINNER.VARIANTS.TITLE',
    description: 'EXAMPLES.SPINNER.VARIANTS.DESCRIPTION',
    component: SpinnerVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/spinner/spinner-variants-example/spinner-variants-example.component.html',
        TSpath: 'assets/examples/spinner/spinner-variants-example/spinner-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'spinner-sizes',
    title: 'EXAMPLES.SPINNER.SIZES.TITLE',
    description: 'EXAMPLES.SPINNER.SIZES.DESCRIPTION',
    component: SpinnerSizesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/spinner/spinner-sizes-example/spinner-sizes-example.component.html',
        TSpath: 'assets/examples/spinner/spinner-sizes-example/spinner-sizes-example.component.ts',
      },
    ],
  },
  {
    id: 'spinner-track',
    title: 'EXAMPLES.SPINNER.TRACK.TITLE',
    description: 'EXAMPLES.SPINNER.TRACK.DESCRIPTION',
    component: SpinnerTrackExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/spinner/spinner-track-example/spinner-track-example.component.html',
        TSpath: 'assets/examples/spinner/spinner-track-example/spinner-track-example.component.ts',
      },
    ],
  },
];
