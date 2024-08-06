import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react';
import packageJson from './package.json';

export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(packageJson.version),
  },
  server: {
    port: 3000,
  },
  plugins: [react()],
  test: {
    environment: "jsdom",
    include: ['**/*.test.tsx'],
    globals: true
  },
});
