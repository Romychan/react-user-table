import { Decorator } from '@storybook/react';
import { QueryClientProvider } from '@tanstack/react-query';

import { ToastProvider } from '../../../ui/Toast';
import { queryClient } from '../../react-query';

/** Wrapper decorator with the main application providers for components */
export const withAppProvidersDecorator: Decorator = (Story) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ToastProvider>
        <Story />
      </ToastProvider>
    </QueryClientProvider>
  );
};
