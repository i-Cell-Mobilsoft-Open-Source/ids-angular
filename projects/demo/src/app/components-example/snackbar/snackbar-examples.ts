import { SnackbarActionsExampleComponent } from './snackbar-actions-example/snackbar-actions-example.component';
import { SnackbarAutoCloseExampleComponent } from './snackbar-auto-close-example/snackbar-auto-close-example.component';
import { SnackbarBasicExampleComponent } from './snackbar-basic-example/snackbar-basic-example.component';
import { SnackbarDefaultConfigExampleComponent } from './snackbar-default-config-example/snackbar-default-config-example.component';
import { SnackbarDismissExampleComponent } from './snackbar-dismiss-example/snackbar-dismiss-example.component';
import { SnackbarMultipleExampleComponent } from './snackbar-multiple-example/snackbar-multiple-example.component';
import { SnackbarPositionExampleComponent } from './snackbar-position-example/snackbar-position-example.component';
import { SnackbarUrgentExampleComponent } from './snackbar-urgent-example/snackbar-urgent-example.component';
import { SnackbarVariantsExampleComponent } from './snackbar-variants-example/snackbar-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const SNACKBAR_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'snackbar-basic',
    title: 'EXAMPLES.SNACKBAR.BASIC.TITLE',
    description: 'EXAMPLES.SNACKBAR.BASIC.DESCRIPTION',
    component: SnackbarBasicExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/snackbar/snackbar-basic-example/snackbar-basic-example.component.html',
        TSpath: 'assets/examples/snackbar/snackbar-basic-example/snackbar-basic-example.component.ts',
      },
    ],
  },
  {
    id: 'snackbar-default-config',
    title: 'EXAMPLES.SNACKBAR.DEFAULT_CONFIG.TITLE',
    description: 'EXAMPLES.SNACKBAR.DEFAULT_CONFIG.DESCRIPTION',
    component: SnackbarDefaultConfigExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/snackbar/snackbar-default-config-example/snackbar-default-config-example.component.html',
        TSpath: 'assets/examples/snackbar/snackbar-default-config-example/snackbar-default-config-example.component.ts',
      },
      {
        HTMLpath: 'assets/examples/snackbar/snackbar-default-config-example/app.config.example.ts',
        TSpath: '',
      },
    ],
  },
  {
    id: 'snackbar-position',
    title: 'EXAMPLES.SNACKBAR.POSITION.TITLE',
    description: 'EXAMPLES.SNACKBAR.POSITION.DESCRIPTION',
    component: SnackbarPositionExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/snackbar/snackbar-position-example/snackbar-position-example.component.html',
        TSpath: 'assets/examples/snackbar/snackbar-position-example/snackbar-position-example.component.ts',
      },
    ],
  },
  {
    id: 'snackbar-variants',
    title: 'EXAMPLES.SNACKBAR.VARIANTS.TITLE',
    description: 'EXAMPLES.SNACKBAR.VARIANTS.DESCRIPTION',
    component: SnackbarVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/snackbar/snackbar-variants-example/snackbar-variants-example.component.html',
        TSpath: 'assets/examples/snackbar/snackbar-variants-example/snackbar-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'snackbar-auto-close',
    title: 'EXAMPLES.SNACKBAR.AUTO_CLOSE.TITLE',
    description: 'EXAMPLES.SNACKBAR.AUTO_CLOSE.DESCRIPTION',
    component: SnackbarAutoCloseExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/snackbar/snackbar-auto-close-example/snackbar-auto-close-example.component.html',
        TSpath: 'assets/examples/snackbar/snackbar-auto-close-example/snackbar-auto-close-example.component.ts',
      },
    ],
  },
  {
    id: 'snackbar-dismiss',
    title: 'EXAMPLES.SNACKBAR.DISMISS.TITLE',
    description: 'EXAMPLES.SNACKBAR.DISMISS.DESCRIPTION',
    component: SnackbarDismissExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/snackbar/snackbar-dismiss-example/snackbar-dismiss-example.component.html',
        TSpath: 'assets/examples/snackbar/snackbar-dismiss-example/snackbar-dismiss-example.component.ts',
      },
    ],
  },
  {
    id: 'snackbar-actions',
    title: 'EXAMPLES.SNACKBAR.ACTIONS.TITLE',
    description: 'EXAMPLES.SNACKBAR.ACTIONS.DESCRIPTION',
    component: SnackbarActionsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/snackbar/snackbar-actions-example/snackbar-actions-example.component.html',
        TSpath: 'assets/examples/snackbar/snackbar-actions-example/snackbar-actions-example.component.ts',
      },
    ],
  },
  {
    id: 'snackbar-urgent',
    title: 'EXAMPLES.SNACKBAR.URGENT.TITLE',
    description: 'EXAMPLES.SNACKBAR.URGENT.DESCRIPTION',
    component: SnackbarUrgentExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/snackbar/snackbar-urgent-example/snackbar-urgent-example.component.html',
        TSpath: 'assets/examples/snackbar/snackbar-urgent-example/snackbar-urgent-example.component.ts',
      },
    ],
  },
  {
    id: 'snackbar-multiple',
    title: 'EXAMPLES.SNACKBAR.MULTIPLE.TITLE',
    description: 'EXAMPLES.SNACKBAR.MULTIPLE.DESCRIPTION',
    component: SnackbarMultipleExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/snackbar/snackbar-multiple-example/snackbar-multiple-example.component.html',
        TSpath: 'assets/examples/snackbar/snackbar-multiple-example/snackbar-multiple-example.component.ts',
      },
    ],
  },
];
