import type { Meta, StoryObj } from '@storybook/react';

import { withGapDecorator } from '../../lib/storybook';
import { Icon } from '../Icon';

import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    variant: 'primary',
  },
  argTypes: {
    onClick: { action: 'onClick' },
    variant: {
      control: { type: 'select' },
    },
    size: {
      control: { type: 'select' },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/** This state is used to display the default. */
export const Default: Story = {
  args: {
    children: 'Primary',
  },
};

/** This state is used to display the disabled variant. */
export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

/** This state is used to display the icon. */
export const WithIcon: Story = {
  args: {
    children: <Icon name="close" />,
    variant: 'secondary',
    isIconOnly: true,
  },
};

/**
 * The `variant` property is used to change the variant of the button.
 * - `primary` is usually used to perform the main action.
 * - `secondary` is used to perform secondary actions or options.
 * - `tertiary` is used to call additional, less important functions or options.
 * - `success` can be used to confirm the action or inform the user about the successful completion of the operation.
 * - `danger` is designed to displace dangerous or irreversible operations. For example, to delete files or data.
 * - `warning` is used for actions that are not critical, but may be important to the user.
 * - `link-primary` is used to navigate to another web page.
 * - `link-secondary` is also used to navigate to another web page, but is less noticeable.
 */
export const AllVariants: Story = {
  decorators: [withGapDecorator],
  render: (args) => {
    return (
      <>
        <Button {...args} variant="primary">
          Primary
        </Button>
        <Button {...args} variant="secondary">
          Secondary
        </Button>
        <Button {...args} variant="tertiary">
          Tertiary
        </Button>
        <Button {...args} variant="success">
          Success
        </Button>
        <Button {...args} variant="danger">
          Danger
        </Button>
        <Button {...args} variant="warning">
          Warning
        </Button>
        <Button {...args} variant="link-primary">
          Link Primary
        </Button>
        <Button {...args} variant="link-secondary">
          Link Secondary
        </Button>
      </>
    );
  },
};

/**
 * The `size` property is used to change the size of the button.
 * - `md` is the main one for performing basic operations.
 * - `sm` can be used to perform operations, depending on the context. For example, calling additional menus.
 * - `xs` is used to perform minor or secondary operations
 */
export const AllSizes: Story = {
  decorators: [withGapDecorator],
  render: (args) => {
    return (
      <>
        <Button {...args} size="md">
          Size MD
        </Button>
        <Button {...args} size="sm">
          Size SM
        </Button>
        <Button {...args} size="xs">
          Size XS
        </Button>
      </>
    );
  },
};
