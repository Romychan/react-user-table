import type { Meta, StoryObj } from '@storybook/react';

import { withWidthDecorator } from '~/shared/lib/storybook';

import { SearchUser } from './SearchUser';

const meta = {
  title: 'Features/SearchUser',
  component: SearchUser,
  parameters: {
    layout: 'padded',
  },
  decorators: [withWidthDecorator],
  tags: ['autodocs'],
  argTypes: { onValueSearch: { action: 'onValueSearch' } },
} satisfies Meta<typeof SearchUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
