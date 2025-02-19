import { IdsRadioGroupDirective } from './radio-group.directive';
import { IdsRadioComponent } from './radio.component';
import { IdsRadioVariant } from './types/radio-variant.type';

import { selectControlOptions } from '../.storybook/utils';
import { IdsOrientation, IdsPosition, IdsSize } from '../core';

import { FormsModule } from '@angular/forms';
import { withActions } from '@storybook/addon-actions/decorator';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

type StoryType = IdsRadioGroupDirective;

export default {
  component: IdsRadioGroupDirective,
  title: 'Components/Radio Group',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        IdsRadioComponent,
        FormsModule,
      ],
    }),
    withActions,
  ],
  parameters: {
    actions: {
      handles: ['click ids-radio'],
    },
  },
  render: ({ disabled, required, size, variant, orientation, labelPosition, ...props }) => ({
    props,
    template: `
          <ids-radio-group
            ngModel='Option1'
            ${disabled ? 'disabled' : ''}
            ${required ? 'required' : ''}
            name='radioGroup'
            size="${size}"
            variant="${variant}"
            orientation="${orientation}"
            labelPosition="${labelPosition}"
            ${argsToTemplate(props)}
          >
            <ids-radio value="Option1">Option 1</ids-radio>
            <ids-radio value="Option2">Option 2</ids-radio>
            <ids-radio value="Option3">Option 3</ids-radio>
          </ids-radio-group>
        `,
  }),
  argTypes: {
    variant: selectControlOptions(IdsRadioVariant),
    size: selectControlOptions(IdsSize),
    orientation: selectControlOptions(IdsOrientation),
    labelPosition: selectControlOptions(IdsPosition),
    disabled: { control: 'boolean' },
    required: { control: 'boolean' },
  },
  args: {
    disabled: false,
    required: false,
    labelPosition: 'right',
    size: 'comfortable',
    orientation: 'vertical',
    variant: 'surface',
  },
} as Meta<StoryType>;

type Story = StoryObj<StoryType>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: Story = {};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Horizontal: Story = {
  args: {
    orientation: 'horizontal',
  },
};
