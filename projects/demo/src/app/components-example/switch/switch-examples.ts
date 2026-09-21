import { SwitchDisabledExampleComponent } from './switch-disabled-example/switch-disabled-example.component';
import { SwitchGroupExampleComponent } from './switch-group-example/switch-group-example.component';
import { SwitchIconsExampleComponent } from './switch-icons-example/switch-icons-example.component';
import { SwitchLabelPositionExampleComponent } from './switch-label-position-example/switch-label-position-example.component';
import { SwitchSizesExampleComponent } from './switch-sizes-example/switch-sizes-example.component';
import { SwitchStatesExampleComponent } from './switch-states-example/switch-states-example.component';
import { SwitchVariantsExampleComponent } from './switch-variants-example/switch-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const SWITCH_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'switch-variants',
    title: 'EXAMPLES.SWITCH.VARIANTS.TITLE',
    description: 'EXAMPLES.SWITCH.VARIANTS.DESCRIPTION',
    component: SwitchVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/switch/switch-variants-example/switch-variants-example.component.html',
        TSpath: 'assets/examples/switch/switch-variants-example/switch-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'switch-sizes',
    title: 'EXAMPLES.SWITCH.SIZES.TITLE',
    description: 'EXAMPLES.SWITCH.SIZES.DESCRIPTION',
    component: SwitchSizesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/switch/switch-sizes-example/switch-sizes-example.component.html',
        TSpath: 'assets/examples/switch/switch-sizes-example/switch-sizes-example.component.ts',
      },
    ],
  },
  {
    id: 'switch-label-position',
    title: 'EXAMPLES.SWITCH.LABEL_POSITION.TITLE',
    description: 'EXAMPLES.SWITCH.LABEL_POSITION.DESCRIPTION',
    component: SwitchLabelPositionExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/switch/switch-label-position-example/switch-label-position-example.component.html',
        TSpath: 'assets/examples/switch/switch-label-position-example/switch-label-position-example.component.ts',
      },
    ],
  },
  {
    id: 'switch-icons',
    title: 'EXAMPLES.SWITCH.ICONS.TITLE',
    description: 'EXAMPLES.SWITCH.ICONS.DESCRIPTION',
    component: SwitchIconsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/switch/switch-icons-example/switch-icons-example.component.html',
        TSpath: 'assets/examples/switch/switch-icons-example/switch-icons-example.component.ts',
      },
    ],
  },
  {
    id: 'switch-states',
    title: 'EXAMPLES.SWITCH.STATES.TITLE',
    description: 'EXAMPLES.SWITCH.STATES.DESCRIPTION',
    component: SwitchStatesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/switch/switch-states-example/switch-states-example.component.html',
        TSpath: 'assets/examples/switch/switch-states-example/switch-states-example.component.ts',
      },
    ],
  },
  {
    id: 'switch-disabled',
    title: 'EXAMPLES.SWITCH.DISABLED.TITLE',
    description: 'EXAMPLES.SWITCH.DISABLED.DESCRIPTION',
    component: SwitchDisabledExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/switch/switch-disabled-example/switch-disabled-example.component.html',
        TSpath: 'assets/examples/switch/switch-disabled-example/switch-disabled-example.component.ts',
      },
    ],
  },
  {
    id: 'switch-group',
    title: 'EXAMPLES.SWITCH.GROUP.TITLE',
    description: 'EXAMPLES.SWITCH.GROUP.DESCRIPTION',
    component: SwitchGroupExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/switch/switch-group-example/switch-group-example.component.html',
        TSpath: 'assets/examples/switch/switch-group-example/switch-group-example.component.ts',
      },
    ],
  },
];
