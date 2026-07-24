import { CardAppearanceExampleComponent } from './card-appearance-example/card-appearance-example.component';
import { CardClickableExampleComponent } from './card-clickable-example/card-clickable-example.component';
import { CardFullCompositionExampleComponent } from './card-full-composition-example/card-full-composition-example.component';
import { CardMediaExampleComponent } from './card-media-example/card-media-example.component';
import { CardOrientationExampleComponent } from './card-orientation-example/card-orientation-example.component';
import { CardSizeExampleComponent } from './card-size-example/card-size-example.component';
import { CardVariantsExampleComponent } from './card-variants-example/card-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const CARD_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'card-appearances',
    title: 'EXAMPLES.CARD.APPEARANCES.TITLE',
    description: 'EXAMPLES.CARD.APPEARANCES.DESCRIPTION',
    component: CardAppearanceExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/card/card-appearance-example/card-appearance-example.component.html',
        TSpath: 'assets/examples/card/card-appearance-example/card-appearance-example.component.ts',
      },
    ],
  },
  {
    id: 'card-variants',
    title: 'EXAMPLES.CARD.VARIANTS.TITLE',
    description: 'EXAMPLES.CARD.VARIANTS.DESCRIPTION',
    component: CardVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/card/card-variants-example/card-variants-example.component.html',
        TSpath: 'assets/examples/card/card-variants-example/card-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'card-sizes',
    title: 'EXAMPLES.CARD.SIZES.TITLE',
    description: 'EXAMPLES.CARD.SIZES.DESCRIPTION',
    component: CardSizeExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/card/card-size-example/card-size-example.component.html',
        TSpath: 'assets/examples/card/card-size-example/card-size-example.component.ts',
      },
    ],
  },
  {
    id: 'card-orientation',
    title: 'EXAMPLES.CARD.ORIENTATION.TITLE',
    description: 'EXAMPLES.CARD.ORIENTATION.DESCRIPTION',
    component: CardOrientationExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/card/card-orientation-example/card-orientation-example.component.html',
        TSpath: 'assets/examples/card/card-orientation-example/card-orientation-example.component.ts',
      },
    ],
  },
  {
    id: 'card-media',
    title: 'EXAMPLES.CARD.MEDIA.TITLE',
    description: 'EXAMPLES.CARD.MEDIA.DESCRIPTION',
    component: CardMediaExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/card/card-media-example/card-media-example.component.html',
        TSpath: 'assets/examples/card/card-media-example/card-media-example.component.ts',
      },
    ],
  },
  {
    id: 'card-clickable',
    title: 'EXAMPLES.CARD.CLICKABLE.TITLE',
    description: 'EXAMPLES.CARD.CLICKABLE.DESCRIPTION',
    component: CardClickableExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/card/card-clickable-example/card-clickable-example.component.html',
        TSpath: 'assets/examples/card/card-clickable-example/card-clickable-example.component.ts',
      },
    ],
  },
  {
    id: 'card-full-composition',
    title: 'EXAMPLES.CARD.FULL_COMPOSITION.TITLE',
    description: 'EXAMPLES.CARD.FULL_COMPOSITION.DESCRIPTION',
    component: CardFullCompositionExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/card/card-full-composition-example/card-full-composition-example.component.html',
        TSpath: 'assets/examples/card/card-full-composition-example/card-full-composition-example.component.ts',
      },
    ],
  },
];
