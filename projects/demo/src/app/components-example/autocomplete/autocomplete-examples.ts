import { AutocompleteFormControlExampleComponent } from './autocomplete-form-control-example/autocomplete-form-control-example.component';
import { AutocompleteLimitExampleComponent } from './autocomplete-limit-example/autocomplete-limit-example.component';
import { AutocompleteMinCharsExampleComponent } from './autocomplete-min-chars-example/autocomplete-min-chars-example.component';
import { AutocompleteMultiselectExampleComponent } from './autocomplete-multiselect-example/autocomplete-multiselect-example.component';
import { AutocompleteNgModelExampleComponent } from './autocomplete-ng-model-example/autocomplete-ng-model-example.component';
import { AutocompletePreselectedExampleComponent } from './autocomplete-preselected-example/autocomplete-preselected-example.component';
import { AutocompleteSizeExampleComponent } from './autocomplete-size-example/autocomplete-size-example.component';
import { AutocompleteSpinnerVariantExampleComponent } from './autocomplete-spinner-variant-example/autocomplete-spinner-variant-example.component';
import { AutocompleteVariantsExampleComponent } from './autocomplete-variants-example/autocomplete-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const AUTOCOMPLETE_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'autocomplete-variants',
    title: 'EXAMPLES.AUTOCOMPLETE.VARIANTS.TITLE',
    description: 'EXAMPLES.AUTOCOMPLETE.VARIANTS.DESCRIPTION',
    component: AutocompleteVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/autocomplete/autocomplete-variants-example/autocomplete-variants-example.component.html',
        TSpath: 'assets/examples/autocomplete/autocomplete-variants-example/autocomplete-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'autocomplete-sizes',
    title: 'EXAMPLES.AUTOCOMPLETE.SIZES.TITLE',
    description: 'EXAMPLES.AUTOCOMPLETE.SIZES.DESCRIPTION',
    component: AutocompleteSizeExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/autocomplete/autocomplete-size-example/autocomplete-size-example.component.html',
        TSpath: 'assets/examples/autocomplete/autocomplete-size-example/autocomplete-size-example.component.ts',
      },
    ],
  },
  {
    id: 'autocomplete-multiselect',
    title: 'EXAMPLES.AUTOCOMPLETE.MULTISELECT.TITLE',
    description: 'EXAMPLES.AUTOCOMPLETE.MULTISELECT.DESCRIPTION',
    component: AutocompleteMultiselectExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/autocomplete/autocomplete-multiselect-example/autocomplete-multiselect-example.component.html',
        TSpath: 'assets/examples/autocomplete/autocomplete-multiselect-example/autocomplete-multiselect-example.component.ts',
      },
    ],
  },
  {
    id: 'autocomplete-min-chars',
    title: 'EXAMPLES.AUTOCOMPLETE.MIN_CHARS.TITLE',
    description: 'EXAMPLES.AUTOCOMPLETE.MIN_CHARS.DESCRIPTION',
    component: AutocompleteMinCharsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/autocomplete/autocomplete-min-chars-example/autocomplete-min-chars-example.component.html',
        TSpath: 'assets/examples/autocomplete/autocomplete-min-chars-example/autocomplete-min-chars-example.component.ts',
      },
    ],
  },
  {
    id: 'autocomplete-limit',
    title: 'EXAMPLES.AUTOCOMPLETE.LIMIT.TITLE',
    description: 'EXAMPLES.AUTOCOMPLETE.LIMIT.DESCRIPTION',
    component: AutocompleteLimitExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/autocomplete/autocomplete-limit-example/autocomplete-limit-example.component.html',
        TSpath: 'assets/examples/autocomplete/autocomplete-limit-example/autocomplete-limit-example.component.ts',
      },
    ],
  },
  {
    id: 'autocomplete-spinner-variant',
    title: 'EXAMPLES.AUTOCOMPLETE.SPINNER_VARIANT.TITLE',
    description: 'EXAMPLES.AUTOCOMPLETE.SPINNER_VARIANT.DESCRIPTION',
    component: AutocompleteSpinnerVariantExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/autocomplete/autocomplete-spinner-variant-example/autocomplete-spinner-variant-example.component.html',
        TSpath: 'assets/examples/autocomplete/autocomplete-spinner-variant-example/autocomplete-spinner-variant-example.component.ts',
      },
    ],
  },
  {
    id: 'autocomplete-ng-model',
    title: 'EXAMPLES.AUTOCOMPLETE.NG_MODEL.TITLE',
    description: 'EXAMPLES.AUTOCOMPLETE.NG_MODEL.DESCRIPTION',
    component: AutocompleteNgModelExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/autocomplete/autocomplete-ng-model-example/autocomplete-ng-model-example.component.html',
        TSpath: 'assets/examples/autocomplete/autocomplete-ng-model-example/autocomplete-ng-model-example.component.ts',
      },
    ],
  },
  {
    id: 'autocomplete-form-control',
    title: 'EXAMPLES.AUTOCOMPLETE.FORM_CONTROL.TITLE',
    description: 'EXAMPLES.AUTOCOMPLETE.FORM_CONTROL.DESCRIPTION',
    component: AutocompleteFormControlExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/autocomplete/autocomplete-form-control-example/autocomplete-form-control-example.component.html',
        TSpath: 'assets/examples/autocomplete/autocomplete-form-control-example/autocomplete-form-control-example.component.ts',
      },
    ],
  },
  {
    id: 'autocomplete-preselected',
    title: 'EXAMPLES.AUTOCOMPLETE.PRESELECTED.TITLE',
    description: 'EXAMPLES.AUTOCOMPLETE.PRESELECTED.DESCRIPTION',
    component: AutocompletePreselectedExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/autocomplete/autocomplete-preselected-example/autocomplete-preselected-example.component.html',
        TSpath: 'assets/examples/autocomplete/autocomplete-preselected-example/autocomplete-preselected-example.component.ts',
      },
    ],
  },
];
