import { SwitchVariant } from './public-api';
import { IdsSwitchComponent } from './switch.component';
import { SwitchIconPosition, SwitchLabelPosition } from './types/switch-positions';

import { selectControlOptions } from '../.storybook/utils';
import { Size } from '../core';

import { FormsModule } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Meta, StoryObj, moduleMetadata, argsToTemplate, applicationConfig } from '@storybook/angular';

type StoryType = IdsSwitchComponent;

export default {
  component: IdsSwitchComponent,
  title: 'Components/Switch',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [FormsModule],
    }),
    applicationConfig({
      providers: [provideNoopAnimations()],
    }),
  ],
  render: ({ ...props }) => ({
    props,
    template: `
      <ids-switch
        [ngModel]="true"
        ${argsToTemplate(props)}
      >
      </ids-switch>
    `,
  }),
  argTypes: {
    size: selectControlOptions(Size),
    hasIcon: {
      control: 'boolean',
    },
    iconPosition: selectControlOptions(SwitchIconPosition),
    labelPosition: selectControlOptions(SwitchLabelPosition),
    value: {
      control: 'boolean',
    },
    variant: selectControlOptions(SwitchVariant),
  },
  args: {
    id: 'switch-1',
    size: 'comfortable',
    value: true,
    variant: 'surface',
    label: 'Switch Label',
    hasIcon: false,
    iconPosition: 'ontrack',
  },
} as Meta<StoryType>;

type Story = StoryObj<StoryType>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: Story = {};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Light: Story = {
  args: {
    variant: 'light',
  },
  parameters: {
    backgrounds: {
      default: 'dark',
    },
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const WithIcon: Story = {
  args: {
    hasIcon: true,
  },
};
