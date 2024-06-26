import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    minify: true,
    sourcemap: false,
    rollupOptions: {
      input: './src/App.tsx',
    },
  },
});
