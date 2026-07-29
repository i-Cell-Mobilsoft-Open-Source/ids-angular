import { AccordionAppearanceExampleComponent } from './accordion-appearance-example/accordion-appearance-example.component';
import { AccordionButtonConfigExampleComponent } from './accordion-button-config-example/accordion-button-config-example.component';
import { AccordionDisabledExampleComponent } from './accordion-disabled-example/accordion-disabled-example.component';
import { AccordionHeadingLevelExampleComponent } from './accordion-heading-level-example/accordion-heading-level-example.component';
import { AccordionIconExampleComponent } from './accordion-icon-example/accordion-icon-example.component';
import { AccordionMultiExampleComponent } from './accordion-multi-example/accordion-multi-example.component';
import { AccordionSizeExampleComponent } from './accordion-size-example/accordion-size-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const ACCORDION_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'accordion-appearance',
    title: 'EXAMPLES.ACCORDION.APPEARANCES.TITLE',
    description: 'EXAMPLES.ACCORDION.APPEARANCES.DESCRIPTION',
    component: AccordionAppearanceExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/accordion/accordion-appearance-example/accordion-appearance-example.component.html',
        TSpath: 'assets/examples/accordion/accordion-appearance-example/accordion-appearance-example.component.ts',
      },
    ],
  },
  {
    id: 'accordion-size',
    title: 'EXAMPLES.ACCORDION.SIZES.TITLE',
    description: 'EXAMPLES.ACCORDION.SIZES.DESCRIPTION',
    component: AccordionSizeExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/accordion/accordion-size-example/accordion-size-example.component.html',
        TSpath: 'assets/examples/accordion/accordion-size-example/accordion-size-example.component.ts',
      },
    ],
  },
  {
    id: 'accordion-disabled',
    title: 'EXAMPLES.ACCORDION.DISABLED.TITLE',
    description: 'EXAMPLES.ACCORDION.DISABLED.DESCRIPTION',
    component: AccordionDisabledExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/accordion/accordion-disabled-example/accordion-disabled-example.component.html',
        TSpath: 'assets/examples/accordion/accordion-disabled-example/accordion-disabled-example.component.ts',
      },
    ],
  },
  {
    id: 'accordion-icon',
    title: 'EXAMPLES.ACCORDION.ICON.TITLE',
    description: 'EXAMPLES.ACCORDION.ICON.DESCRIPTION',
    component: AccordionIconExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/accordion/accordion-icon-example/accordion-icon-example.component.html',
        TSpath: 'assets/examples/accordion/accordion-icon-example/accordion-icon-example.component.ts',
      },
    ],
  },
  {
    id: 'accordion-heading-level',
    title: 'EXAMPLES.ACCORDION.HEADING_LEVEL.TITLE',
    description: 'EXAMPLES.ACCORDION.HEADING_LEVEL.DESCRIPTION',
    component: AccordionHeadingLevelExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/accordion/accordion-heading-level-example/accordion-heading-level-example.component.html',
        TSpath: 'assets/examples/accordion/accordion-heading-level-example/accordion-heading-level-example.component.ts',
      },
    ],
  },
  {
    id: 'accordion-multi',
    title: 'EXAMPLES.ACCORDION.MULTI.TITLE',
    description: 'EXAMPLES.ACCORDION.MULTI.DESCRIPTION',
    component: AccordionMultiExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/accordion/accordion-multi-example/accordion-multi-example.component.html',
        TSpath: 'assets/examples/accordion/accordion-multi-example/accordion-multi-example.component.ts',
      },
    ],
  },
  {
    id: 'accordion-button-config',
    title: 'EXAMPLES.ACCORDION.BUTTON_CONFIG.TITLE',
    description: 'EXAMPLES.ACCORDION.BUTTON_CONFIG.DESCRIPTION',
    component: AccordionButtonConfigExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/accordion/accordion-button-config-example/accordion-button-config-example.component.html',
        TSpath: 'assets/examples/accordion/accordion-button-config-example/accordion-button-config-example.component.ts',
      },
    ],
  },
];
