import type { Meta, StoryObj } from '@storybook/react';

import { withGapDecorator } from '../../lib/storybook';

import { Input } from './Input';

const meta = {
  title: 'UI/Input',
  component: Input,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    name: 'field',
    id: 'field',
  },
  argTypes: {
    variant: {
      control: { type: 'select' },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

/** This state is used to default. */
export const Default: Story = {
  args: {
    value: 'Default',
  },
};

/** The `error` is used to provide information to the user about the error. */
export const Error: Story = {
  args: {
    value: 'Error',
    error: true,
  },
};

/**
 * The `variant` property is used to change the variant of the input.
 * - `filled` sets the background for component
 * - `unfilled` sets a transparent background for the component
 * - `bordered` sets the border for component
 * - `unstyled` is used to reset the color and paddings
 */
export const AllVariants: Story = {
  decorators: [withGapDecorator],
  render: (args) => {
    return (
      <>
        <Input {...args} variant="filled" value="Filled" />
        <Input {...args} variant="unfilled" value="Unfilled" />
        <Input {...args} variant="bordered" value="Bordered" />
        <Input {...args} variant="unstyled" value="Unstyled" />
      </>
    );
  },
};
