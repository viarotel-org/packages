import { resolve } from 'node:path'
import useUnoCSS from 'unocss/vite'
import extendConfig from '@viarotel-org/vite-config-vue2'
import postcssConfig from '@viarotel-org/postcss-config'

export default extendConfig({
  // @ts-expect-error
  plugins: [useUnoCSS()],
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
