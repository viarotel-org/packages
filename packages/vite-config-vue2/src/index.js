import { mergeConfig } from 'vite'
import { createVuePlugin as useVue2 } from 'vite-plugin-vue2'
import * as compiler from 'vue-template-compiler'

export function presetConfig(config = {}) {
  return mergeConfig(
    {
      plugins: [
        useVue2({
          vueTemplateOptions: {
            compiler,
          },
          jsx: true,
        }),
      ],
      resolve: {
        alias: {
          vue: 'vue2',
        },
      },
    },
    config,
  )
}

export default presetConfig
