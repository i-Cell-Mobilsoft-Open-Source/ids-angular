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
    title: 'Accordion appearances',
    description: 'Accordions with the two available appearances: filled and text.',
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
    title: 'Accordion sizes',
    description:
      'Accordions with different size options (dense, compact, comfortable, spacious).' +
      ' If you don\'t specify whether the trailing icon should appear, it will appear automatically.',
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
    title: 'Disabled accordion / items',
    description: 'An individual accordion item can be disabled, or the whole accordion can be disabled at once.',
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
    title: 'Accordion icons',
    description: 'Accordion items can show a leading icon, a trailing icon (chevron), both, or neither.',
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
    title: 'Accordion heading level',
    description: 'Set the semantic heading level rendered for each accordion item summary, useful for keeping a correct document outline.',
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
    title: 'Multiple expanded items',
    description:
      'By default only one accordion item can be open at a time.' +
      ' Set the "multi" input to allow multiple items to be expanded simultaneously.',
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
    title: 'Expand/collapse button configuration',
    description: 'Customize the appearance, variant, size and labels of the built-in expand all / collapse all buttons.',
    component: AccordionButtonConfigExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/accordion/accordion-button-config-example/accordion-button-config-example.component.html',
        TSpath: 'assets/examples/accordion/accordion-button-config-example/accordion-button-config-example.component.ts',
      },
    ],
  },
];
