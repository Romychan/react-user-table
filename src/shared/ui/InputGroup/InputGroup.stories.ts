import type { Meta, StoryObj } from '@storybook/react';

import { InputGroup } from './InputGroup';

const meta = {
  title: 'UI/InputGroup',
  component: InputGroup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    startContent: 'PRE',
    endContent: 'SUF',
  },
} satisfies Meta<typeof InputGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

/** This state is used to display the default. */
export const Default: Story = {};

/** This state is used to provide information to the user about the error. */
export const Error: Story = {
  args: {
    error: true,
  },
};
