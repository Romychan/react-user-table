import {
  screen,
  render,
  RenderResult,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import { vi } from 'vitest';

import { SearchUser } from './SearchUser';

describe('SearchUser', () => {
  let container: RenderResult;
  const handleChange = vi.fn();

  beforeEach(() => {
    container = render(<SearchUser onValueSearch={handleChange} />);
  });

  it('should render correctly', () => {
    const searchElement = screen.getByTestId('search-user');

    expect(searchElement).toBeInTheDocument();
  });

  it('should debounce value correctly', async () => {
    const searchElement = screen.getByTestId('search-user');

    fireEvent.change(searchElement, { target: { value: 'test' } });
    fireEvent.change(searchElement, { target: { value: 'test123' } });
    fireEvent.change(searchElement, { target: { value: '123' } });

    await waitFor(() => {
      expect(handleChange).toHaveBeenCalledTimes(1);
      expect(handleChange).toHaveBeenCalledWith('123');
    });
  });

  it('should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
