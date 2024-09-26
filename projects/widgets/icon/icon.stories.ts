import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { selectControlOptions } from '@i-cell/ids-angular/.storybook/utils';
import { Size } from '@i-cell/ids-angular/core';
import { IconSizeCollection, IconVariant, IdsIconV2Component } from '@i-cell/ids-angular/icon';
import { Meta, StoryObj, argsToTemplate, moduleMetadata } from '@storybook/angular';

type StoryType = IdsIconV2Component & { svgIcon?: string };

export default {
  component: IdsIconV2Component,
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
        <ids-icon-v2 ${argsToTemplate(props)} />
      `,
  }),
  argTypes: {
    id: { control: 'text' },
    sizeCollection: selectControlOptions(IconSizeCollection),
    size: selectControlOptions(Size),
    variant: selectControlOptions(IconVariant),
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
