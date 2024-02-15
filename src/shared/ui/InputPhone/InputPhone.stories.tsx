import type { Meta, StoryObj } from '@storybook/react';

import { withGapDecorator } from '../../lib/storybook';
import { DefaultInput, ErrorInput } from '../Input';

import { InputPhone } from './InputPhone';

const meta = {
  title: 'UI/InputPhone',
  component: InputPhone,
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
} satisfies Meta<typeof InputPhone>;

export default meta;
type Story = StoryObj<typeof meta>;

/** This state is used to default. */
export const Default: Story = {
  args: {
    ...DefaultInput.args,
    value: '+71234567890',
  },
};

/** The `error` is used to provide information to the user about the error. */
export const Error: Story = {
  args: {
    ...ErrorInput.args,
    value: '+71234567890',
  },
};

/**
 * The `variant` property is used to change the variant of the chip.
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
        <InputPhone {...args} value="+71234567890" variant="filled" />
        <InputPhone {...args} value="+71234567890" variant="unfilled" />
        <InputPhone {...args} value="+71234567890" variant="bordered" />
        <InputPhone {...args} value="+71234567890" variant="unstyled" />
      </>
    );
  },
};
