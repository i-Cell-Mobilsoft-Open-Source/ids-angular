import { AccordionSizeExampleComponent } from './accordion-size-example/accordion-size-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const ACCORDION_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'accordion-size',
    title: 'Accordion sizes',
    description: 'Accordions with different size options (dense, compact, comfortable, spacious).' +
     ' If you don\'t specify whether the trailing icon should appear, it will appear automatically.',
    component: AccordionSizeExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/accordion/accordion-size-example/accordion-size-example.component.html',
        TSpath: 'assets/examples/accordion/accordion-size-example/accordion-size-example.component.ts',
      },
    ],
  },
];
