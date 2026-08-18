import { ChipAppearanceExampleComponent } from './chip-appearance-example/chip-appearance-example.component';
import { ChipGroupExampleComponent } from './chip-group-example/chip-group-example.component';
import { ChipIconExampleComponent } from './chip-icon-example/chip-icon-example.component';
import { ChipInteractiveExampleComponent } from './chip-interactive-example/chip-interactive-example.component';
import { ChipRemovableExampleComponent } from './chip-removable-example/chip-removable-example.component';
import { ChipSizeExampleComponent } from './chip-size-example/chip-size-example.component';
import { ChipVariantsExampleComponent } from './chip-variants-example/chip-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const CHIP_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'chip-appearances',
    title: 'EXAMPLES.CHIP.APPEARANCES.TITLE',
    description: 'EXAMPLES.CHIP.APPEARANCES.DESCRIPTION',
    component: ChipAppearanceExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/chip/chip-appearance-example/chip-appearance-example.component.html',
        TSpath: 'assets/examples/chip/chip-appearance-example/chip-appearance-example.component.ts',
      },
    ],
  },
  {
    id: 'chip-variants',
    title: 'EXAMPLES.CHIP.VARIANTS.TITLE',
    description: 'EXAMPLES.CHIP.VARIANTS.DESCRIPTION',
    component: ChipVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/chip/chip-variants-example/chip-variants-example.component.html',
        TSpath: 'assets/examples/chip/chip-variants-example/chip-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'chip-sizes',
    title: 'EXAMPLES.CHIP.SIZES.TITLE',
    description: 'EXAMPLES.CHIP.SIZES.DESCRIPTION',
    component: ChipSizeExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/chip/chip-size-example/chip-size-example.component.html',
        TSpath: 'assets/examples/chip/chip-size-example/chip-size-example.component.ts',
      },
    ],
  },
  {
    id: 'chip-interactive',
    title: 'EXAMPLES.CHIP.INTERACTIVE.TITLE',
    description: 'EXAMPLES.CHIP.INTERACTIVE.DESCRIPTION',
    component: ChipInteractiveExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/chip/chip-interactive-example/chip-interactive-example.component.html',
        TSpath: 'assets/examples/chip/chip-interactive-example/chip-interactive-example.component.ts',
      },
    ],
  },
  {
    id: 'chip-icon',
    title: 'EXAMPLES.CHIP.ICONS.TITLE',
    description: 'EXAMPLES.CHIP.ICONS.DESCRIPTION',
    component: ChipIconExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/chip/chip-icon-example/chip-icon-example.component.html',
        TSpath: 'assets/examples/chip/chip-icon-example/chip-icon-example.component.ts',
      },
    ],
  },
  {
    id: 'chip-removable',
    title: 'EXAMPLES.CHIP.REMOVABLE.TITLE',
    description: 'EXAMPLES.CHIP.REMOVABLE.DESCRIPTION',
    component: ChipRemovableExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/chip/chip-removable-example/chip-removable-example.component.html',
        TSpath: 'assets/examples/chip/chip-removable-example/chip-removable-example.component.ts',
      },
    ],
  },
  {
    id: 'chip-group',
    title: 'EXAMPLES.CHIP.CHIP_GROUP.TITLE',
    description: 'EXAMPLES.CHIP.CHIP_GROUP.DESCRIPTION',
    component: ChipGroupExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/chip/chip-group-example/chip-group-example.component.html',
        TSpath: 'assets/examples/chip/chip-group-example/chip-group-example.component.ts',
      },
    ],
  },
];
