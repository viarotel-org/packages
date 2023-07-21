import { defineConfig } from 'vite'
import useVue from '@vitejs/plugin-vue'

export const baseConfig = {
  plugins: [useVue()],
}

export default defineConfig(baseConfig)
