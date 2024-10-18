import { IdsPaginatorComponent } from './paginator.component';
import { IdsPaginatorPageButtonAppearance } from './types/paginator-appearance.type';
import { IdsPaginatorVariant } from './types/paginator-variant.type';

import { selectControlOptions } from '../.storybook/utils';

import { IdsSize } from '@i-cell/ids-angular/core';
import { withActions } from '@storybook/addon-actions/decorator';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

type StoryType = IdsPaginatorComponent;

export default {
  component: IdsPaginatorComponent,
  title: 'Components/Paginator',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [],
    }),
    withActions,
  ],
  parameters: {
    actions: {
      handles: ['click button'],
    },
  },
  render: ({ ...props }) => ({
    props,
    template: `
        <ids-paginator ${argsToTemplate(props)} />
      `,
  }),
  argTypes: {
    id: {
      control: 'text',
      description: 'Unique identifier for the paginator component.',
    },
    pageSize: {
      control: 'number',
      description: 'The number of items per page.',
    },
    pageSizeOptions: {
      control: 'text',
      description: 'Array of available page size options.',
    },
    showFirstLastButton: {
      control: 'boolean',
      description: 'Whether to show "First" and "Last" buttons in the paginator.',
    },
    showPrevNextLabel: {
      control: 'boolean',
      description: 'Whether to display labels for "Previous" and "Next" buttons.',
    },
    showPageInfo: {
      control: 'boolean',
      description: 'Whether to display page information (e.g., "Page 1 of 10").',
    },
    showPageButtons: {
      control: 'boolean',
      description: 'Whether to display individual page buttons.',
    },
    showAllPages: {
      control: 'boolean',
      description: 'Whether to display all pages in the paginator.',
    },
    maxDisplayedItemCount: {
      control: 'number',
      description: 'The maximum number of items to display in the paginator.',
    },
    variant: selectControlOptions(IdsPaginatorVariant, 'The variant/style of the paginator'),
    size: selectControlOptions(IdsSize, 'The size of the paginator component'),
    pageButtonAppearance: selectControlOptions(IdsPaginatorPageButtonAppearance, 'The appearance of the paginator buttons'),
    length: {
      control: 'number',
      description: 'The total number of items to paginate.',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the paginator is disabled.',
    },
    compactLayout: {
      control: 'boolean',
      description: 'Whether to use a compact layout for the paginator.',
    },
  },
  args: {
    length: 120,
  },
} as Meta<StoryType>;

type Story = StoryObj<StoryType>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: Story = {};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const CompactMode: Story = {
  args: {
    compactLayout: true,
  },
};
