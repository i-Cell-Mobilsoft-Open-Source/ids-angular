import { MessageErrorExampleComponent } from './message-error-example/message-error-example.component';
import { MessageHintExampleComponent } from './message-hint-example/message-hint-example.component';
import { MessageSizesExampleComponent } from './message-sizes-example/message-sizes-example.component';
import { MessageSuccessExampleComponent } from './message-success-example/message-success-example.component';
import { MessageSuffixExampleComponent } from './message-suffix-example/message-suffix-example.component';
import { MessageValidationExampleComponent } from './message-validation-example/message-validation-example.component';
import { MessageVariantsExampleComponent } from './message-variants-example/message-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const MESSAGE_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'message-hint',
    title: 'EXAMPLES.MESSAGE.HINT.TITLE',
    description: 'EXAMPLES.MESSAGE.HINT.DESCRIPTION',
    component: MessageHintExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/message/message-hint-example/message-hint-example.component.html',
        TSpath: 'assets/examples/message/message-hint-example/message-hint-example.component.ts',
      },
    ],
  },
  {
    id: 'message-success',
    title: 'EXAMPLES.MESSAGE.SUCCESS.TITLE',
    description: 'EXAMPLES.MESSAGE.SUCCESS.DESCRIPTION',
    component: MessageSuccessExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/message/message-success-example/message-success-example.component.html',
        TSpath: 'assets/examples/message/message-success-example/message-success-example.component.ts',
      },
    ],
  },
  {
    id: 'message-error',
    title: 'EXAMPLES.MESSAGE.ERROR.TITLE',
    description: 'EXAMPLES.MESSAGE.ERROR.DESCRIPTION',
    component: MessageErrorExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/message/message-error-example/message-error-example.component.html',
        TSpath: 'assets/examples/message/message-error-example/message-error-example.component.ts',
      },
    ],
  },
  {
    id: 'message-suffix',
    title: 'EXAMPLES.MESSAGE.SUFFIX.TITLE',
    description: 'EXAMPLES.MESSAGE.SUFFIX.DESCRIPTION',
    component: MessageSuffixExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/message/message-suffix-example/message-suffix-example.component.html',
        TSpath: 'assets/examples/message/message-suffix-example/message-suffix-example.component.ts',
      },
    ],
  },
  {
    id: 'message-sizes',
    title: 'EXAMPLES.MESSAGE.SIZES.TITLE',
    description: 'EXAMPLES.MESSAGE.SIZES.DESCRIPTION',
    component: MessageSizesExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/message/message-sizes-example/message-sizes-example.component.html',
        TSpath: 'assets/examples/message/message-sizes-example/message-sizes-example.component.ts',
      },
    ],
  },
  {
    id: 'message-variants',
    title: 'EXAMPLES.MESSAGE.VARIANTS.TITLE',
    description: 'EXAMPLES.MESSAGE.VARIANTS.DESCRIPTION',
    component: MessageVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/message/message-variants-example/message-variants-example.component.html',
        TSpath: 'assets/examples/message/message-variants-example/message-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'message-validation',
    title: 'EXAMPLES.MESSAGE.VALIDATION.TITLE',
    description: 'EXAMPLES.MESSAGE.VALIDATION.DESCRIPTION',
    component: MessageValidationExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/message/message-validation-example/message-validation-example.component.html',
        TSpath: 'assets/examples/message/message-validation-example/message-validation-example.component.ts',
      },
    ],
  },
];
