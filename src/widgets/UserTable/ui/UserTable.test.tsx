import { screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';

import { UserContext, userHandlers } from '~/entities/User';

import { server } from '~/shared/api/msw/server';
import { renderWithQueryProvider } from '~/shared/lib/tests';
import { resetMockDatabase } from '~/shared/api/msw';

import { UserTable } from './UserTable';

const mockUserStore = {
  currentUserId: null,
  setCurrentUserId: vi.fn(),
};

describe('UserTable', () => {
  beforeEach(() => {
    server.use(...userHandlers);
  });

  describe('Search user', () => {
    beforeEach(() => {
      renderWithQueryProvider(
        <UserContext.Provider value={mockUserStore}>
          <UserTable />
        </UserContext.Provider>,
      );
    });

    it('should search user correctly', async () => {
      const searchElement = screen.getByTestId('search-user');

      fireEvent.change(searchElement, { target: { value: 'Test Name' } });

      await waitFor(() =>
        expect(screen.getAllByTestId('table-body-row')).toHaveLength(1),
      );
    });

    it('should show an empty table if users are not found', async () => {
      const searchElement = screen.getByTestId('search-user');

      fireEvent.change(searchElement, { target: { value: '123321' } });

      await waitFor(() =>
        expect(screen.getByTestId('table-body-empty')).toBeInTheDocument(),
      );
    });
  });

  describe('Pagination', () => {
    beforeEach(() => {
      renderWithQueryProvider(
        <UserContext.Provider value={mockUserStore}>
          <UserTable />
        </UserContext.Provider>,
      );
    });

    it('should switch pages correctly', async () => {
      const userRowElement = await screen.findAllByTestId('table-body-row');

      expect(userRowElement).toHaveLength(10);

      const paginationNextElement =
        await screen.findByTestId('pagination-next');

      fireEvent.click(paginationNextElement);

      await waitFor(() =>
        expect(screen.getAllByTestId('table-body-row')).toHaveLength(10),
      );
    });
  });

  describe('Sorting', () => {
    beforeEach(() => {
      renderWithQueryProvider(
        <UserContext.Provider value={mockUserStore}>
          <UserTable />
        </UserContext.Provider>,
      );
    });

    it('should sorting work correctly', async () => {
      const headerCellElement = screen.getAllByTestId('table-header-cell')[0];

      expect(headerCellElement).toHaveAttribute('aria-sort', 'none'),
        fireEvent.click(headerCellElement);

      expect(headerCellElement).toHaveAttribute('aria-sort', 'ascending'),
        fireEvent.click(headerCellElement);

      expect(headerCellElement).toHaveAttribute('aria-sort', 'descending');
      expect(await screen.findAllByTestId('table-body-row')).toHaveLength(10);
    });

    it('should sorting work correctly if search is used', async () => {
      resetMockDatabase();
      const headerCellElement = screen.getAllByTestId('table-header-cell')[0];
      const searchElement = screen.getByTestId('search-user');

      fireEvent.click(headerCellElement);

      expect(headerCellElement).toHaveAttribute('aria-sort', 'ascending');

      fireEvent.change(searchElement, { target: { value: 'Test Name' } });

      expect(headerCellElement).toHaveAttribute('aria-sort', 'ascending');

      await waitFor(() =>
        expect(screen.getAllByTestId('table-body-row')).toHaveLength(1),
      );
    });

    it('should sorting work correctly if pagination is used', async () => {
      const headerCellElement = screen.getAllByTestId('table-header-cell')[0];

      fireEvent.click(headerCellElement);
      expect(headerCellElement).toHaveAttribute('aria-sort', 'ascending');

      const paginationNextElement =
        await screen.findByTestId('pagination-next');

      fireEvent.click(paginationNextElement);

      await waitFor(() => {
        expect(headerCellElement).toHaveAttribute('aria-sort', 'ascending');
        expect(screen.getAllByTestId('table-body-row')).toHaveLength(10);
      });
    });
  });

  describe('Default render', () => {
    it('should render correctly', async () => {
      renderWithQueryProvider(
        <UserContext.Provider value={mockUserStore}>
          <UserTable />
        </UserContext.Provider>,
      );

      const searchElement = screen.getByTestId('search-user');
      const tableElement = screen.getByTestId('user-table');
      const paginationElement = await screen.findByTestId('pagination');

      expect(searchElement).toBeInTheDocument();
      expect(paginationElement).toBeInTheDocument();
      expect(tableElement).toBeInTheDocument();
    });

    it('should load and display data correctly', async () => {
      renderWithQueryProvider(
        <UserContext.Provider value={mockUserStore}>
          <UserTable />
        </UserContext.Provider>,
      );

      const userRowElement = await screen.findAllByTestId('table-body-row');

      expect(screen.getByText(/Test Name/i)).toBeInTheDocument();

      expect(userRowElement).toHaveLength(10);
    });

    it('should handle click on a row in the table', async () => {
      const spy = vi.spyOn(mockUserStore, 'setCurrentUserId');

      renderWithQueryProvider(
        <UserContext.Provider value={mockUserStore}>
          <UserTable />
        </UserContext.Provider>,
      );

      const userRowElement = await screen.findAllByTestId('table-body-row');

      fireEvent.click(userRowElement[0]);

      expect(spy).toHaveBeenCalled();
    });

    it('should match snapshot', async () => {
      const container = renderWithQueryProvider(
        <UserContext.Provider value={mockUserStore}>
          <UserTable />
        </UserContext.Provider>,
      );

      expect(container).toMatchSnapshot();
    });
  });
});
