import { defineConfig } from 'vite'
import useVue from '@vitejs/plugin-vue'
import baseConfig from './vite.config.js'

export default defineConfig({
  ...baseConfig,
  plugins: [...baseConfig.plugins, useVue()],
  // @ts-ignore
  build: {
    ...baseConfig.build,
    outDir: './dist/vue3',
  },
})
