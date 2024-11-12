import { IdsRadioGroupDirective } from './radio-group.directive';
import { IdsRadioComponent } from './radio.component';

import { FormsModule } from '@angular/forms';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

type StoryType = IdsRadioComponent;

export default {
  component: IdsRadioComponent,
  title: 'Components/Radio',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        IdsRadioGroupDirective,
        FormsModule,
      ],
    }),
  ],
  render: ({ value, ...props }) => ({
    props,
    template: `
          <ids-radio-group
            ngModel='Option1'
            name='radioGroup'
            size="comfortable"
            variant="surface"
            orientation="vertical"
            labelPosition="right"
          >
            <ids-radio value="${value}" ${argsToTemplate(props)}>Option 1</ids-radio>
            <ids-radio value="Option2">Option 2</ids-radio>
            <ids-radio value="Option3">Option 3</ids-radio>
          </ids-radio-group>
        `,
  }),
  argTypes: {
    disabled: { control: 'boolean' },
    value: { control: 'text' },
  },
  args: {
    value: 'Option1',
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

