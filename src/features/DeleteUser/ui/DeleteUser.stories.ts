import type { Meta, StoryObj } from '@storybook/react';
import { NIL as NIL_UUID } from 'uuid';

import { withAppProvidersDecorator } from '~/shared/lib/storybook';

import { DeleteUser } from './DeleteUser';

const meta = {
  title: 'Features/DeleteUser',
  component: DeleteUser,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    onComplete: { action: 'onComplete' },
  },
  decorators: [withAppProvidersDecorator],
  tags: ['autodocs'],
} satisfies Meta<typeof DeleteUser>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    id: NIL_UUID,
  },
};
