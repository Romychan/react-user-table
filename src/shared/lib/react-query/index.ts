import { QueryClient } from '@tanstack/react-query';

/** An instance of the `QueryClient` from the `react-query` for the application */
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});
