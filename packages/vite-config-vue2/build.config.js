import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index'],
  clean: true,
  failOnWarn: false,
  rollup: {
    emitCJS: true,
  },
  externals: ['vite', 'vite-plugin-vue2', 'vue-template-compiler', 'vue2'],
})
