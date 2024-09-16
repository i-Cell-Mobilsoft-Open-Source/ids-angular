import { IdsIconButtonComponent } from './ids-icon-button.component';
import { IconButtonAppearance } from './types/ids-icon-button-appearance';

import { selectControlOptions } from '../.storybook/utils';

import { coerceBooleanAttribute, AllVariants, Size } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { mdiMagnify } from '@mdi/js';
import { withActions } from '@storybook/addon-actions/decorator';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

type StoryType = IdsIconButtonComponent;

export default {
  component: IdsIconButtonComponent,
  title: 'Components/Icon Button',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [IdsIconComponent],
    }),
    withActions,
  ],
  parameters: {
    actions: {
      handles: ['click button[idsIconButton]'],
    },
  },
  render: ({ disabled, ...props }) => {
    const isDisabled = coerceBooleanAttribute(disabled);

    return {
      props,
      template: `
        <button
          type="button"
          idsIconButton
          ${isDisabled ? 'disabled' : ''}
          ${argsToTemplate(props)}
        >
          <ids-icon icon="${mdiMagnify}" aria-hidden="true" alt="" />
        </button>
      `,
    };
  },
  argTypes: {
    appearance: selectControlOptions(IconButtonAppearance, 'The appearance style of the icon button'),
    size: selectControlOptions(Size, 'The size of the icon button component'),
    variant: selectControlOptions(AllVariants, 'The variant/style of the icon button'),
    disabled: { control: 'boolean', description: 'Determines if the icon button is disabled' },
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
export const Standard: Story = {
  args: {
    appearance: 'standard',
  },
};
