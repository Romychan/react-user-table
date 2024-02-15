import type { Meta, StoryObj } from '@storybook/react';

import { UserContextProvider, userHandlers } from '~/entities/User';

import { withAppProvidersDecorator } from '~/shared/lib/storybook';

import { MainPage } from './MainPage';

const meta = {
  title: 'Pages/MainPage',
  parameters: {
    layout: 'fullscreen',
    msw: userHandlers,
  },
  component: MainPage,
  decorators: [
    withAppProvidersDecorator,
    (Story) => (
      <UserContextProvider>
        <Story />
      </UserContextProvider>
    ),
  ],
  tags: ['autodocs'],
} satisfies Meta<typeof MainPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
