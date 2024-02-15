import {
  fireEvent,
  screen,
  render,
  waitFor,
  RenderResult,
} from '@testing-library/react';
import { Mock, vi } from 'vitest';

import * as UserEntity from '~/entities/User';

import { AddForm } from './AddForm';

describe('AddForm', () => {
  let mockMutate: Mock<never, never>;
  let handleComplete: Mock<never, never>;
  let container: RenderResult;

  beforeEach(() => {
    mockMutate = vi.fn();
    handleComplete = vi.fn();

    vi.spyOn(UserEntity, 'useCreateUser').mockImplementation(
      vi.fn().mockReturnValue({
        mutate: mockMutate,
      }),
    );

    container = render(<AddForm onComplete={handleComplete} />);
  });

  it('should render correctly', () => {
    expect(screen.getAllByRole('textbox')).toHaveLength(6);
    expect(screen.queryAllByRole('alert')).toHaveLength(0);
    expect(screen.getByTestId('add-user')).toBeInTheDocument();
    expect(screen.getByTestId('cancel-add-user')).toBeInTheDocument();
  });

  it('should handle clicking on the cancel button correctly', () => {
    const cancelButton = screen.getByTestId('cancel-add-user');

    fireEvent.click(cancelButton);

    expect(handleComplete).toHaveBeenCalled();
  });

  it('should display an error if not all fields have been filled in', async () => {
    fillFormInputs();

    fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), {
      target: { value: '' },
    });

    fireEvent.change(screen.getByRole('textbox', { name: 'Username' }), {
      target: { value: '' },
    });

    fireEvent.submit(screen.getByTestId('add-user'));

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
    expect(handleComplete).not.toHaveBeenCalled();
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('should display matching error when email and phone is invalid', async () => {
    fillFormInputs();

    fireEvent.change(screen.getByRole('textbox', { name: 'Email' }), {
      target: { value: '123' },
    });

    fireEvent.change(screen.getByRole('textbox', { name: 'Phone' }), {
      target: { value: '321' },
    });

    fireEvent.submit(screen.getByTestId('add-user'));

    expect(await screen.findAllByRole('alert')).toHaveLength(2);
    expect(handleComplete).not.toHaveBeenCalled();
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('should not display error when value is valid', async () => {
    fillFormInputs();

    fireEvent.submit(screen.getByTestId('add-user'));

    await waitFor(() => expect(screen.queryAllByRole('alert')).toHaveLength(0));

    expect(handleComplete).toHaveBeenCalledTimes(1);
    expect(mockMutate).toHaveBeenCalledTimes(1);
  });

  it('should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});

const fillFormInputs = () => {
  fireEvent.change(screen.getByRole('textbox', { name: 'Name' }), {
    target: { value: 'Name' },
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
};
