import type { Meta, StoryObj } from '@storybook/react';

import {
  withHeightDecorator,
  withAppProvidersDecorator,
} from '~/shared/lib/storybook';

import { AddUser } from './AddUser';

const meta = {
  title: 'Features/AddUser',
  component: AddUser,
  parameters: {
    layout: 'padded',
  },
  decorators: [withAppProvidersDecorator, withHeightDecorator],
  tags: ['autodocs'],
} satisfies Meta<typeof AddUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
