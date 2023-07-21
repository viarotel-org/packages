import { defineConfig } from 'vite'
import { createVuePlugin as useVue2 } from 'vite-plugin-vue2'
import compiler from 'vue-template-compiler'

export const presetConfig = {
  plugins: [
    useVue2({
      vueTemplateOptions: {
        compiler,
      },
    }),
  ],
  resolve: {
    alias: {
      vue: 'vue2',
    },
  },
}

export default defineConfig(presetConfig)
