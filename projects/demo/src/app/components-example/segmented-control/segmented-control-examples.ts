import { SegmentedControlDisabledExampleComponent } from './segmented-control-disabled-example/segmented-control-disabled-example.component';
import { SegmentedControlFormControlExampleComponent } from './segmented-control-form-control-example/segmented-control-form-control-example.component';
import { SegmentedControlIconsExampleComponent } from './segmented-control-icons-example/segmented-control-icons-example.component';
import { SegmentedControlMultiSelectExampleComponent } from './segmented-control-multi-select-example/segmented-control-multi-select-example.component';
import { SegmentedControlNgModelExampleComponent } from './segmented-control-ng-model-example/segmented-control-ng-model-example.component';
import { SegmentedControlSizesExampleComponent } from './segmented-control-sizes-example/segmented-control-sizes-example.component';
import { SegmentedControlVariantsExampleComponent } from './segmented-control-variants-example/segmented-control-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const SEGMENTED_CONTROL_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'segmented-control-variants',
    title: 'EXAMPLES.SEGMENTED_CONTROL.VARIANTS.TITLE',
    description: 'EXAMPLES.SEGMENTED_CONTROL.VARIANTS.DESCRIPTION',
    component: SegmentedControlVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/segmented-control/segmented-control-variants-example/segmented-control-variants-example.component.html',
        TSpath: 'assets/examples/segmented-control/segmented-control-variants-example/segmented-control-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'segmented-control-sizes',
    title: 'EXAMPLES.SEGMENTED_CONTROL.SIZES.TITLE',
    description: 'EXAMPLES.SEGMENTED_CONTROL.SIZES.DESCRIPTION',
    component: SegmentedControlSizesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/segmented-control/segmented-control-sizes-example/segmented-control-sizes-example.component.html',
        TSpath: 'assets/examples/segmented-control/segmented-control-sizes-example/segmented-control-sizes-example.component.ts',
      },
    ],
  },
  {
    id: 'segmented-control-multi-select',
    title: 'EXAMPLES.SEGMENTED_CONTROL.MULTI_SELECT.TITLE',
    description: 'EXAMPLES.SEGMENTED_CONTROL.MULTI_SELECT.DESCRIPTION',
    component: SegmentedControlMultiSelectExampleComponent,
    files: [
      {
        HTMLpath:
        'assets/examples/segmented-control/segmented-control-multi-select-example/segmented-control-multi-select-example.component.html',
        TSpath:
        'assets/examples/segmented-control/segmented-control-multi-select-example/segmented-control-multi-select-example.component.ts',
      },
    ],
  },
  {
    id: 'segmented-control-icons',
    title: 'EXAMPLES.SEGMENTED_CONTROL.ICONS.TITLE',
    description: 'EXAMPLES.SEGMENTED_CONTROL.ICONS.DESCRIPTION',
    component: SegmentedControlIconsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/segmented-control/segmented-control-icons-example/segmented-control-icons-example.component.html',
        TSpath: 'assets/examples/segmented-control/segmented-control-icons-example/segmented-control-icons-example.component.ts',
      },
    ],
  },
  {
    id: 'segmented-control-disabled',
    title: 'EXAMPLES.SEGMENTED_CONTROL.DISABLED.TITLE',
    description: 'EXAMPLES.SEGMENTED_CONTROL.DISABLED.DESCRIPTION',
    component: SegmentedControlDisabledExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/segmented-control/segmented-control-disabled-example/segmented-control-disabled-example.component.html',
        TSpath: 'assets/examples/segmented-control/segmented-control-disabled-example/segmented-control-disabled-example.component.ts',
      },
    ],
  },
  {
    id: 'segmented-control-form-control',
    title: 'EXAMPLES.SEGMENTED_CONTROL.FORM_CONTROL.TITLE',
    description: 'EXAMPLES.SEGMENTED_CONTROL.FORM_CONTROL.DESCRIPTION',
    component: SegmentedControlFormControlExampleComponent,
    files: [
      {
        HTMLpath:
        'assets/examples/segmented-control/segmented-control-form-control-example/segmented-control-form-control-example.component.html',
        TSpath:
        'assets/examples/segmented-control/segmented-control-form-control-example/segmented-control-form-control-example.component.ts',
      },
    ],
  },
  {
    id: 'segmented-control-ng-model',
    title: 'EXAMPLES.SEGMENTED_CONTROL.NG_MODEL.TITLE',
    description: 'EXAMPLES.SEGMENTED_CONTROL.NG_MODEL.DESCRIPTION',
    component: SegmentedControlNgModelExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/segmented-control/segmented-control-ng-model-example/segmented-control-ng-model-example.component.html',
        TSpath: 'assets/examples/segmented-control/segmented-control-ng-model-example/segmented-control-ng-model-example.component.ts',
      },
    ],
  },
];
