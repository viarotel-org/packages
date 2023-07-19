import { resolve } from 'path'
import useEslint from 'vite-plugin-eslint'
import useUnoCSS from 'unocss/vite'
import postcssConfig from './postcss.config.js'

// https://vitejs.dev/config/
export default {
  plugins: [useEslint(), useUnoCSS()],
  css: {
    postcss: postcssConfig,
  },
  optimizeDeps: {
    exclude: ['vue-demi'],
  },
  build: {
    outDir: 'dist',
    lib: {
      entry: resolve(__dirname, 'src/libs/index.js'),
      name: 'FloatBubble',
      fileName: 'float-bubble',
      formats: ['es', 'cjs', 'umd'],
    },
    rollupOptions: {
      external: ['vue', 'vue-demi'],
      output: {
        exports: 'named',
        manualChunks: undefined,
      },
    },
    minify: false,
  },
}
