import { fireEvent, screen, render } from '@testing-library/react';
import { vi } from 'vitest';

import { Button } from './Button';

describe('Button', () => {
  it('should render correctly', () => {
    render(<Button variant="primary">Test</Button>);
    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement.getAttribute('class')).toMatch(/primary/gi);
  });

  it('should render correctly with size', () => {
    render(<Button size="md">Button</Button>);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement.getAttribute('class')).toMatch('md');
    expect(buttonElement.getAttribute('class')).not.toMatch('xs');
  });

  it('should render correctly with variant', () => {
    render(<Button variant="secondary">Button</Button>);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement.getAttribute('class')).toMatch('secondary');
    expect(buttonElement.getAttribute('class')).not.toMatch('tertiary');
  });

  it('should handle click', () => {
    const handleClick = vi.fn();

    render(
      <Button variant="primary" onClick={handleClick}>
        Test
      </Button>,
    );
    const buttonElement = screen.getByRole('button');

    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should disabled handle click', () => {
    const handleClick = vi.fn();

    render(
      <Button variant="primary" onClick={handleClick} disabled>
        Test
      </Button>,
    );
    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeDisabled();
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(0);
  });

  it('should match snapshot', () => {
    const handleClick = vi.fn();
    const container = render(
      <Button variant="primary" onClick={handleClick}>
        Test
      </Button>,
    );

    expect(container).toMatchSnapshot();
  });
});
