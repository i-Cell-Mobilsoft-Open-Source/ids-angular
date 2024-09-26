import { IdsSegmentedControlToggleDirective } from './ids-segmented-control-toggle.directive';
import { IdsSegmentedControlToggleItemComponent } from './segmented-control-item/ids-segmented-control-toggle-item.component';

import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

type StoryType = IdsSegmentedControlToggleItemComponent;

export default {
  component: IdsSegmentedControlToggleItemComponent,
  title: 'Components/Segmented Control Toggle Item',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        IdsSegmentedControlToggleDirective,
        FormsModule,
      ],
    }),
  ],
  render: ({ value, ...props }) => ({
    props,
    template: `
          <ids-segmented-control-toggle
            ngModel="Option1"
            name="segmentedControl"
            size="comfortable"
            variant="primary"
            appearance="filled"
          >
            <ids-segmented-control-toggle-item value="${value}" ${argsToTemplate(props)} label="Option 1" />
            <ids-segmented-control-toggle-item value="Option2" label="Option 2" />
            <ids-segmented-control-toggle-item value="Option3" label="Option 3" />
          </ids-segmented-control-toggle>
        `,
  }),
  argTypes: {
    disabled: { control: 'boolean' },
    value: { control: 'text' },
    label: { control: 'text' },
  },
  args: {
    value: 'Option1',
    label: 'Option 1',
  },
} as Meta<StoryType>;

type Story = StoryObj<StoryType>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: Story = {};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Disabled: Story = {
  args: {
    disabled: true,
  },
};
