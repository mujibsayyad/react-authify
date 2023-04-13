import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  plugins: [dts()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      name: 'react-authify',
      formats: ['es'],
      fileName: () => `index.js`,
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.tsx'),
        nested: resolve(__dirname, 'src/hooks/useFetchApi.ts'),
      },
      external: ['react', 'react-dom', 'react/jsx-runtime']
    },
  },
});
