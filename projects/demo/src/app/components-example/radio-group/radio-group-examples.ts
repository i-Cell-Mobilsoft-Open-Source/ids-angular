import { RadioGroupLabelHintExampleComponent } from './radio-group-label-hint-example/radio-group-label-hint-example.component';
import { RadioGroupLabelPositionExampleComponent } from './radio-group-label-position-example/radio-group-label-position-example.component';
import { RadioGroupOrientationExampleComponent } from './radio-group-orientation-example/radio-group-orientation-example.component';
import { RadioGroupRequiredAttributeExampleComponent } from './radio-group-required-attribute-example/radio-group-required-attribute-example.component';
import { RadioGroupRequiredValidatorExampleComponent } from './radio-group-required-validator-example/radio-group-required-validator-example.component';
import { RadioGroupSizesExampleComponent } from './radio-group-sizes-example/radio-group-sizes-example.component';
import { RadioGroupVariantsExampleComponent } from './radio-group-variants-example/radio-group-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const RADIO_GROUP_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'radio-group-variants',
    title: 'EXAMPLES.RADIO_GROUP.VARIANTS.TITLE',
    description: 'EXAMPLES.RADIO_GROUP.VARIANTS.DESCRIPTION',
    component: RadioGroupVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/radio-group/radio-group-variants-example/radio-group-variants-example.component.html',
        TSpath: 'assets/examples/radio-group/radio-group-variants-example/radio-group-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'radio-group-sizes',
    title: 'EXAMPLES.RADIO_GROUP.SIZES.TITLE',
    description: 'EXAMPLES.RADIO_GROUP.SIZES.DESCRIPTION',
    component: RadioGroupSizesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/radio-group/radio-group-sizes-example/radio-group-sizes-example.component.html',
        TSpath: 'assets/examples/radio-group/radio-group-sizes-example/radio-group-sizes-example.component.ts',
      },
    ],
  },
  {
    id: 'radio-group-orientation',
    title: 'EXAMPLES.RADIO_GROUP.ORIENTATION.TITLE',
    description: 'EXAMPLES.RADIO_GROUP.ORIENTATION.DESCRIPTION',
    component: RadioGroupOrientationExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/radio-group/radio-group-orientation-example/radio-group-orientation-example.component.html',
        TSpath: 'assets/examples/radio-group/radio-group-orientation-example/radio-group-orientation-example.component.ts',
      },
    ],
  },
  {
    id: 'radio-group-label-position',
    title: 'EXAMPLES.RADIO_GROUP.LABEL_POSITION.TITLE',
    description: 'EXAMPLES.RADIO_GROUP.LABEL_POSITION.DESCRIPTION',
    component: RadioGroupLabelPositionExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/radio-group/radio-group-label-position-example/radio-group-label-position-example.component.html',
        TSpath: 'assets/examples/radio-group/radio-group-label-position-example/radio-group-label-position-example.component.ts',
      },
    ],
  },
  {
    id: 'radio-group-required-validator',
    title: 'EXAMPLES.RADIO_GROUP.REQUIRED_VALIDATOR.TITLE',
    description: 'EXAMPLES.RADIO_GROUP.REQUIRED_VALIDATOR.DESCRIPTION',
    component: RadioGroupRequiredValidatorExampleComponent,
    files: [
      {
        HTMLpath:
        'assets/examples/radio-group/radio-group-required-validator-example/radio-group-required-validator-example.component.html',
        TSpath: 'assets/examples/radio-group/radio-group-required-validator-example/radio-group-required-validator-example.component.ts',
      },
    ],
  },
  {
    id: 'radio-group-required-attribute',
    title: 'EXAMPLES.RADIO_GROUP.REQUIRED_ATTRIBUTE.TITLE',
    description: 'EXAMPLES.RADIO_GROUP.REQUIRED_ATTRIBUTE.DESCRIPTION',
    component: RadioGroupRequiredAttributeExampleComponent,
    files: [
      {
        HTMLpath:
        'assets/examples/radio-group/radio-group-required-attribute-example/radio-group-required-attribute-example.component.html',
        TSpath: 'assets/examples/radio-group/radio-group-required-attribute-example/radio-group-required-attribute-example.component.ts',
      },
    ],
  },
  {
    id: 'radio-group-label-hint',
    title: 'EXAMPLES.RADIO_GROUP.LABEL_HINT.TITLE',
    description: 'EXAMPLES.RADIO_GROUP.LABEL_HINT.DESCRIPTION',
    component: RadioGroupLabelHintExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/radio-group/radio-group-label-hint-example/radio-group-label-hint-example.component.html',
        TSpath: 'assets/examples/radio-group/radio-group-label-hint-example/radio-group-label-hint-example.component.ts',
      },
    ],
  },
];
