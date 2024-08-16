import { IdsActionItemComponent } from '@i-cell/ids-angular/action-item';
import { IdsActionMenuTriggerDirective } from '@i-cell/ids-angular/action-menu';
import { IdsActionPanelComponent } from '@i-cell/ids-angular/action-panel';
import { IdsButtonComponent } from '@i-cell/ids-angular/button';
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
        IdsActionItemComponent,
        IdsActionMenuTriggerDirective,
        IdsActionPanelComponent,
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
          <ids-action-panel size="compact" appearance="outlined">
            <button idsActionItem appearance="filled" size="comfortable" label="Menu item 1"></button>
            <button idsActionItem appearance="filled" size="comfortable" label="Menu item 2"></button>
            <button idsActionItem appearance="filled" size="comfortable" label="Menu item 3"></button>
            <button idsActionItem appearance="filled" size="comfortable" label="Menu item 4"></button>
            <button idsActionItem appearance="filled" size="comfortable" label="Menu item 5"></button>
          </ids-action-panel>
        </ng-template>
      `,
  }),
} as Meta;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: StoryObj = {
  name: 'Button trigger',
};
