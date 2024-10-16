import { IdsSwitchGroupComponent } from './switch-group.component';
import { IdsSwitchComponent } from './switch.component';
import { IdsSwitchIconPosition, IdsSwitchLabelPosition } from './types/switch-positions.type';

import { selectControlOptions } from '../.storybook/utils';
import { IdsSize } from '../core';

import { FormsModule } from '@angular/forms';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { Meta, StoryObj, argsToTemplate, moduleMetadata, applicationConfig } from '@storybook/angular';

type StoryType = IdsSwitchGroupComponent;

export default {
  component: IdsSwitchGroupComponent,
  title: 'Components/Switch Group',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        IdsSwitchComponent,
        FormsModule,
      ],
    }),
    applicationConfig({
      providers: [provideNoopAnimations()],
    }),
  ],
  render: ({ ...props }) => ({
    props,
    template: `
      <ids-switch-group
        ${argsToTemplate(props)}
      >
        <ids-switch label="One" [ngModel]="true" variant="surface" />
        <ids-switch label="Two" [ngModel]="true" variant="surface" />
        <ids-switch label="Three" [ngModel]="true" variant="surface" />
      </ids-switch-group>
    `,
  }),
  argTypes: {
    size: selectControlOptions(IdsSize),
    hasIcon: {
      control: 'boolean',
    },
    iconPosition: selectControlOptions(IdsSwitchIconPosition),
    labelPosition: selectControlOptions(IdsSwitchLabelPosition),
  },
  args: {
    id: 'switch-group-1',
    size: 'comfortable',
    hasIcon: false,
    iconPosition: 'onhandle',
    labelPosition: 'right',
  },
} as Meta<StoryType>;

type Story = StoryObj<StoryType>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: Story = {};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const WithIcon: Story = {
  args: {
    hasIcon: true,
    iconPosition: 'ontrack',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const IconPositionOnTrack: Story = {
  args: {
    hasIcon: true,
    iconPosition: 'ontrack',
  },
};

