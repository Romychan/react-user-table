import type { Meta, StoryObj } from '@storybook/react';

import { UserContextProvider, MOCK_USER } from '~/entities/User';

import { withAppProvidersDecorator } from '~/shared/lib/storybook';

import { UpdateUser } from './UpdateUser';

const meta = {
  title: 'Features/UpdateUser',
  component: UpdateUser,
  parameters: {
    layout: 'centered',
  },
  decorators: [
    withAppProvidersDecorator,
    (Story) => (
      <UserContextProvider>
        <Story />
      </UserContextProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof UpdateUser>;

export default meta;
type Story = StoryObj<typeof meta>;

/** This state is used to display the default. */
export const Default: Story = {
  args: {
    user: MOCK_USER,
  },
};

/** Component with action slot */
export const WithActionSlot: Story = {
  args: {
    user: MOCK_USER,
    actionSlot: 'Action Slot',
  },
};
