import { IdsSegmentedControlItemComponent } from './segmented-control-item/segmented-control-item.component';
import { IdsSegmentedControlDirective } from './segmented-control.directive';
import { IdsSegmentedControlAppearance } from './types/segmented-control-appearance.type';
import { IdsSegmentedControlVariant } from './types/segmented-control-variant.type';

import { selectControlOptions } from '../.storybook/utils';
import { IdsSize } from '../core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { withActions } from '@storybook/addon-actions/decorator';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

type StoryType = IdsSegmentedControlDirective & { value: unknown | unknown[] };

export default {
  component: IdsSegmentedControlDirective,
  title: 'Components/Segmented Control',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        IdsSegmentedControlItemComponent,
        FormsModule,
        ReactiveFormsModule,
      ],
    }),
    withActions,
  ],
  parameters: {
    actions: {
      handles: [
        'click ids-segmented-control-item',
        'itemChanges',
      ],
    },
  },
  render: ({ disabled, size, variant, appearance, multiSelect, ...props }) => ({
    template: `
          <ids-segmented-control
            ${multiSelect ? '[ngModel]="[\'Option1\']"' : 'ngModel="Option1"'}
            ${disabled() ? 'disabled' : ''}
            size="${size}"
            variant="${variant}"
            appearance="${appearance}"
            [multiSelect]="${multiSelect}"
            ${argsToTemplate(props)}
          >
            <ids-segmented-control-item value="Option1" label="Option 1" />
            <ids-segmented-control-item value="Option2" label="Option 2" />
            <ids-segmented-control-item value="Option3" label="Option 3" />
          </ids-segmented-control>
        `,
  }),
  argTypes: {
    size: selectControlOptions(IdsSize),
    variant: selectControlOptions(IdsSegmentedControlVariant),
    appearance: selectControlOptions(IdsSegmentedControlAppearance),
    disabled: { control: 'boolean' },
    multiSelect: { control: 'boolean' },
  },
  args: {
    // disabled: false,
    size: 'comfortable',
    variant: 'primary',
    appearance: 'filled',
    multiSelect: false,
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

// eslint-disable-next-line @typescript-eslint/naming-convention
export const MultiSelect: Story = {
  args: {
    multiSelect: true,
  },
};

