import { ReactElement, PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';

import { testQueryClient } from '../react-query';

/**
 * Wrapper function with `QueryClientProvider` for testing components using hooks from `react-query`
 *
 * @param ui React element that should be wrapped by the `QueryClientProvider`
 * @param renderOptions Additional options for rendering in test
 *
 * @returns A component wrapped in an `QueryClientProvider` and methods for working with it
 */
export const renderWithQueryProvider = (
  ui: ReactElement,
  renderOptions: RenderOptions = {},
) => {
  const Wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
    return (
      <QueryClientProvider client={testQueryClient}>
        {children}
      </QueryClientProvider>
    );
  };

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
