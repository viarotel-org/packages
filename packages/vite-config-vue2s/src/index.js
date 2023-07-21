import { defineConfig } from 'vite'
import useVue2s from '@vitejs/plugin-vue2'

export const baseConfig = {
  plugins: [useVue2s()],
}

export default defineConfig(baseConfig)
