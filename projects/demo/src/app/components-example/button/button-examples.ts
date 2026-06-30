import { ButtonAppearanceExampleComponent } from './button-appearance-example/button-appearance-example.component';
import { ButtonGroupExampleComponent } from './button-group-example/button-group-example.component';
import { ButtonIconExampleComponent } from './button-icon-example/button-icon-example.component';
import { ButtonLinkExampleComponent } from './button-link-example/button-link-example.component';
import { ButtonSizeExampleComponent } from './button-size-example/button-size-example.component';
import { ButtonVariantsExampleComponent } from './button-variants-example/button-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const BUTTON_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'button-basic',
    title: 'EXAMPLES.BUTTON.APPEARANCES.TITLE',
    description: 'EXAMPLES.BUTTON.APPEARANCES.DESCRIPTION',
    component: ButtonAppearanceExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/button/button-appearance-example/button-appearance-example.component.html',
        TSpath: 'assets/examples/button/button-appearance-example/button-appearance-example.component.ts',
      },
    ],
  },
  {
    id: 'button-variants',
    title: 'EXAMPLES.BUTTON.VARIANTS.TITLE',
    description: 'EXAMPLES.BUTTON.VARIANTS.DESCRIPTION',
    component: ButtonVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/button/button-variants-example/button-variants-example.component.html',
        TSpath: 'assets/examples/button/button-variants-example/button-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'button-sizes',
    title: 'EXAMPLES.BUTTON.SIZES.TITLE',
    description: 'EXAMPLES.BUTTON.SIZES.DESCRIPTION',
    component: ButtonSizeExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/button/button-size-example/button-size-example.component.html',
        TSpath: 'assets/examples/button/button-size-example/button-size-example.component.ts',
      },
    ],
  },
  {
    id: 'button-link',
    title: 'EXAMPLES.BUTTON.LINKS.TITLE',
    description: 'EXAMPLES.BUTTON.LINKS.DESCRIPTION',
    component: ButtonLinkExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/button/button-link-example/button-link-example.component.html',
        TSpath: 'assets/examples/button/button-link-example/button-link-example.component.ts',
      },
    ],
  },
  {
    id: 'button-icon',
    title: 'EXAMPLES.BUTTON.ICONS.TITLE',
    description: 'EXAMPLES.BUTTON.ICONS.DESCRIPTION',
    component: ButtonIconExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/button/button-icon-example/button-icon-example.component.html',
        TSpath: 'assets/examples/button/button-icon-example/button-icon-example.component.ts',
      },
    ],
  },
  {
    id: 'button-group',
    title: 'EXAMPLES.BUTTON.BUTTON_GROUP.TITLE',
    description: 'EXAMPLES.BUTTON.BUTTON_GROUP.DESCRIPTION',
    component: ButtonGroupExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/button/button-group-example/button-group-example.component.html',
        TSpath: 'assets/examples/button/button-group-example/button-group-example.component.ts',
      },
    ],
  },
];
