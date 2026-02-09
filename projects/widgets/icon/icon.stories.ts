import { IdsIconComponent } from './icon.component';
import { IdsIconVariant } from './types/icon-variant.type';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { selectControlOptions } from '@i-cell/ids-angular/.storybook/utils';
import { IdsSize, IdsSizeCollection } from '@i-cell/ids-angular/core';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

type StoryType = IdsIconComponent & { svgIcon?: string };

export default {
  component: IdsIconComponent,
  title: 'Components/Icon',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }),
  ],
  render: ({ ...props }) => ({
    props,
    template: `
        <ids-icon fontSet="idsbase" ${argsToTemplate(props)} />
      `,
  }),
  argTypes: {
    id: { control: 'text' },
    sizeCollection: selectControlOptions(IdsSizeCollection),
    size: selectControlOptions(IdsSize),
    variant: selectControlOptions(IdsIconVariant),
    fontIcon: { control: 'text' },
    svgIcon: { control: 'text' },
  },
  args: {
    id: 'icon-id',
    sizeCollection: 'small',
    size: 'comfortable',
    variant: 'surface',
    fontIcon: 'moon',
    svgIcon: undefined,
  },
} as Meta<StoryType>;

type Story = StoryObj<StoryType>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Default: Story = {};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const SvgIcon: Story = {
  args: {
    id: 'icon-id2',
    fontIcon: undefined,
    svgIcon: 'user',
  },
};
