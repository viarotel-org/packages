import { defineConfig } from 'vite'
import useVue2 from '@vitejs/plugin-vue2'
import baseConfig from './vite.config.js'

export default defineConfig({
  ...baseConfig,
  plugins: [...baseConfig.plugins, useVue2()],
  // @ts-ignore
  build: {
    outDir: './dist/vue2',
  },
})
