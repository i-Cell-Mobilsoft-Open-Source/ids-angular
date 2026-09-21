import { SelectCustomTriggerExampleComponent } from './select-custom-trigger-example/select-custom-trigger-example.component';
import { SelectDisabledExampleComponent } from './select-disabled-example/select-disabled-example.component';
import { SelectFormControlExampleComponent } from './select-form-control-example/select-form-control-example.component';
import { SelectMultiselectExampleComponent } from './select-multiselect-example/select-multiselect-example.component';
import { SelectNgModelExampleComponent } from './select-ng-model-example/select-ng-model-example.component';
import { SelectPreselectedExampleComponent } from './select-preselected-example/select-preselected-example.component';
import { SelectSizesExampleComponent } from './select-sizes-example/select-sizes-example.component';
import { SelectSuccessStateExampleComponent } from './select-success-state-example/select-success-state-example.component';
import { SelectVariantsExampleComponent } from './select-variants-example/select-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const SELECT_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'select-variants',
    title: 'EXAMPLES.SELECT.VARIANTS.TITLE',
    description: 'EXAMPLES.SELECT.VARIANTS.DESCRIPTION',
    component: SelectVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/select/select-variants-example/select-variants-example.component.html',
        TSpath: 'assets/examples/select/select-variants-example/select-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'select-sizes',
    title: 'EXAMPLES.SELECT.SIZES.TITLE',
    description: 'EXAMPLES.SELECT.SIZES.DESCRIPTION',
    component: SelectSizesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/select/select-sizes-example/select-sizes-example.component.html',
        TSpath: 'assets/examples/select/select-sizes-example/select-sizes-example.component.ts',
      },
    ],
  },
  {
    id: 'select-multiselect',
    title: 'EXAMPLES.SELECT.MULTISELECT.TITLE',
    description: 'EXAMPLES.SELECT.MULTISELECT.DESCRIPTION',
    component: SelectMultiselectExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/select/select-multiselect-example/select-multiselect-example.component.html',
        TSpath: 'assets/examples/select/select-multiselect-example/select-multiselect-example.component.ts',
      },
    ],
  },
  {
    id: 'select-custom-trigger',
    title: 'EXAMPLES.SELECT.CUSTOM_TRIGGER.TITLE',
    description: 'EXAMPLES.SELECT.CUSTOM_TRIGGER.DESCRIPTION',
    component: SelectCustomTriggerExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/select/select-custom-trigger-example/select-custom-trigger-example.component.html',
        TSpath: 'assets/examples/select/select-custom-trigger-example/select-custom-trigger-example.component.ts',
      },
    ],
  },
  {
    id: 'select-disabled',
    title: 'EXAMPLES.SELECT.DISABLED.TITLE',
    description: 'EXAMPLES.SELECT.DISABLED.DESCRIPTION',
    component: SelectDisabledExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/select/select-disabled-example/select-disabled-example.component.html',
        TSpath: 'assets/examples/select/select-disabled-example/select-disabled-example.component.ts',
      },
    ],
  },
  {
    id: 'select-ng-model',
    title: 'EXAMPLES.SELECT.NG_MODEL.TITLE',
    description: 'EXAMPLES.SELECT.NG_MODEL.DESCRIPTION',
    component: SelectNgModelExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/select/select-ng-model-example/select-ng-model-example.component.html',
        TSpath: 'assets/examples/select/select-ng-model-example/select-ng-model-example.component.ts',
      },
    ],
  },
  {
    id: 'select-form-control',
    title: 'EXAMPLES.SELECT.FORM_CONTROL.TITLE',
    description: 'EXAMPLES.SELECT.FORM_CONTROL.DESCRIPTION',
    component: SelectFormControlExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/select/select-form-control-example/select-form-control-example.component.html',
        TSpath: 'assets/examples/select/select-form-control-example/select-form-control-example.component.ts',
      },
    ],
  },
  {
    id: 'select-success-state',
    title: 'EXAMPLES.SELECT.SUCCESS_STATE.TITLE',
    description: 'EXAMPLES.SELECT.SUCCESS_STATE.DESCRIPTION',
    component: SelectSuccessStateExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/select/select-success-state-example/select-success-state-example.component.html',
        TSpath: 'assets/examples/select/select-success-state-example/select-success-state-example.component.ts',
      },
    ],
  },
  {
    id: 'select-preselected',
    title: 'EXAMPLES.SELECT.PRESELECTED.TITLE',
    description: 'EXAMPLES.SELECT.PRESELECTED.DESCRIPTION',
    component: SelectPreselectedExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/select/select-preselected-example/select-preselected-example.component.html',
        TSpath: 'assets/examples/select/select-preselected-example/select-preselected-example.component.ts',
      },
    ],
  },
];
