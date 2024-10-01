import { IdsSegmentedControlItemComponent } from './segmented-control-item/segmented-control-item.component';
import { IdsSegmentedControlDirective } from './segmented-control.directive';

import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

type StoryType = IdsSegmentedControlItemComponent;

export default {
  component: IdsSegmentedControlItemComponent,
  title: 'Components/Segmented Control Item',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        IdsSegmentedControlDirective,
        FormsModule,
      ],
    }),
  ],
  render: ({ value, ...props }) => ({
    props,
    template: `
          <ids-segmented-control
            ngModel="Option1"
            name="segmentedControl"
            size="comfortable"
            variant="primary"
            appearance="filled"
            [multiSelect]="false"
          >
            <ids-segmented-control-item value="${value}" ${argsToTemplate(props)} label="Option 1"></ids-segmented-control-item>
            <ids-segmented-control-item value="Option2" label="Option 2"></ids-segmented-control-item>
            <ids-segmented-control-item value="Option3" label="Option 3"></ids-segmented-control-item>
          </ids-segmented-control>
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
