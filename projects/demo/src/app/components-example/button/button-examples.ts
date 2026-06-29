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
    title: 'Basic buttons',
    description: 'The three button appearances: filled, outlined, and text.',
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
    title: 'Button variants',
    description: 'Filled buttons with different color variants.',
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
    title: 'Button sizes',
    description: 'Buttons with different size options.',
    component: ButtonSizeExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/button/button-size-example/button-size-example.component.html',
        TSpath: 'assets/examples/button/button-size-example/button-size-example.component.ts',
      },
    ],
  },
  {
    id: 'button-disabled',
    title: 'Link button',
    description: 'A button styled as a link.',
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
    title: 'Button with icons',
    description: 'Buttons with leading and trailing icons.',
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
    title: 'Button group',
    description: 'A group of buttons with different appearances and variants.',
    component: ButtonGroupExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/button/button-group-example/button-group-example.component.html',
        TSpath: 'assets/examples/button/button-group-example/button-group-example.component.ts',
      },
    ],
  },
];
