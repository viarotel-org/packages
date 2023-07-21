import { defineConfig } from 'vite'
import useVue from '@vitejs/plugin-vue'
import compiler from '@vue/compiler-sfc'

export const presetConfig = {
  plugins: [
    useVue({
      compiler,
    }),
  ],
  resolve: {
    alias: {
      vue: 'vue3',
    },
  },
}

export default defineConfig(presetConfig)
