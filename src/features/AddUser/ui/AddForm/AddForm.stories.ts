import type { Meta, StoryObj } from '@storybook/react';

import {
  withAppProvidersDecorator,
  withWidthDecorator,
} from '~/shared/lib/storybook';

import { AddForm } from './AddForm';

const meta = {
  title: 'Features/AddUser/AddForm',
  component: AddForm,
  parameters: {
    layout: 'centered',
    width: '420px',
  },
  decorators: [withAppProvidersDecorator, withWidthDecorator],
  tags: ['autodocs'],
} satisfies Meta<typeof AddForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
