import type { Meta, StoryObj } from '@storybook/react';
import { NIL as NIL_UUID } from 'uuid';

import { UserContextProvider, userHandlers } from '~/entities/User';

import {
  withHeightDecorator,
  withAppProvidersDecorator,
} from '~/shared/lib/storybook';

import { UserOverview } from './UserOverview';

const meta = {
  title: 'Widgets/UserOverview',
  component: UserOverview,
  parameters: {
    layout: 'fullscreen',
    msw: userHandlers,
  },
  decorators: [
    withAppProvidersDecorator,
    (Story) => (
      <UserContextProvider preloadState={{ currentUserId: NIL_UUID }}>
        <Story />
      </UserContextProvider>
    ),
    withHeightDecorator,
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof UserOverview>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
