/// <reference types="vitest" />
/// <reference types="vite/client" />

import path from 'path';

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, 'src/setupTest.ts')],
  },
  server: {
    host: true,
    port: 3000,
    strictPort: true,
    watch: {
      usePolling: true,
    },
  },
  resolve: {
    alias: {
      '~/app': path.resolve(__dirname, 'src/app'),
      '~/processes': path.resolve(__dirname, 'src/processes'),
      '~/pages': path.resolve(__dirname, 'src/pages'),
      '~/widgets': path.resolve(__dirname, 'src/widgets'),
      '~/features': path.resolve(__dirname, 'src/features'),
      '~/entities': path.resolve(__dirname, 'src/entities'),
      '~/shared': path.resolve(__dirname, 'src/shared'),
    },
  },
});
