import { TooltipDisabledExampleComponent } from './tooltip-disabled-example/tooltip-disabled-example.component';
import { TooltipPointerExampleComponent } from './tooltip-pointer-example/tooltip-pointer-example.component';
import { TooltipPositionsExampleComponent } from './tooltip-positions-example/tooltip-positions-example.component';
import { TooltipSizesExampleComponent } from './tooltip-sizes-example/tooltip-sizes-example.component';
import { TooltipTextAlignExampleComponent } from './tooltip-text-align-example/tooltip-text-align-example.component';
import { TooltipVariantsExampleComponent } from './tooltip-variants-example/tooltip-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const TOOLTIP_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'tooltip-variants',
    title: 'EXAMPLES.TOOLTIP.VARIANTS.TITLE',
    description: 'EXAMPLES.TOOLTIP.VARIANTS.DESCRIPTION',
    component: TooltipVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/tooltip/tooltip-variants-example/tooltip-variants-example.component.html',
        TSpath: 'assets/examples/tooltip/tooltip-variants-example/tooltip-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'tooltip-sizes',
    title: 'EXAMPLES.TOOLTIP.SIZES.TITLE',
    description: 'EXAMPLES.TOOLTIP.SIZES.DESCRIPTION',
    component: TooltipSizesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/tooltip/tooltip-sizes-example/tooltip-sizes-example.component.html',
        TSpath: 'assets/examples/tooltip/tooltip-sizes-example/tooltip-sizes-example.component.ts',
      },
    ],
  },
  {
    id: 'tooltip-positions',
    title: 'EXAMPLES.TOOLTIP.POSITIONS.TITLE',
    description: 'EXAMPLES.TOOLTIP.POSITIONS.DESCRIPTION',
    component: TooltipPositionsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/tooltip/tooltip-positions-example/tooltip-positions-example.component.html',
        TSpath: 'assets/examples/tooltip/tooltip-positions-example/tooltip-positions-example.component.ts',
      },
    ],
  },
  {
    id: 'tooltip-text-align',
    title: 'EXAMPLES.TOOLTIP.TEXT_ALIGN.TITLE',
    description: 'EXAMPLES.TOOLTIP.TEXT_ALIGN.DESCRIPTION',
    component: TooltipTextAlignExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/tooltip/tooltip-text-align-example/tooltip-text-align-example.component.html',
        TSpath: 'assets/examples/tooltip/tooltip-text-align-example/tooltip-text-align-example.component.ts',
      },
    ],
  },
  {
    id: 'tooltip-pointer',
    title: 'EXAMPLES.TOOLTIP.POINTER.TITLE',
    description: 'EXAMPLES.TOOLTIP.POINTER.DESCRIPTION',
    component: TooltipPointerExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/tooltip/tooltip-pointer-example/tooltip-pointer-example.component.html',
        TSpath: 'assets/examples/tooltip/tooltip-pointer-example/tooltip-pointer-example.component.ts',
      },
    ],
  },
  {
    id: 'tooltip-disabled',
    title: 'EXAMPLES.TOOLTIP.DISABLED.TITLE',
    description: 'EXAMPLES.TOOLTIP.DISABLED.DESCRIPTION',
    component: TooltipDisabledExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/tooltip/tooltip-disabled-example/tooltip-disabled-example.component.html',
        TSpath: 'assets/examples/tooltip/tooltip-disabled-example/tooltip-disabled-example.component.ts',
      },
    ],
  },
];
