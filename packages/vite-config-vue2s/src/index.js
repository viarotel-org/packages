import { mergeConfig } from 'vite'
import useVue2s from '@vitejs/plugin-vue2'
import useJsx2s from '@vitejs/plugin-vue2-jsx'
import * as compiler from '@vue/compiler-sfc'

export function presetConfig(config = {}) {
  return mergeConfig(
    {
      plugins: [
        useVue2s({
          compiler,
        }),
        useJsx2s(),
      ],
      resolve: {
        alias: {
          vue: 'vue2s',
        },
      },
    },
    config,
  )
}

export default presetConfig
