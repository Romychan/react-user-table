import {
  fireEvent,
  screen,
  render,
  waitFor,
  RenderResult,
} from '@testing-library/react';
import { Mock, MockInstance, vi } from 'vitest';

import * as UserEntity from '~/entities/User';

import { UpdateUser } from './UpdateUser';

const MOCK_USER_STORE = {
  currentUserId: null,
  setCurrentUserId: vi.fn(),
};

describe('UpdateUser', () => {
  let mockStoreSpy: MockInstance<never, never>;
  let mockMutate: Mock<never, never>;
  let container: RenderResult;

  beforeEach(() => {
    mockMutate = vi.fn();

    mockStoreSpy = vi.spyOn(
      MOCK_USER_STORE,
      'setCurrentUserId',
    ) as MockInstance<never, never>;

    vi.spyOn(UserEntity, 'useUpdateUser').mockImplementation(
      vi.fn().mockReturnValue({
        mutate: mockMutate,
      }),
    );

    container = render(
      <UserEntity.UserContext.Provider value={MOCK_USER_STORE}>
        <UpdateUser actionSlot="Action Slot" user={UserEntity.MOCK_USER} />
      </UserEntity.UserContext.Provider>,
    );
  });

  it('should render correctly', () => {
    expect(screen.getAllByRole('textbox')).toHaveLength(6);
    expect(screen.queryAllByRole('alert')).toHaveLength(0);
    expect(screen.getByTestId('update-user')).toBeInTheDocument();
    expect(screen.getByText('Action Slot')).toBeInTheDocument();
  });

  it('should display an error if not all fields have been filled in', async () => {
    fireEvent.change(screen.getByRole('textbox', { name: 'City' }), {
      target: { value: '' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Address' }), {
      target: { value: '' },
    });

    fireEvent.submit(screen.getByTestId('update-user'));

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
    expect(mockMutate).not.toHaveBeenCalled();
    expect(mockStoreSpy).not.toHaveBeenCalled();
  });

  it('should display matching error when email and phone is invalid', async () => {
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: '123' },
    });
    fireEvent.change(screen.getByRole('textbox', { name: 'Phone' }), {
      target: { value: '321' },
    });

    fireEvent.submit(screen.getByTestId('update-user'));

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
    expect(mockMutate).not.toHaveBeenCalled();
    expect(mockStoreSpy).not.toHaveBeenCalled();
  });

  it('should not display error with initial data', async () => {
    fireEvent.submit(screen.getByTestId('update-user'));

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));

    expect(mockStoreSpy).toHaveBeenCalledTimes(1);
    expect(mockMutate).toHaveBeenCalledTimes(1);
  });

  it('should not display error when value is valid', async () => {
    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: 'test@test.test' },
    });

    fireEvent.submit(screen.getByTestId('update-user'));

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));

    expect(mockStoreSpy).toHaveBeenCalledTimes(1);
    expect(mockMutate).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
