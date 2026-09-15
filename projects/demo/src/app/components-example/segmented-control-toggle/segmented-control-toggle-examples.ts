import { SegmentedControlToggleAppearancesExampleComponent } from './segmented-control-toggle-appearances-example/segmented-control-toggle-appearances-example.component';
import { SegmentedControlToggleBtnVariantsExampleComponent } from './segmented-control-toggle-button-variants-example/segmented-control-toggle-button-variants-example.component';
import { SegmentedControlToggleDisabledExampleComponent } from './segmented-control-toggle-disabled-example/segmented-control-toggle-disabled-example.component';
import { SegmentedControlToggleFormControlExampleComponent } from './segmented-control-toggle-form-control-example/segmented-control-toggle-form-control-example.component';
import { SegmentedControlToggleIconsExampleComponent } from './segmented-control-toggle-icons-example/segmented-control-toggle-icons-example.component';
import { SegmentedControlToggleItemContentExampleComponent } from './segmented-control-toggle-item-content-example/segmented-control-toggle-item-content-example.component';
import { SegmentedControlToggleNgModelExampleComponent } from './segmented-control-toggle-ng-model-example/segmented-control-toggle-ng-model-example.component';
import { SegmentedControlToggleSizesExampleComponent } from './segmented-control-toggle-sizes-example/segmented-control-toggle-sizes-example.component';
import { SegmentedControlToggleVariantsExampleComponent } from './segmented-control-toggle-variants-example/segmented-control-toggle-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

const samplesFolder = 'assets/examples/segmented-control-toggle';

