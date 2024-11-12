import { IdsSegmentedControlToggleItemComponent } from './segmented-control-toggle-item.component';
import { IdsSegmentedControlToggleDirective } from './segmented-control-toggle.directive';
import { IdsSegmentedControlToggleAppearance } from './types/segmented-control-toggle-appearance.type';
import { IdsSegmentedControlToggleButtonVariant, IdsSegmentedControlToggleVariant } from './types/segmented-control-toggle-variant.type';

import { selectControlOptions } from '../.storybook/utils';
import { IdsSize } from '../core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { withActions } from '@storybook/addon-actions/decorator';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

type StoryType = IdsSegmentedControlToggleDirective & { value: unknown | unknown[] };

export default {
  component: IdsSegmentedControlToggleDirective,
  title: 'Components/Segmented Control Toggle',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        IdsSegmentedControlToggleItemComponent,
        FormsModule,
        ReactiveFormsModule,
      ],
    }),
    withActions,
  ],
  parameters: {
    actions: {
      handles: [
        'click ids-segmented-control-toggle-item',
        'itemChanges',
      ],
    },
  },
  render: ({ disabled, size, variant, appearance, ...props }) => ({
    template: `
          <ids-segmented-control-toggle
            ngModel="Option1"
            ${disabled() ? 'disabled' : ''}
            size="${size}"
            variant="${variant}"
            appearance="${appearance}"
            ${argsToTemplate(props)}
          >
            <ids-segmented-control-toggle-item value="Option1" label="Option 1" />
            <ids-segmented-control-toggle-item value="Option2" label="Option 2" />
            <ids-segmented-control-toggle-item value="Option3" label="Option 3" />
          </ids-segmented-control-toggle>
        `,
  }),
  argTypes: {
    size: selectControlOptions(IdsSize),
    variant: selectControlOptions(IdsSegmentedControlToggleVariant),
    appearance: selectControlOptions(IdsSegmentedControlToggleAppearance),
    buttonVariant: selectControlOptions(IdsSegmentedControlToggleButtonVariant),
  },
  args: {
    size: 'comfortable',
    variant: 'light',
    appearance: 'filled',
    buttonVariant: 'light',
  },
} as Meta<StoryType>;

type Story = StoryObj<StoryType>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: Story = {};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Outlined: Story = {
  args: {
    appearance: 'outlined',
  },
};
