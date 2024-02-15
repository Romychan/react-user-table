import { cleanup } from '@testing-library/react';

import '@testing-library/jest-dom/vitest';

import { server } from '~/shared/api/msw/server';

import { resetMockDatabase } from './shared/api/msw/';

beforeAll(() => {
  resetMockDatabase();
  server.listen({
    onUnhandledRequest: 'bypass',
  });
});

afterEach(() => {
  resetMockDatabase();
  cleanup();
  server.resetHandlers();
});

afterAll(() => {
  resetMockDatabase();
  server.close();
});
