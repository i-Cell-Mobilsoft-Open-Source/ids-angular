import { IdsCheckboxComponent } from './checkbox.component';
import { CheckboxVariant } from './types/checkbox-variant.type';

import { selectControlOptions } from '../.storybook/utils';

import { FormsModule } from '@angular/forms';
import { Size } from '@i-cell/ids-angular/core';
import { IdsHintMessageComponent } from '@i-cell/ids-angular/forms';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

type StoryType = IdsCheckboxComponent & { label?: string, hint?: string, prefixIcon?: boolean, suffixIcon?: boolean };

export default {
  component: IdsCheckboxComponent,
  title: 'Components/Checkbox',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        FormsModule,
        IdsHintMessageComponent,
      ],
    }),
  ],
  render: ({ label, hint, ...props }) => (
    {
      props,
      template: `
        <ids-checkbox ngModel ${argsToTemplate(props)}>
          ${label}
          ${hint ? `<ids-hint-message>${hint}</ids-hint-message>` : ''}
        </ids-checkbox>
      `,
    }
  ),
  argTypes: {
    size: selectControlOptions(Size),
    variant: selectControlOptions(CheckboxVariant),
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    required: { control: 'boolean' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text', description: 'Projected label text for the checkbox' },
    hint: { control: 'text', description: 'Projected hint text for the checkbox' },
  },
  args: {
    label: 'Checkbox label',
    id: 'idsCheckbox',
    name: 'idsCheckbox',
  },
} as Meta<StoryType>;

type Story = StoryObj<StoryType>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: Story = {};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Indeterminate: Story = {
  args: {
    indeterminate: true,
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const WithHint: Story = {
  name: 'With hint',
  args: {
    hint: 'Hint',
  },
};
