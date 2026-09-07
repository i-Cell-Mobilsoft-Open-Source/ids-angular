import { DialogCloseButtonExampleComponent } from './dialog-close-button-example/dialog-close-button-example.component';
import { DialogCustomHeaderExampleComponent } from './dialog-custom-header-example/dialog-custom-header-example.component';
import { DialogInjectionTokenExampleComponent } from './dialog-injection-token-example/dialog-injection-token-example.component';
import { DialogInputResultExampleComponent } from './dialog-input-result-example/dialog-input-result-example.component';
import { DialogLongContentExampleComponent } from './dialog-long-content-example/dialog-long-content-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const DIALOG_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'dialog-close-button',
    title: 'EXAMPLES.DIALOG.CLOSE_BUTTON.TITLE',
    description: 'EXAMPLES.DIALOG.CLOSE_BUTTON.DESCRIPTION',
    component: DialogCloseButtonExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/dialog/dialog-close-button-example/dialog-close-button-example.component.html',
        TSpath: 'assets/examples/dialog/dialog-close-button-example/dialog-close-button-example.component.ts',
      },
    ],
  },
  {
    id: 'dialog-custom-header',
    title: 'EXAMPLES.DIALOG.CUSTOM_HEADER.TITLE',
    description: 'EXAMPLES.DIALOG.CUSTOM_HEADER.DESCRIPTION',
    component: DialogCustomHeaderExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/dialog/dialog-custom-header-example/dialog-custom-header-example.component.html',
        TSpath: 'assets/examples/dialog/dialog-custom-header-example/dialog-custom-header-example.component.ts',
      },
      {
        HTMLpath: 'assets/examples/dialog/dialog-custom-header-example/dialog-custom-header-dynamic-dialog.component.html',
        TSpath: '',
      },
    ],
  },
  {
    id: 'dialog-long-content',
    title: 'EXAMPLES.DIALOG.LONG_CONTENT.TITLE',
    description: 'EXAMPLES.DIALOG.LONG_CONTENT.DESCRIPTION',
    component: DialogLongContentExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/dialog/dialog-long-content-example/dialog-long-content-example.component.html',
        TSpath: 'assets/examples/dialog/dialog-long-content-example/dialog-long-content-example.component.ts',
      },
      {
        HTMLpath: 'assets/examples/dialog/dialog-long-content-example/dialog-long-content-dynamic-dialog.component.html',
        TSpath: '',
      },
    ],
  },
  {
    id: 'dialog-input-result',
    title: 'EXAMPLES.DIALOG.INPUT_RESULT.TITLE',
    description: 'EXAMPLES.DIALOG.INPUT_RESULT.DESCRIPTION',
    component: DialogInputResultExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/dialog/dialog-input-result-example/dialog-input-result-example.component.html',
        TSpath: 'assets/examples/dialog/dialog-input-result-example/dialog-input-result-example.component.ts',
      },
      {
        HTMLpath: 'assets/examples/dialog/dialog-input-result-example/dialog-input-result-dynamic-dialog.component.html',
        TSpath: '',
      },
    ],
  },
  {
    id: 'dialog-injection-token',
    title: 'EXAMPLES.DIALOG.INJECTION_TOKEN.TITLE',
    description: 'EXAMPLES.DIALOG.INJECTION_TOKEN.DESCRIPTION',
    component: DialogInjectionTokenExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/dialog/dialog-injection-token-example/dialog-injection-token-example.component.html',
        TSpath: 'assets/examples/dialog/dialog-injection-token-example/dialog-injection-token-example.component.ts',
      },
      {
        HTMLpath: 'assets/examples/dialog/dialog-injection-token-example/dialog-injection-token-dynamic-dialog.component.html',
        TSpath: '',
      },
    ],
  },
];
