import {
  fireEvent,
  screen,
  render,
  RenderResult,
} from '@testing-library/react';
import { Mock, vi } from 'vitest';

import { InputPhone } from './InputPhone';

describe('InputPhone', () => {
  let handleChange: Mock<never, never>;
  let container: RenderResult;

  beforeEach(() => {
    handleChange = vi.fn();

    container = render(<InputPhone onChange={handleChange} phoneCode="9" />);
  });

  it('should render correctly', () => {
    const inputElement = screen.getByTestId<HTMLInputElement>('input-field');

    expect(inputElement).toBeInTheDocument();

    fireEvent.focus(inputElement);

    expect(inputElement).toHaveValue('+9 ');
  });

  it('should onBlur and onFocus with empty value work correctly', () => {
    const inputElement = screen.getByTestId<HTMLInputElement>('input-field');

    fireEvent.focus(inputElement);
    expect(inputElement).toHaveValue('+9 ');

    fireEvent.blur(inputElement);
    expect(inputElement).not.toHaveValue('+9 ');
  });

  it('should onBlur and onFocus with not empty value work correctly', () => {
    const inputElement = screen.getByTestId<HTMLInputElement>('input-field');

    fireEvent.focus(inputElement);
    expect(inputElement).toHaveValue('+9 ');

    fireEvent.change(inputElement, { target: { value: '1234' } });

    fireEvent.blur(inputElement);

    expect(handleChange).toHaveBeenCalled();
  });

  it('should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
