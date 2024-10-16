import { IdsButtonComponent } from './button.component';
import { IdsButtonAppearance } from './types/button-appearance.type';

import { selectControlOptions } from '../.storybook/utils';

import { coerceBooleanAttribute, IdsAllVariants, IdsSize } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { withActions } from '@storybook/addon-actions/decorator';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

type StoryType = IdsButtonComponent & { label?: string, prefixIcon?: boolean, suffixIcon?: boolean };

export default {
  component: IdsButtonComponent,
  title: 'Components/Button',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [IdsIconComponent],
    }),
    withActions,
  ],
  parameters: {
    actions: {
      handles: ['click button[idsButton]'],
    },
  },
  render: ({ label, prefixIcon, suffixIcon, disabled, ...props }) => {
    const isDisabled = coerceBooleanAttribute(disabled);
    const hasPrefixIcon = coerceBooleanAttribute(prefixIcon);
    const hasSuffixIcon = coerceBooleanAttribute(suffixIcon);

    return {
      props,
      template: `
        <button
          type="button"
          idsButton
          ${isDisabled ? 'disabled' : ''}
          ${argsToTemplate(props)}
        >
          ${hasPrefixIcon ? '<ids-icon icon-leading fontIcon="search" />' : ''}
          ${label}
          ${hasSuffixIcon ? '<ids-icon icon-trailing fontIcon="check" />' : ''}
        </button>
      `,
    };
  },
  argTypes: {
    appearance: selectControlOptions(IdsButtonAppearance),
    size: selectControlOptions(IdsSize),
    variant: selectControlOptions(IdsAllVariants),
    disabled: { control: 'boolean' },
    label: { control: 'text', description: 'Projected label text for the button' },
    prefixIcon: { control: 'boolean', description: 'Projected prefix icon for the button' },
    suffixIcon: { control: 'boolean', description: 'Projected suffix icon for the button' },
  },
  args: {
    label: 'Label',
    prefixIcon: false,
    suffixIcon: false,
  },
} as Meta<StoryType>;

type Story = StoryObj<StoryType>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Filled: Story = {};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Outlined: Story = {
  args: {
    appearance: 'outlined',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Plain: Story = {
  args: {
    appearance: 'text',
  },
};
