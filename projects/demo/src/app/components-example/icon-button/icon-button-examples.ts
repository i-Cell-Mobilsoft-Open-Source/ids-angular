import { IconButtonAppearanceExampleComponent } from './icon-button-appearance-example/icon-button-appearance-example.component';
import { IconButtonDisabledExampleComponent } from './icon-button-disabled-example/icon-button-disabled-example.component';
import { IconButtonLinkExampleComponent } from './icon-button-link-example/icon-button-link-example.component';
import { IconButtonSizeExampleComponent } from './icon-button-size-example/icon-button-size-example.component';
import { IconButtonVariantsExampleComponent } from './icon-button-variants-example/icon-button-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const ICON_BUTTON_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'icon-button-appearances',
    title: 'EXAMPLES.ICON_BUTTON.APPEARANCES.TITLE',
    description: 'EXAMPLES.ICON_BUTTON.APPEARANCES.DESCRIPTION',
    component: IconButtonAppearanceExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/icon-button/icon-button-appearance-example/icon-button-appearance-example.component.html',
        TSpath: 'assets/examples/icon-button/icon-button-appearance-example/icon-button-appearance-example.component.ts',
      },
    ],
  },
  {
    id: 'icon-button-variants',
    title: 'EXAMPLES.ICON_BUTTON.VARIANTS.TITLE',
    description: 'EXAMPLES.ICON_BUTTON.VARIANTS.DESCRIPTION',
    component: IconButtonVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/icon-button/icon-button-variants-example/icon-button-variants-example.component.html',
        TSpath: 'assets/examples/icon-button/icon-button-variants-example/icon-button-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'icon-button-sizes',
    title: 'EXAMPLES.ICON_BUTTON.SIZES.TITLE',
    description: 'EXAMPLES.ICON_BUTTON.SIZES.DESCRIPTION',
    component: IconButtonSizeExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/icon-button/icon-button-size-example/icon-button-size-example.component.html',
        TSpath: 'assets/examples/icon-button/icon-button-size-example/icon-button-size-example.component.ts',
      },
    ],
  },
  {
    id: 'icon-button-links',
    title: 'EXAMPLES.ICON_BUTTON.LINKS.TITLE',
    description: 'EXAMPLES.ICON_BUTTON.LINKS.DESCRIPTION',
    component: IconButtonLinkExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/icon-button/icon-button-link-example/icon-button-link-example.component.html',
        TSpath: 'assets/examples/icon-button/icon-button-link-example/icon-button-link-example.component.ts',
      },
    ],
  },
  {
    id: 'icon-button-disabled',
    title: 'EXAMPLES.ICON_BUTTON.DISABLED.TITLE',
    description: 'EXAMPLES.ICON_BUTTON.DISABLED.DESCRIPTION',
    component: IconButtonDisabledExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/icon-button/icon-button-disabled-example/icon-button-disabled-example.component.html',
        TSpath: 'assets/examples/icon-button/icon-button-disabled-example/icon-button-disabled-example.component.ts',
      },
    ],
  },
];
