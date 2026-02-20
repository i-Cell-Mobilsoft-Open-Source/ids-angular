import { IdsTagComponent } from './tag.component';
import { IdsTagAppearance } from './types/tag-appearance.type';

import { selectControlOptions } from '../.storybook/utils';
import { IdsAllVariants, coerceBooleanAttribute, IdsSize } from '../core';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IdsIconComponent } from '@i-cell/ids-angular/icon';
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
          ${hasPrefixIcon ? '<ids-icon fontSet="idsbase" icon-leading fontIcon="search" aria-hidden="true" alt="" />' : ''}
          ${label}
          ${hasSuffixIcon ? '<ids-icon fontSet="idsbase" icon-trailing fontIcon="search" aria-hidden="true" alt="" />' : ''}
        </ids-tag>
      `,
    };
  },
  argTypes: {
    appearance: selectControlOptions(IdsTagAppearance),
    size: selectControlOptions(IdsSize),
    variant: selectControlOptions(IdsAllVariants),
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
