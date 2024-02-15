import type { Meta, StoryObj } from '@storybook/react';

import { MOCK_USER } from '../../api/__mocks__/mocks';

import { UserAvatar } from './UserAvatar';

const meta = {
  title: 'Entities/UserAvatar',
  component: UserAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserAvatar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    image: MOCK_USER.image,
    name: MOCK_USER.name,
    username: MOCK_USER.username,
  },
};
