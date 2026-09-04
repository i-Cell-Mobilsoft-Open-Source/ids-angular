import { FormFieldInputAdornmentsExampleComponent } from './form-field-input-adornments-example/form-field-input-adornments-example.component';
import { FormFieldInputFormControlExampleComponent } from './form-field-input-form-control-example/form-field-input-form-control-example.component';
import { FormFieldInputNgModelExampleComponent } from './form-field-input-ng-model-example/form-field-input-ng-model-example.component';
import { FormFieldInputSizeExampleComponent } from './form-field-input-size-example/form-field-input-size-example.component';
import { FormFieldInputVariantsExampleComponent } from './form-field-input-variants-example/form-field-input-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

const examplesFolder = 'assets/examples/form-field-input';

export const FORM_FIELD_INPUT_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'form-field-input-variants',
    title: 'EXAMPLES.FORM_FIELD_INPUT.VARIANTS.TITLE',
    description: 'EXAMPLES.FORM_FIELD_INPUT.VARIANTS.DESCRIPTION',
    component: FormFieldInputVariantsExampleComponent,
    files: [
      {
        HTMLpath: `${examplesFolder}/form-field-input-variants-example/form-field-input-variants-example.component.html`,
        TSpath: `${examplesFolder}/form-field-input-variants-example/form-field-input-variants-example.component.ts`,
      },
    ],
  },
  {
    id: 'form-field-input-sizes',
    title: 'EXAMPLES.FORM_FIELD_INPUT.SIZES.TITLE',
    description: 'EXAMPLES.FORM_FIELD_INPUT.SIZES.DESCRIPTION',
    component: FormFieldInputSizeExampleComponent,
    files: [
      {
        HTMLpath: `${examplesFolder}/form-field-input-size-example/form-field-input-size-example.component.html`,
        TSpath: `${examplesFolder}/form-field-input-size-example/form-field-input-size-example.component.ts`,
      },
    ],
  },
  {
    id: 'form-field-input-adornments',
    title: 'EXAMPLES.FORM_FIELD_INPUT.ADORNMENTS.TITLE',
    description: 'EXAMPLES.FORM_FIELD_INPUT.ADORNMENTS.DESCRIPTION',
    component: FormFieldInputAdornmentsExampleComponent,
    files: [
      {
        HTMLpath: `${examplesFolder}/form-field-input-adornments-example/form-field-input-adornments-example.component.html`,
        TSpath: `${examplesFolder}/form-field-input-adornments-example/form-field-input-adornments-example.component.ts`,
      },
    ],
  },
  {
    id: 'form-field-input-ng-model',
    title: 'EXAMPLES.FORM_FIELD_INPUT.NG_MODEL.TITLE',
    description: 'EXAMPLES.FORM_FIELD_INPUT.NG_MODEL.DESCRIPTION',
    component: FormFieldInputNgModelExampleComponent,
    files: [
      {
        HTMLpath: `${examplesFolder}/form-field-input-ng-model-example/form-field-input-ng-model-example.component.html`,
        TSpath: `${examplesFolder}/form-field-input-ng-model-example/form-field-input-ng-model-example.component.ts`,
      },
    ],
  },
  {
    id: 'form-field-input-form-control',
    title: 'EXAMPLES.FORM_FIELD_INPUT.FORM_CONTROL.TITLE',
    description: 'EXAMPLES.FORM_FIELD_INPUT.FORM_CONTROL.DESCRIPTION',
    component: FormFieldInputFormControlExampleComponent,
    files: [
      {
        HTMLpath: `${examplesFolder}/form-field-input-form-control-example/form-field-input-form-control-example.component.html`,
        TSpath: `${examplesFolder}/form-field-input-form-control-example/form-field-input-form-control-example.component.ts`,
      },
    ],
  },
];
