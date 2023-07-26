import { mergeConfig } from 'vite'
import useVue from '@vitejs/plugin-vue'
import useJsx from '@vitejs/plugin-vue-jsx'
import * as compiler from '@vue/compiler-sfc'

export function presetConfig(config = {}) {
  return mergeConfig(
    {
      plugins: [
        useVue({
          compiler,
        }),
        useJsx(),
      ],
      resolve: {
        alias: {
          vue: 'vue3',
        },
      },
    },
    config,
  )
}

export default presetConfig
