import { CheckboxGroupBasicExampleComponent } from './checkbox-group-basic-example/checkbox-group-basic-example.component';
import { CheckboxGroupCustomValidatorExampleComponent } from './checkbox-group-custom-validator-example/checkbox-group-custom-validator-example.component';
import { CheckboxGroupOrientationExampleComponent } from './checkbox-group-orientation-example/checkbox-group-orientation-example.component';
import { CheckboxGroupParentExampleComponent } from './checkbox-group-parent-example/checkbox-group-parent-example.component';
import { CheckboxGroupRequiredExampleComponent } from './checkbox-group-required-example/checkbox-group-required-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const CHECKBOX_GROUP_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'checkbox-group-basic',
    title: 'EXAMPLES.CHECKBOX_GROUP.BASIC.TITLE',
    description: 'EXAMPLES.CHECKBOX_GROUP.BASIC.DESCRIPTION',
    component: CheckboxGroupBasicExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/checkbox-group/checkbox-group-basic-example/checkbox-group-basic-example.component.html',
        TSpath: 'assets/examples/checkbox-group/checkbox-group-basic-example/checkbox-group-basic-example.component.ts',
      },
    ],
  },
  {
    id: 'checkbox-group-orientation',
    title: 'EXAMPLES.CHECKBOX_GROUP.ORIENTATION.TITLE',
    description: 'EXAMPLES.CHECKBOX_GROUP.ORIENTATION.DESCRIPTION',
    component: CheckboxGroupOrientationExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/checkbox-group/checkbox-group-orientation-example/checkbox-group-orientation-example.component.html',
        TSpath: 'assets/examples/checkbox-group/checkbox-group-orientation-example/checkbox-group-orientation-example.component.ts',
      },
    ],
  },
  {
    id: 'checkbox-group-parent',
    title: 'EXAMPLES.CHECKBOX_GROUP.PARENT.TITLE',
    description: 'EXAMPLES.CHECKBOX_GROUP.PARENT.DESCRIPTION',
    component: CheckboxGroupParentExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/checkbox-group/checkbox-group-parent-example/checkbox-group-parent-example.component.html',
        TSpath: 'assets/examples/checkbox-group/checkbox-group-parent-example/checkbox-group-parent-example.component.ts',
      },
    ],
  },
  {
    id: 'checkbox-group-required',
    title: 'EXAMPLES.CHECKBOX_GROUP.REQUIRED.TITLE',
    description: 'EXAMPLES.CHECKBOX_GROUP.REQUIRED.DESCRIPTION',
    component: CheckboxGroupRequiredExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/checkbox-group/checkbox-group-required-example/checkbox-group-required-example.component.html',
        TSpath: 'assets/examples/checkbox-group/checkbox-group-required-example/checkbox-group-required-example.component.ts',
      },
    ],
  },
  {
    id: 'checkbox-group-custom-validator',
    title: 'EXAMPLES.CHECKBOX_GROUP.CUSTOM_VALIDATOR.TITLE',
    description: 'EXAMPLES.CHECKBOX_GROUP.CUSTOM_VALIDATOR.DESCRIPTION',
    component: CheckboxGroupCustomValidatorExampleComponent,
    files: [
      {
        HTMLpath:
          'assets/examples/checkbox-group/checkbox-group-custom-validator-example/checkbox-group-custom-validator-example.component.html',
        TSpath:
          'assets/examples/checkbox-group/checkbox-group-custom-validator-example/checkbox-group-custom-validator-example.component.ts',
      },
    ],
  },
];
