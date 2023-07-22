import { defineConfig } from "vite"
import useVue from "@vitejs/plugin-vue"
import useJsx from "@vitejs/plugin-vue-jsx"
import * as compiler from "@vue/compiler-sfc"

export const presetConfig = {
  plugins: [
    useVue({
      compiler,
    }),
    useJsx(),
  ],
  resolve: {
    alias: {
      vue: "vue3",
    },
  },
}

export default defineConfig(presetConfig)
