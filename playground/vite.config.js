import useEslint from 'vite-plugin-eslint'
import useUnoCSS from 'unocss/vite'
import postcssConfig from './postcss.config.js'

// https://vitejs.dev/config/
export default {
  plugins: [useEslint(), useUnoCSS()],
  css: {
    postcss: postcssConfig,
  },
  build: {
    outDir: 'dist',
  },
}
