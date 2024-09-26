import { IdsRadioGroupDirective } from './ids-radio-group.directive';
import { IdsRadioItemComponent } from './ids-radio-item/ids-radio-item.component';
import { RadioVariant } from './public-api';

import { selectControlOptions } from '../.storybook/utils';
import { Orientation, Position, Size } from '../core';

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
        IdsRadioItemComponent,
        FormsModule,
      ],
    }),
    withActions,
  ],
  parameters: {
    actions: {
      handles: ['click ids-radio-item'],
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
            <ids-radio-item value="Option1">Option 1</ids-radio-item>
            <ids-radio-item value="Option2">Option 2</ids-radio-item>
            <ids-radio-item value="Option3">Option 3</ids-radio-item>
          </ids-radio-group>
        `,
  }),
  argTypes: {
    variant: selectControlOptions(RadioVariant),
    size: selectControlOptions(Size),
    orientation: selectControlOptions(Orientation),
    labelPosition: selectControlOptions(Position),
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
