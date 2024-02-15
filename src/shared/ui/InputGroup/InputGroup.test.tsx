import { render, screen, RenderResult } from '@testing-library/react';

import { InputGroup } from './InputGroup';

describe('InputGroup', () => {
  let container: RenderResult;

  beforeEach(() => {
    container = render(
      <InputGroup
        startContent="startContent"
        endContent={<button>Test</button>}
      />,
    );
  });

  it('should render correctly', () => {
    const startContentElement = screen.getByText(/startContent/i);
    const endContentElement = screen.getByRole('button', { name: /test/i });

    expect(startContentElement).toBeInTheDocument();
    expect(endContentElement).toBeInTheDocument();
  });

  it('should match snapshot', () => {
    expect(container).toMatchSnapshot();
  });
});
