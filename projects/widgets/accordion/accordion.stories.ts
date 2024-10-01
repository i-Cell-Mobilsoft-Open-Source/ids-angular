import { IdsAccordionComponent } from './accordion.component';
import { AccordionAppearance } from './types/accordion-appearance';

import { selectControlOptions } from '../.storybook/utils';

import { Size } from '@i-cell/ids-angular/core';
import { Meta, StoryObj, argsToTemplate } from '@storybook/angular';

type StoryType = IdsAccordionComponent & { summary?: string, content?: string };

export default {
  component: IdsAccordionComponent,
  title: 'Components/Accordion',
  tags: ['autodocs'],
  render: ({ content, ...props }) => ({
    props,
    template: `
        <details idsAccordion ${argsToTemplate(props)}>
          ${content}
        </details>
      `,
  }),
  argTypes: {
    appearance: selectControlOptions(AccordionAppearance),
    size: selectControlOptions(Size),
    disabled: { control: 'boolean' },
    summary: { control: 'text', description: 'Projected summary text for the accordion' },
    content: { control: 'text', description: 'Projected content text for the accordion' },
  },
  args: {
    summary: 'Accordion summary',
    content: `Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,
    when an unknown printer took a galley of type and scrambled it to make a type specimen book.`,
  },
} as Meta<StoryType>;

type Story = StoryObj<StoryType>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Filled: Story = {
  args: {
    appearance: 'filled',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Plain: Story = {};
