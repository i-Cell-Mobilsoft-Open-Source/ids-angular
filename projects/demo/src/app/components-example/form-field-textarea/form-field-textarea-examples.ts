import { FormFieldTextareaFormControlExampleComponent } from './form-field-textarea-form-control-example/form-field-textarea-form-control-example.component';
import { FormFieldTextareaSizeExampleComponent } from './form-field-textarea-size-example/form-field-textarea-size-example.component';
import { FormFieldTextareaValidationExampleComponent } from './form-field-textarea-validation-example/form-field-textarea-validation-example.component';
import { FormFieldTextareaVariantsExampleComponent } from './form-field-textarea-variants-example/form-field-textarea-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

const examplesFolder = 'assets/examples/form-field-textarea';

export const FORM_FIELD_TEXTAREA_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'form-field-textarea-variants',
    title: 'EXAMPLES.FORM_FIELD_TEXTAREA.VARIANTS.TITLE',
    description: 'EXAMPLES.FORM_FIELD_TEXTAREA.VARIANTS.DESCRIPTION',
    component: FormFieldTextareaVariantsExampleComponent,
    files: [
      {
        HTMLpath: `${examplesFolder}/form-field-textarea-variants-example/form-field-textarea-variants-example.component.html`,
        TSpath: `${examplesFolder}/form-field-textarea-variants-example/form-field-textarea-variants-example.component.ts`,
      },
    ],
  },
  {
    id: 'form-field-textarea-sizes',
    title: 'EXAMPLES.FORM_FIELD_TEXTAREA.SIZES.TITLE',
    description: 'EXAMPLES.FORM_FIELD_TEXTAREA.SIZES.DESCRIPTION',
    component: FormFieldTextareaSizeExampleComponent,
    files: [
      {
        HTMLpath: `${examplesFolder}/form-field-textarea-size-example/form-field-textarea-size-example.component.html`,
        TSpath: `${examplesFolder}/form-field-textarea-size-example/form-field-textarea-size-example.component.ts`,
      },
    ],
  },
  {
    id: 'form-field-textarea-form-control',
    title: 'EXAMPLES.FORM_FIELD_TEXTAREA.FORM_CONTROL.TITLE',
    description: 'EXAMPLES.FORM_FIELD_TEXTAREA.FORM_CONTROL.DESCRIPTION',
    component: FormFieldTextareaFormControlExampleComponent,
    files: [
      {
        HTMLpath: `${examplesFolder}/form-field-textarea-form-control-example/form-field-textarea-form-control-example.component.html`,
        TSpath: `${examplesFolder}/form-field-textarea-form-control-example/form-field-textarea-form-control-example.component.ts`,
      },
    ],
  },
  {
    id: 'form-field-textarea-validation',
    title: 'EXAMPLES.FORM_FIELD_TEXTAREA.VALIDATION.TITLE',
    description: 'EXAMPLES.FORM_FIELD_TEXTAREA.VALIDATION.DESCRIPTION',
    component: FormFieldTextareaValidationExampleComponent,
    files: [
      {
        HTMLpath: `${examplesFolder}/form-field-textarea-validation-example/form-field-textarea-validation-example.component.html`,
        TSpath: `${examplesFolder}/form-field-textarea-validation-example/form-field-textarea-validation-example.component.ts`,
      },
    ],
  },
];
