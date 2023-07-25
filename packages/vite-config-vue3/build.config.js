import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index'],
  clean: true,
  failOnWarn: false,
  rollup: {
    emitCJS: true,
  },
  externals: [
    'vite',
    '@vitejs/plugin-vue',
    '@vitejs/plugin-vue-jsx',
    '@vue/compiler-sfc',
    'vue3',
  ],
})
