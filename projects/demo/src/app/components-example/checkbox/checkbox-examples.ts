import { CheckboxDisabledExampleComponent } from './checkbox-disabled-example/checkbox-disabled-example.component';
import { CheckboxFormControlExampleComponent } from './checkbox-form-control-example/checkbox-form-control-example.component';
import { CheckboxFormControlNameExampleComponent } from './checkbox-form-control-name-example/checkbox-form-control-name-example.component';
import { CheckboxHintExampleComponent } from './checkbox-hint-example/checkbox-hint-example.component';
import { CheckboxNgModelExampleComponent } from './checkbox-ng-model-example/checkbox-ng-model-example.component';
import { CheckboxSizeExampleComponent } from './checkbox-size-example/checkbox-size-example.component';
import { CheckboxStatesExampleComponent } from './checkbox-states-example/checkbox-states-example.component';
import { CheckboxVariantsExampleComponent } from './checkbox-variants-example/checkbox-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const CHECKBOX_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'checkbox-variants',
    title: 'EXAMPLES.CHECKBOX.VARIANTS.TITLE',
    description: 'EXAMPLES.CHECKBOX.VARIANTS.DESCRIPTION',
    component: CheckboxVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/checkbox/checkbox-variants-example/checkbox-variants-example.component.html',
        TSpath: 'assets/examples/checkbox/checkbox-variants-example/checkbox-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'checkbox-sizes',
    title: 'EXAMPLES.CHECKBOX.SIZES.TITLE',
    description: 'EXAMPLES.CHECKBOX.SIZES.DESCRIPTION',
    component: CheckboxSizeExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/checkbox/checkbox-size-example/checkbox-size-example.component.html',
        TSpath: 'assets/examples/checkbox/checkbox-size-example/checkbox-size-example.component.ts',
      },
    ],
  },
  {
    id: 'checkbox-states',
    title: 'EXAMPLES.CHECKBOX.STATES.TITLE',
    description: 'EXAMPLES.CHECKBOX.STATES.DESCRIPTION',
    component: CheckboxStatesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/checkbox/checkbox-states-example/checkbox-states-example.component.html',
        TSpath: 'assets/examples/checkbox/checkbox-states-example/checkbox-states-example.component.ts',
      },
    ],
  },
  {
    id: 'checkbox-disabled',
    title: 'EXAMPLES.CHECKBOX.DISABLED.TITLE',
    description: 'EXAMPLES.CHECKBOX.DISABLED.DESCRIPTION',
    component: CheckboxDisabledExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/checkbox/checkbox-disabled-example/checkbox-disabled-example.component.html',
        TSpath: 'assets/examples/checkbox/checkbox-disabled-example/checkbox-disabled-example.component.ts',
      },
    ],
  },
  {
    id: 'checkbox-hint',
    title: 'EXAMPLES.CHECKBOX.HINT.TITLE',
    description: 'EXAMPLES.CHECKBOX.HINT.DESCRIPTION',
    component: CheckboxHintExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/checkbox/checkbox-hint-example/checkbox-hint-example.component.html',
        TSpath: 'assets/examples/checkbox/checkbox-hint-example/checkbox-hint-example.component.ts',
      },
    ],
  },
  {
    id: 'checkbox-ng-model',
    title: 'EXAMPLES.CHECKBOX.NG_MODEL.TITLE',
    description: 'EXAMPLES.CHECKBOX.NG_MODEL.DESCRIPTION',
    component: CheckboxNgModelExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/checkbox/checkbox-ng-model-example/checkbox-ng-model-example.component.html',
        TSpath: 'assets/examples/checkbox/checkbox-ng-model-example/checkbox-ng-model-example.component.ts',
      },
    ],
  },
  {
    id: 'checkbox-form-control',
    title: 'EXAMPLES.CHECKBOX.FORM_CONTROL.TITLE',
    description: 'EXAMPLES.CHECKBOX.FORM_CONTROL.DESCRIPTION',
    component: CheckboxFormControlExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/checkbox/checkbox-form-control-example/checkbox-form-control-example.component.html',
        TSpath: 'assets/examples/checkbox/checkbox-form-control-example/checkbox-form-control-example.component.ts',
      },
    ],
  },
  {
    id: 'checkbox-form-control-name',
    title: 'EXAMPLES.CHECKBOX.FORM_CONTROL_NAME.TITLE',
    description: 'EXAMPLES.CHECKBOX.FORM_CONTROL_NAME.DESCRIPTION',
    component: CheckboxFormControlNameExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/checkbox/checkbox-form-control-name-example/checkbox-form-control-name-example.component.html',
        TSpath: 'assets/examples/checkbox/checkbox-form-control-name-example/checkbox-form-control-name-example.component.ts',
      },
    ],
  },
];