export const SEGMENTED_CONTROL_TOGGLE_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'segmented-control-toggle-variants',
    title: 'EXAMPLES.SEGMENTED_CONTROL_TOGGLE.VARIANTS.TITLE',
    description: 'EXAMPLES.SEGMENTED_CONTROL_TOGGLE.VARIANTS.DESCRIPTION',
    component: SegmentedControlToggleVariantsExampleComponent,
    files: [
      {
        HTMLpath: `${samplesFolder}/segmented-control-toggle-variants-example/segmented-control-toggle-variants-example.component.html`,
        TSpath: `${samplesFolder}/segmented-control-toggle-variants-example/segmented-control-toggle-variants-example.component.ts`,
      },
    ],
  },
  {
    id: 'segmented-control-toggle-button-variants',
    title: 'EXAMPLES.SEGMENTED_CONTROL_TOGGLE.BUTTON_VARIANTS.TITLE',
    description: 'EXAMPLES.SEGMENTED_CONTROL_TOGGLE.BUTTON_VARIANTS.DESCRIPTION',
    component: SegmentedControlToggleBtnVariantsExampleComponent,
    files: [
      {
        HTMLpath:
        `${samplesFolder}/segmented-control-toggle-button-variants-example/segmented-control-toggle-button-variants-example.component.html`,
        TSpath:
        `${samplesFolder}/segmented-control-toggle-button-variants-example/segmented-control-toggle-button-variants-example.component.ts`,
      },
    ],
  },
  {
    id: 'segmented-control-toggle-appearances',
    title: 'EXAMPLES.SEGMENTED_CONTROL_TOGGLE.APPEARANCES.TITLE',
    description: 'EXAMPLES.SEGMENTED_CONTROL_TOGGLE.APPEARANCES.DESCRIPTION',
    component: SegmentedControlToggleAppearancesExampleComponent,
    files: [
      {
        HTMLpath:
        `${samplesFolder}/segmented-control-toggle-appearances-example/segmented-control-toggle-appearances-example.component.html`,
        TSpath:
        `${samplesFolder}/segmented-control-toggle-appearances-example/segmented-control-toggle-appearances-example.component.ts`,
      },
    ],
  },
  {
    id: 'segmented-control-toggle-sizes',
    title: 'EXAMPLES.SEGMENTED_CONTROL_TOGGLE.SIZES.TITLE',
    description: 'EXAMPLES.SEGMENTED_CONTROL_TOGGLE.SIZES.DESCRIPTION',
    component: SegmentedControlToggleSizesExampleComponent,
    files: [
      {
        HTMLpath:
        `${samplesFolder}/segmented-control-toggle-sizes-example/segmented-control-toggle-sizes-example.component.html`,
        TSpath:
        `${samplesFolder}/segmented-control-toggle-sizes-example/segmented-control-toggle-sizes-example.component.ts`,
      },
    ],
  },
  {
    id: 'segmented-control-toggle-icons',
    title: 'EXAMPLES.SEGMENTED_CONTROL_TOGGLE.ICONS.TITLE',
    description: 'EXAMPLES.SEGMENTED_CONTROL_TOGGLE.ICONS.DESCRIPTION',
    component: SegmentedControlToggleIconsExampleComponent,
    files: [
      {
        HTMLpath:
        `${samplesFolder}/segmented-control-toggle-icons-example/segmented-control-toggle-icons-example.component.html`,
        TSpath:
        `${samplesFolder}/segmented-control-toggle-icons-example/segmented-control-toggle-icons-example.component.ts`,
      },
    ],
  },
  {
    id: 'segmented-control-toggle-item-content',
    title: 'EXAMPLES.SEGMENTED_CONTROL_TOGGLE.ITEM_CONTENT.TITLE',
    description: 'EXAMPLES.SEGMENTED_CONTROL_TOGGLE.ITEM_CONTENT.DESCRIPTION',
    component: SegmentedControlToggleItemContentExampleComponent,
    files: [
      {
        HTMLpath:
        `${samplesFolder}/segmented-control-toggle-item-content-example/segmented-control-toggle-item-content-example.component.html`,
        TSpath:
        `${samplesFolder}/segmented-control-toggle-item-content-example/segmented-control-toggle-item-content-example.component.ts`,
      },
    ],
  },
  {
    id: 'segmented-control-toggle-disabled',
    title: 'EXAMPLES.SEGMENTED_CONTROL_TOGGLE.DISABLED.TITLE',
    description: 'EXAMPLES.SEGMENTED_CONTROL_TOGGLE.DISABLED.DESCRIPTION',
    component: SegmentedControlToggleDisabledExampleComponent,
    files: [
      {
        HTMLpath:
        `${samplesFolder}/segmented-control-toggle-disabled-example/segmented-control-toggle-disabled-example.component.html`,
        TSpath:
        `${samplesFolder}/segmented-control-toggle-disabled-example/segmented-control-toggle-disabled-example.component.ts`,
      },
    ],
  },
  {
    id: 'segmented-control-toggle-form-control',
    title: 'EXAMPLES.SEGMENTED_CONTROL_TOGGLE.FORM_CONTROL.TITLE',
    description: 'EXAMPLES.SEGMENTED_CONTROL_TOGGLE.FORM_CONTROL.DESCRIPTION',
    component: SegmentedControlToggleFormControlExampleComponent,
    files: [
      {
        HTMLpath:
        `${samplesFolder}/segmented-control-toggle-form-control-example/segmented-control-toggle-form-control-example.component.html`,
        TSpath:
        `${samplesFolder}/segmented-control-toggle-form-control-example/segmented-control-toggle-form-control-example.component.ts`,
      },
    ],
  },
  {
    id: 'segmented-control-toggle-ng-model',
    title: 'EXAMPLES.SEGMENTED_CONTROL_TOGGLE.NG_MODEL.TITLE',
    description: 'EXAMPLES.SEGMENTED_CONTROL_TOGGLE.NG_MODEL.DESCRIPTION',
    component: SegmentedControlToggleNgModelExampleComponent,
    files: [
      {
        HTMLpath:
        `${samplesFolder}/segmented-control-toggle-ng-model-example/segmented-control-toggle-ng-model-example.component.html`,
        TSpath:
        `${samplesFolder}/segmented-control-toggle-ng-model-example/segmented-control-toggle-ng-model-example.component.ts`,
      },
    ],
  },
];
