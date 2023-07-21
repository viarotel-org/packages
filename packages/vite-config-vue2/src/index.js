import { defineConfig } from 'vite'
import { createVuePlugin as useVue2 } from 'vite-plugin-vue2'

export const baseConfig = {
  plugins: [useVue2()],
}

export default defineConfig(baseConfig)
