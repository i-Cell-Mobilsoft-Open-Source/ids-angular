import { IdsTagComponent } from './ids-tag.component';
import { TagAppearance } from './public-api';

import { selectControlOptions } from '../.storybook/utils';
import { AllVariants, coerceBooleanAttribute, Size } from '../core';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
import { mdiMagnify } from '@mdi/js';
import { withActions } from '@storybook/addon-actions/decorator';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

type StoryType = IdsTagComponent & { label?: string, prefixIcon?: boolean, suffixIcon?: boolean };

export default {
  component: IdsTagComponent,
  title: 'Components/Tag',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [IdsIconComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
    withActions,
  ],
  render: ({ label, prefixIcon, suffixIcon, ...props }) => {
    const hasPrefixIcon = coerceBooleanAttribute(prefixIcon);
    const hasSuffixIcon = coerceBooleanAttribute(suffixIcon);

    return {
      props,
      template: `
        <ids-tag
          [appearance]="appearance"
          [size]="size"
          [variant]="variant"
        >
          ${hasPrefixIcon ? `<ids-icon icon-leading icon="${mdiMagnify}" aria-hidden="true" alt="" />` : ''}
          ${label}
          ${hasSuffixIcon ? `<ids-icon icon-trailing icon="${mdiMagnify}" aria-hidden="true" alt="" />` : ''}
        </ids-tag>
      `,
    };
  },
  argTypes: {
    appearance: selectControlOptions(TagAppearance),
    size: selectControlOptions(Size),
    variant: selectControlOptions(AllVariants),
    label: { control: 'text', description: 'Projected label text for the tag' },
    prefixIcon: { control: 'boolean', description: 'Projected prefix icon for the tag' },
    suffixIcon: { control: 'boolean', description: 'Projected suffix icon for the tag' },
  },
  args: {
    appearance: 'filled',
    size: 'comfortable',
    variant: 'primary',
    label: 'Label',
    prefixIcon: false,
    suffixIcon: false,
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
