// import { defineConfig } from 'vite'
import { resolve } from 'node:path'
import useEslint from 'vite-plugin-eslint'
import useUnoCSS from 'unocss/vite'
import resolveConfig from '@viarotel-org/vite-config-vue2'
import postcssConfig from './postcss.config.js'

export default resolveConfig({
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
})
