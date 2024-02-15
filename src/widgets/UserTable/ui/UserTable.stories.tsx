import type { Meta, StoryObj } from '@storybook/react';

import { UserContextProvider, userHandlers } from '~/entities/User';

import { withQueryClientProvider } from '~/shared/lib/storybook';

import { UserTable } from './UserTable';

const meta = {
  title: 'Widgets/UserTable',
  component: UserTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof UserTable>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    withQueryClientProvider,
    (Story) => (
      <UserContextProvider>
        <Story />
      </UserContextProvider>
    ),
  ],
  parameters: {
    msw: userHandlers,
  },
};
