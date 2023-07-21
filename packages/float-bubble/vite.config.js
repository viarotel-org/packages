import { resolve } from 'node:path'
import { defineConfig, loadEnv } from 'vite'
import useEslint from 'vite-plugin-eslint'
import useUnoCSS from 'unocss/vite'
import resolveConfig from '@viarotel-org/vite-config-vue'
import postcssConfig from './postcss.config.js'

// @ts-expect-error
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const version = env.VITE_VUE_VERSION
  console.log('version', version)

  return resolveConfig(version, {
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
      outDir: `dist/${mode}`,
      lib: {
        entry: resolve(__dirname, 'src/libs/index.js'),
        name: 'FloatBubble',
        fileName: `float-bubble`,
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
  })
})
