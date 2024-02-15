import { screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import { NIL as NIL_UUID } from 'uuid';

import { UserContext, userHandlers } from '~/entities/User';

import { server } from '~/shared/api/msw/server';
import { renderWithAppProviders } from '~/shared/lib/tests';

import { UserOverview } from './UserOverview';

const mockUserStore = {
  currentUserId: NIL_UUID,
  setCurrentUserId: vi.fn(),
};

describe('UserOverview', () => {
  beforeEach(() => {
    server.use(...userHandlers);
  });

  it('should render correctly', async () => {
    renderWithAppProviders(
      <UserContext.Provider value={mockUserStore}>
        <UserOverview />
      </UserContext.Provider>,
    );

    const loaderElement = screen.getByTestId('loader');
    expect(loaderElement).toBeInTheDocument();

    const userFormElement = await screen.findByTestId('update-user-form');

    expect(loaderElement).not.toBeInTheDocument();
    expect(userFormElement).toBeInTheDocument();
  });

  it('should update user correctly', async () => {
    renderWithAppProviders(
      <UserContext.Provider value={mockUserStore}>
        <UserOverview />
      </UserContext.Provider>,
    );

    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), {
      target: { value: 'New Name' },
    });

    fireEvent.submit(screen.getByTestId('update-user'));

    await waitFor(() => expect(screen.queryAllByText('alert')).toHaveLength(0));
  });

  it('should delete user correctly', async () => {
    const spy = vi.spyOn(mockUserStore, 'setCurrentUserId');

    renderWithAppProviders(
      <UserContext.Provider value={mockUserStore}>
        <UserOverview />
      </UserContext.Provider>,
    );

    const drawerBackdropElement = screen.getByTestId('drawer-backdrop');
    const deleteUserElement = screen.getByTestId('delete-user');

    fireEvent.click(deleteUserElement);
    fireEvent.animationEnd(drawerBackdropElement);

    await waitFor(() => expect(spy).toHaveBeenCalled());
  });

  it('should the id be reset when the drawer is closed', () => {
    const spy = vi.spyOn(mockUserStore, 'setCurrentUserId');

    renderWithAppProviders(
      <UserContext.Provider value={mockUserStore}>
        <UserOverview />
      </UserContext.Provider>,
    );

    const drawerBackdropElement = screen.getByTestId('drawer-backdrop');
    const drawerCloseElement = screen.getByTestId('drawer-close');

    fireEvent.click(drawerCloseElement);
    fireEvent.animationEnd(drawerBackdropElement);

    expect(spy).toHaveBeenCalled();
  });

  it('should not be displayed if the user id is not specified', () => {
    const mockEmptyUserStore = {
      currentUserId: null,
      setCurrentUserId: vi.fn(),
    };

    renderWithAppProviders(
      <UserContext.Provider value={mockEmptyUserStore}>
        <UserOverview />
      </UserContext.Provider>,
    );

    const drawerElement = screen.queryByTestId('drawer');
    expect(drawerElement).not.toBeInTheDocument();
  });

  it('should match snapshot', () => {
    const container = renderWithAppProviders(
      <UserContext.Provider value={mockUserStore}>
        <UserOverview />
      </UserContext.Provider>,
    );

    expect(container).toMatchSnapshot();
  });
});
