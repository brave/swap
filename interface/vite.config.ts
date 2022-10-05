import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dts from 'vite-plugin-dts'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    sourcemap: true,
    lib: {
      entry: path.resolve(__dirname, 'src/lib.ts'),
      name: 'Swap',
      fileName: 'lib'
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled',
        },
      },
    }
  },
  plugins: [
    react(),
    dts({
      insertTypesEntry: true
    }),
  ],
  resolve: {
    alias: [
      { find: '~', replacement: path.resolve(__dirname, 'src') },
    ],
  },
})
