import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import useEslint from 'vite-plugin-eslint'
import useUnoCSS from 'unocss/vite'
import resolveConfig from '@viarotel-org/vite-config-vue/src/index.js'
import postcssConfig from './postcss.config.js'

export default defineConfig(
  resolveConfig('2.6.14', {
    plugins: [useEslint(), useUnoCSS()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src/'),
      },
    },
    css: {
      postcss: postcssConfig,
    },
    build: {
      outDir: 'dist',
      minify: false,
    },
    define: {},
  }),
)
