import { loadEnv } from 'vite'
import { resolve } from 'path'
import useEslint from 'vite-plugin-eslint'
import useUnoCSS from 'unocss/vite'
import viteConfig from '@viarotel-org/vite-config-vue'
import postcssConfig from './postcss.config.js'

// console.log(process.env.VUE_VERSION)

export default viteConfig('2.7.0', ({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const version = env.VITE_VUE_VERSION
  console.log('version', version)

  return {
    plugins: [useEslint(), useUnoCSS()],
    resolve: {
      alias: {
        '@': resolve(__dirname, './src/'),
      },
    },
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
        fileName: `float-bubble.vue@${version}`,
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
    define: {
      ...env,
    },
  }
})
