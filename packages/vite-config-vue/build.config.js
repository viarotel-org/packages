import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    {
      name: 'vue2',
      input: './src/vue2/index.js',
      outDir: './dist',
    },
    {
      name: 'vue2s',
      input: './src/vue2s/index.js',
      outDir: './dist',
    },
    {
      name: 'vue3',
      input: './src/vue3/index.js',
      outDir: './dist',
    },
  ],
  clean: true,
  failOnWarn: false,
  rollup: {
    emitCJS: true,
  },
  externals: [
    'vite',
    '@viarotel-org/vite-config-vue2',
    '@viarotel-org/vite-config-vue2s',
    '@viarotel-org/vite-config-vue3',
  ],
})
