import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      fileName: 'plugin',
      formats: ['es', 'cjs'],
      entry: resolve(__dirname, 'src/plugin.ts')
    },
    rollupOptions: {
      external: [
        'grapesjs'
      ]
    }
  },
  plugins: [
    dts({
      exclude: [
        './src/editor.ts'
      ]
    })
  ]
})
