import { Decorator } from '@storybook/react';
import { QueryClientProvider } from '@tanstack/react-query';

import { queryClient } from '../../react-query';

/** Wrapper decorator with `QueryClientProvider` for components using hooks from `react-query` */
export const withQueryClientProvider: Decorator = (Story) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Story />
    </QueryClientProvider>
  );
};
