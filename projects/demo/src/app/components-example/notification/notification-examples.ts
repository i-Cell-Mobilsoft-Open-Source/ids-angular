import { NotificationActionButtonsExampleComponent } from './notification-action-buttons-example/notification-action-buttons-example.component';
import { NotificationAppearanceExampleComponent } from './notification-appearance-example/notification-appearance-example.component';
import { NotificationBottomActionStylesExampleComponent } from './notification-bottom-action-styles-example/notification-bottom-action-styles-example.component';
import { NotificationComplexExampleComponent } from './notification-complex-example/notification-complex-example.component';
import { NotificationVariantsExampleComponent } from './notification-variants-example/notification-variants-example.component';

import { IdsExampleDef } from '../../shared/ids-example-viewer/ids-example.model';

export const NOTIFICATION_EXAMPLES: IdsExampleDef[] = [
  {
    id: 'notification-variants',
    title: 'EXAMPLES.NOTIFICATION.VARIANTS.TITLE',
    description: 'EXAMPLES.NOTIFICATION.VARIANTS.DESCRIPTION',
    component: NotificationVariantsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/notification/notification-variants-example/notification-variants-example.component.html',
        TSpath: 'assets/examples/notification/notification-variants-example/notification-variants-example.component.ts',
      },
    ],
  },
  {
    id: 'notification-appearance',
    title: 'EXAMPLES.NOTIFICATION.APPEARANCES.TITLE',
    description: 'EXAMPLES.NOTIFICATION.APPEARANCES.DESCRIPTION',
    component: NotificationAppearanceExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/notification/notification-appearance-example/notification-appearance-example.component.html',
        TSpath: 'assets/examples/notification/notification-appearance-example/notification-appearance-example.component.ts',
      },
    ],
  },
  {
    id: 'notification-complex',
    title: 'EXAMPLES.NOTIFICATION.ICONS.TITLE',
    description: 'EXAMPLES.NOTIFICATION.ICONS.DESCRIPTION',
    component: NotificationComplexExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/notification/notification-complex-example/notification-complex-example.component.html',
        TSpath: 'assets/examples/notification/notification-complex-example/notification-complex-example.component.ts',
      },
    ],
  },
  {
    id: 'notification-action-buttons',
    title: 'EXAMPLES.NOTIFICATION.ACTION_BUTTONS.TITLE',
    description: 'EXAMPLES.NOTIFICATION.ACTION_BUTTONS.DESCRIPTION',
    component: NotificationActionButtonsExampleComponent,
    files: [
      {
        HTMLpath: 'assets/examples/notification/notification-action-buttons-example/notification-action-buttons-example.component.html',
        TSpath: 'assets/examples/notification/notification-action-buttons-example/notification-action-buttons-example.component.ts',
      },
    ],
  },
  {
    id: 'notification-bottom-action-styles',
    title: 'EXAMPLES.NOTIFICATION.BOTTOM_ACTION_STYLES.TITLE',
    description: 'EXAMPLES.NOTIFICATION.BOTTOM_ACTION_STYLES.DESCRIPTION',
    component: NotificationBottomActionStylesExampleComponent,
    files: [
      {
        HTMLpath:
        'assets/examples/notification/notification-bottom-action-styles-example/notification-bottom-action-styles-example.component.html',
        TSpath:
        'assets/examples/notification/notification-bottom-action-styles-example/notification-bottom-action-styles-example.component.ts',
      },
    ],
  },
];
