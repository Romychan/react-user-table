import { ReactElement, PropsWithChildren } from 'react';
import { QueryClientProvider } from '@tanstack/react-query';
import { render, RenderOptions } from '@testing-library/react';

import { ToastProvider } from '../../../ui/Toast';
import { testQueryClient } from '../react-query';

/**
 * A wrapper function with the main application providers for testing components
 *
 * @param ui React element that should be wrapped main application providers
 * @param renderOptions Additional options for rendering in test
 *
 * @returns A component wrapped in an main application providers and methods for working with it
 */
export const renderWithAppProviders = (
  ui: ReactElement,
  renderOptions: RenderOptions = {},
) => {
  const Wrapper = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
    return (
      <QueryClientProvider client={testQueryClient}>
        <ToastProvider>{children}</ToastProvider>
      </QueryClientProvider>
    );
  };

  return { ...render(ui, { wrapper: Wrapper, ...renderOptions }) };
};
