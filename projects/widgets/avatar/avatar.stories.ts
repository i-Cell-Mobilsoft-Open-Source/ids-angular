import { IdsAvatarComponent } from './avatar.component';

import { selectControlOptions } from '../.storybook/utils';

import { IdsSize, IdsSurfaceVariant } from '@i-cell/ids-angular/core';
import { withActions } from '@storybook/addon-actions/decorator';
import { argsToTemplate, Meta, StoryObj } from '@storybook/angular';

type StoryType = IdsAvatarComponent;

export default {
  component: IdsAvatarComponent,
  title: 'Components/Avatar',
  tags: ['autodocs'],
  parameters: {
    actions: {
      handles: ['click button[idsAvatar]'],
    },
  },
  decorators: [withActions],
  render: (props) => ({
    props,
    template: `
        <button
          type="button"
          idsAvatar
          ${argsToTemplate(props)}
        ></button>
      `,
  }),
  argTypes: {
    size: selectControlOptions(IdsSize),
    variant: selectControlOptions(IdsSurfaceVariant),
  },
} as Meta<StoryType>;

type Story = StoryObj<StoryType>;

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Generic: Story = {};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Initials: StoryObj<StoryType & { initials?: string }> = {
  name: 'With initials',
  render: ({ initials, ...props }) => ({
    props,
    template: `
        <button
          type="button"
          idsAvatar
          ${argsToTemplate(props)}
        >
          <span>${initials}</span>
        </button>
      `,
  }),
  argTypes: {
    initials: { control: 'text', description: 'The user\'s initials' },
  },
  args: {
    initials: 'AB',
  },
};

// eslint-disable-next-line @typescript-eslint/naming-convention
export const Image: Story = {
  name: 'With image',
  args: {
    image: 'https://sm.ign.com/t/ign_nordic/cover/a/avatar-gen/avatar-generations_prsz.300.jpg',
  },
};
