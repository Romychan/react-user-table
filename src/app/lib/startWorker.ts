import { userHandlers } from '~/entities/User';

/**
 * A function to start the MSW worker to intercept requests
 *
 * @returns Promise with worker
 */
export const startWorker = async () => {
  const { worker } = await import('~/shared/api/msw/browser');
  worker.use(...userHandlers);

  return worker.start({ onUnhandledRequest: 'bypass' });
};
