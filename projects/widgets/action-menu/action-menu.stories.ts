import { IdsActionMenuTriggerDirective } from './action-menu-trigger.directive';

import { IdsButtonComponent } from '@i-cell/ids-angular/button';
import { IdsMenuItemComponent } from '@i-cell/ids-angular/menu-item';
import { IdsOverlayPanelComponent } from '@i-cell/ids-angular/overlay-panel';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

export default {
  title: 'Components/Action menu',
  tags: ['autodocs'],
  parameters: {
    a11y: {
      disable: true,
    },
    actions: {
      disable: true,
    },
    controls: {
      disable: true,
    },
  },
  decorators: [
    moduleMetadata({
      imports: [
        IdsMenuItemComponent,
        IdsActionMenuTriggerDirective,
        IdsOverlayPanelComponent,
        IdsButtonComponent,
      ],
    }),
  ],
  render: (props) => ({
    props,
    template: `
        <button
          type="button"
          idsButton
          appearance="filled"
          size="comfortable"
          variant="primary"
          [idsActionMenuTriggerFor]="actionMenu"
        >
          Open action menu
        </button>
        <ng-template #actionMenu>
          <ids-overlay-panel size="compact" appearance="outlined">
            <button idsMenuItem appearance="filled" size="comfortable" label="Menu item 1"></button>
            <button idsMenuItem appearance="filled" size="comfortable" label="Menu item 2"></button>
            <button idsMenuItem appearance="filled" size="comfortable" label="Menu item 3"></button>
            <button idsMenuItem appearance="filled" size="comfortable" label="Menu item 4"></button>
            <button idsMenuItem appearance="filled" size="comfortable" label="Menu item 5"></button>
          </ids-overlay-panel>
        </ng-template>
      `,
  }),
} as Meta;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: StoryObj = {
  name: 'Button trigger',
};
