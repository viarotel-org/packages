import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import useEslint from 'vite-plugin-eslint'
import useUnoCSS from 'unocss/vite'
import postcssConfig from './postcss.config.js'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [useEslint(), useUnoCSS(), vue()],
  css: {
    postcss: postcssConfig,
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'src/libs/index.js'),
      name: 'FloatBubble',
      fileName: 'float-bubble',
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
})
