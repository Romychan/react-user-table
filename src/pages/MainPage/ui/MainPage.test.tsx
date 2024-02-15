import {
  screen,
  fireEvent,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';

import { UserContextProvider, userHandlers } from '~/entities/User';

import { server } from '~/shared/api/msw/server';
import { renderWithAppProviders } from '~/shared/lib/tests';

import { MainPage } from './MainPage';

describe('MainPage', () => {
  beforeEach(() => {
    server.use(...userHandlers);
  });

  describe('Search user', () => {
    beforeEach(() => {
      renderWithAppProviders(
        <UserContextProvider>
          <MainPage />
        </UserContextProvider>,
      );
    });

    it('should search user correctly', async () => {
      const searchElement = screen.getByTestId('search-user');

      fireEvent.change(searchElement, { target: { value: 'Test Name' } });

      await waitFor(() =>
        expect(screen.getAllByTestId('table-body-row')).toHaveLength(1),
      );
    });
  });

  describe('Pagination', () => {
    beforeEach(() => {
      renderWithAppProviders(
        <UserContextProvider>
          <MainPage />
        </UserContextProvider>,
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
      renderWithAppProviders(
        <UserContextProvider>
          <MainPage />
        </UserContextProvider>,
      );
    });

    it('should sorting work correctly', async () => {
      const headerCellElement = screen.getAllByTestId('table-header-cell')[0];

      expect(headerCellElement).toHaveAttribute('aria-sort', 'none');

      fireEvent.click(headerCellElement);

      expect(headerCellElement).toHaveAttribute('aria-sort', 'ascending');

      fireEvent.click(headerCellElement);

      expect(headerCellElement).toHaveAttribute('aria-sort', 'descending');
      expect(await screen.findAllByTestId('table-body-row')).toHaveLength(10);
    });
  });

  describe('Overview user', () => {
    beforeEach(() => {
      renderWithAppProviders(
        <UserContextProvider>
          <MainPage />
        </UserContextProvider>,
      );
    });

    it('should open a drawer with user information when clicking on a row in the table', async () => {
      const userRowElement = await screen.findAllByTestId('table-body-row');

      fireEvent.click(userRowElement[0]);

      const drawerElement = screen.getByTestId('drawer');

      expect(drawerElement).toBeInTheDocument();

      await waitFor(() =>
        expect(screen.getByTestId('update-user-form')).toBeInTheDocument(),
      );
    });

    it('should close the drawer correctly', async () => {
      const userRowElement = await screen.findAllByTestId('table-body-row');

      fireEvent.click(userRowElement[0]);

      const drawerElement = screen.getByTestId('drawer');

      expect(drawerElement).toBeInTheDocument();

      const drawerBackdropElement = screen.getByTestId('drawer-backdrop');
      const drawerCloseElement = screen.getByTestId('drawer-close');

      fireEvent.click(drawerCloseElement);
      fireEvent.animationEnd(drawerBackdropElement);

      await waitFor(() =>
        expect(screen.queryByTestId('drawer')).not.toBeInTheDocument(),
      );
    });

    it('should update selected user data correctly', async () => {
      const userRowElement = await screen.findAllByTestId('table-body-row');

      expect(userRowElement[0]).toHaveTextContent('Test Name');

      fireEvent.click(userRowElement[0]);

      const nameInputElement = await screen.findByRole('textbox', {
        name: 'Name',
      });

      expect(nameInputElement).toHaveValue('Test Name');

      fireEvent.change(nameInputElement, { target: { value: 'New Name' } });
      fireEvent.submit(screen.getByTestId('update-user'));

      await waitFor(() => {
        expect(userRowElement[0]).not.toHaveTextContent('Test Name');
        expect(userRowElement[0]).toHaveTextContent('New Name');
      });
    });

    it('should delete selected user data correctly', async () => {
      const userRowElement = await screen.findAllByTestId('table-body-row');
      const selectedUser = userRowElement[0];

      fireEvent.click(selectedUser);

      const deleteUserElement = await screen.findByTestId('delete-user');
      fireEvent.click(deleteUserElement);

      await waitForElementToBeRemoved(selectedUser).then(() => {
        expect(selectedUser).not.toBeInTheDocument();
      });
    });
  });

  describe('Add User', () => {
    beforeEach(() => {
      renderWithAppProviders(
        <UserContextProvider>
          <MainPage />
        </UserContextProvider>,
      );
    });

    it('should add new user correctly', async () => {
      const addUserElement = screen.getByTestId('drawer-add-user');

      fireEvent.click(addUserElement);

      fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), {
        target: { value: 'New Test Name' },
      });
      fireEvent.change(screen.getByRole('textbox', { name: /username/i }), {
        target: { value: 'Username' },
      });
      fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
        target: { value: 'test@test.test' },
      });
      fireEvent.change(screen.getByRole('textbox', { name: 'Phone' }), {
        target: { value: '+7 (123) 456-78-91' },
      });
      fireEvent.change(screen.getByRole('textbox', { name: 'City' }), {
        target: { value: 'City' },
      });
      fireEvent.change(screen.getByRole('textbox', { name: 'Address' }), {
        target: { value: 'Address' },
      });

      fireEvent.submit(screen.getByTestId('add-user'));

      const searchElement = screen.getByTestId('search-user');

      fireEvent.change(searchElement, { target: { value: 'Test Name' } });

      await waitFor(() =>
        expect(screen.getAllByTestId('table-body-row')).toHaveLength(1),
      );
    });
  });

  describe('Default render', () => {
    it('should render correctly', async () => {
      renderWithAppProviders(
        <UserContextProvider>
          <MainPage />
        </UserContextProvider>,
      );

      const searchElement = screen.getByTestId('search-user');
      const tableElement = screen.getByTestId('user-table');
      const paginationElement = await screen.findByTestId('pagination');
      const drawerElement = screen.queryByTestId('drawer');

      expect(searchElement).toBeInTheDocument();
      expect(paginationElement).toBeInTheDocument();
      expect(tableElement).toBeInTheDocument();
      expect(drawerElement).not.toBeInTheDocument();
    });

    it('should match snapshot', async () => {
      const container = renderWithAppProviders(
        <UserContextProvider>
          <MainPage />
        </UserContextProvider>,
      );

      expect(container).toMatchSnapshot();
    });
  });
});
