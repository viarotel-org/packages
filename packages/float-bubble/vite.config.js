import { resolve } from 'node:path'
import { loadEnv } from 'vite'
import useEslint from 'vite-plugin-eslint'
import useUnoCSS from 'unocss/vite'
import extendConfig from '@viarotel-org/vite-config-vue'
import postcssConfig from '@viarotel-org/postcss-config'

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  const version = env.VITE_VUE_VERSION
  console.log('version', version)

  const demoMode = mode === 'demo'
  let buildConfig = {}
  if (!demoMode) {
    buildConfig = {
      lib: {
        entry: resolve(__dirname, 'src/libs/index.js'),
        name: 'FloatBubble',
        fileName: 'float-bubble',
        formats: ['es', 'cjs', 'umd'],
      },
      rollupOptions: {
        external: ['vue', 'vue-demi'],
        output: {
          globals: {
            'vue': 'Vue',
            'vue-demi': 'VueDemi',
          },
        },
      },
    }
  }

  return extendConfig({
    version,
    // @ts-expect-error
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
      outDir: `dist/${mode}`,
      minify: false,
      ...buildConfig,
    },
    define: {
      ...env,
    },
  })
}
