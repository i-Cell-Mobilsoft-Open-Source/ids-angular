import { IdsActionPanelComponent } from './action-panel.component';
import { ActionPanelAppearance } from './types/action-panel-appearance';

import { selectControlOptions } from '../.storybook/utils';

import { Size } from '@i-cell/ids-angular/core';
import { IdsMenuItemComponent } from '@i-cell/ids-angular/menu-item';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

type StoryType = IdsActionPanelComponent & { summary?: string, content?: string };

export default {
  component: IdsActionPanelComponent,
  title: 'Components/Action panel',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [IdsMenuItemComponent],
    }),
  ],
  render: (props) => ({
    props,
    template: `
        <ids-action-panel ${argsToTemplate(props)}>
          <button idsMenuItem appearance="filled" size="comfortable" label="Menu item 1"></button>
          <button idsMenuItem appearance="filled" size="comfortable" label="Menu item 2"></button>
          <button idsMenuItem appearance="filled" size="comfortable" label="Menu item 3"></button>
          <button idsMenuItem appearance="filled" size="comfortable" label="Menu item 4"></button>
          <button idsMenuItem appearance="filled" size="comfortable" label="Menu item 5"></button>
        </ids-action-panel>
      `,
  }),
  argTypes: {
    appearance: selectControlOptions(ActionPanelAppearance),
    size: selectControlOptions(Size),
    variant: selectControlOptions({ light: 'light' }),
  },
} as Meta<StoryType>;

type Story = StoryObj<StoryType>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Filled: Story = {};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Outlined: Story = {
  args: {
    appearance: ActionPanelAppearance.OUTLINED,
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Elevated: Story = {
  args: {
    appearance: ActionPanelAppearance.ELEVATED,
  },
};
