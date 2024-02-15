import { RenderResult, render, screen } from '@testing-library/react';

import { Icon } from './Icon';

describe('Icon', () => {
  let container: RenderResult;

  beforeEach(() => {
    container = render(<Icon name="chevron" size={18} stroke="#ffffff" />);
  });

  it('should render correctly', () => {
    const icon = screen.getByTestId('icon');

    expect(icon).toBeInTheDocument();
    expect(icon.getAttribute('stroke')).toMatch(/#ffffff/gi);
  });

  it('should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
