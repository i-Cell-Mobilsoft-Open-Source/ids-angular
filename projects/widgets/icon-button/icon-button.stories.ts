import { IdsIconButtonComponent } from './icon-button.component';
import { IdsIconButtonAppearance } from './types/icon-button-appearance.type';

import { selectControlOptions } from '../.storybook/utils';

import { coerceBooleanAttribute, IdsAllVariants, IdsSize } from '@i-cell/ids-angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
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
          <ids-icon fontIcon="search" aria-hidden="true" alt="" />
        </button>
      `,
    };
  },
  argTypes: {
    appearance: selectControlOptions(IdsIconButtonAppearance, 'The appearance style of the icon button'),
    size: selectControlOptions(IdsSize, 'The size of the icon button component'),
    variant: selectControlOptions(IdsAllVariants, 'The variant/style of the icon button'),
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
