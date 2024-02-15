import { fireEvent, screen, render } from '@testing-library/react';
import { Mock, vi } from 'vitest';
import { NIL as NIL_UUID } from 'uuid';

import * as UserEntity from '~/entities/User';

import { DeleteUser } from './DeleteUser';

describe('DeleteUser', () => {
  let mockMutate: Mock<never, never>;

  beforeEach(() => {
    mockMutate = vi.fn();

    vi.spyOn(UserEntity, 'useDeleteUser').mockImplementation(
      vi.fn().mockReturnValue({
        mutate: mockMutate,
      }),
    );
  });

  it('should render correctly', () => {
    const handleComplete = vi.fn();
    render(<DeleteUser id={NIL_UUID} onComplete={handleComplete} />);

    const deleteUserElement = screen.getByTestId('delete-user');
    expect(deleteUserElement).toBeInTheDocument();
  });

  it('should delete the user correctly', () => {
    const handleComplete = vi.fn();

    render(<DeleteUser id={NIL_UUID} onComplete={handleComplete} />);

    const deleteUserElement = screen.getByTestId('delete-user');

    fireEvent.click(deleteUserElement);

    expect(mockMutate).toHaveBeenCalled();
    expect(handleComplete).toHaveBeenCalled();
  });

  it('should match snapshot', () => {
    const handleComplete = vi.fn();
    const container = render(
      <DeleteUser id={NIL_UUID} onComplete={handleComplete} />,
    );

    expect(container).toMatchSnapshot();
  });
});
