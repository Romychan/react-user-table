import { render, screen } from '@testing-library/react';

import { UserAvatar } from './UserAvatar';

describe('UserAvatar', () => {
  it('should render correctly', () => {
    render(<UserAvatar image="test-src" name="Test" username="testname" />);

    const avatarElement = screen.getByTestId('avatar');
    const nameElement = screen.getByText('Test');
    const usernameElement = screen.getByText('testname');
    const imageElement = screen.getByRole('img');

    expect(avatarElement).toBeInTheDocument();
    expect(nameElement).toBeInTheDocument();
    expect(usernameElement).toBeInTheDocument();
    expect(imageElement.getAttribute('src')).toMatch('test-src');
  });

  it('should match snapshot', () => {
    const container = render(
      <UserAvatar image="test-src" name="Test" username="testname" />,
    );

    expect(container).toMatchSnapshot();
  });
});
