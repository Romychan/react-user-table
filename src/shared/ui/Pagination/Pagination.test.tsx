import { fireEvent, screen, render } from '@testing-library/react';
import { vi } from 'vitest';

import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('should render correctly', () => {
    const handleClick = vi.fn();

    render(
      <Pagination
        currentPage={1}
        onPageChange={handleClick}
        totalCount={100}
      />,
    );
    const paginationElement = screen.getByTestId('pagination');
    const ellipsisElement = screen.getByTestId('pagination-next-dot');

    expect(paginationElement).toBeInTheDocument();
    expect(ellipsisElement).toBeInTheDocument();
  });

  it('should be disable prev button if the first page is selected', () => {
    const handleClick = vi.fn();

    render(
      <Pagination currentPage={1} onPageChange={handleClick} totalCount={20} />,
    );

    const prevButtonElement = screen.getByTestId('pagination-prev');

    expect(prevButtonElement).toHaveAttribute('disabled');
  });

  it('should disable next button if the last page is selected', () => {
    const handleClick = vi.fn();

    render(
      <Pagination currentPage={2} onPageChange={handleClick} totalCount={20} />,
    );

    const nextButtonElement = screen.getByTestId('pagination-next');

    expect(nextButtonElement).toHaveAttribute('disabled');
  });

  it('should called handleClick after click prev button', () => {
    const handleClick = vi.fn();

    render(
      <Pagination
        currentPage={6}
        onPageChange={handleClick}
        totalCount={100}
      />,
    );

    const prevButtonElement = screen.getByTestId('pagination-prev');

    fireEvent.click(prevButtonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should called handleClick after click next button', () => {
    const handleClick = vi.fn();

    render(
      <Pagination
        currentPage={6}
        onPageChange={handleClick}
        totalCount={100}
      />,
    );

    const nextButtonElement = screen.getByTestId('pagination-next');

    fireEvent.click(nextButtonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot', () => {
    const handleClick = vi.fn();
    const container = render(
      <Pagination
        currentPage={6}
        onPageChange={handleClick}
        totalCount={100}
      />,
    );

    expect(container).toMatchSnapshot();
  });
});
