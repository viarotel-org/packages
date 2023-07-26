import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./src/index'],
  clean: true,
  failOnWarn: false,
  rollup: {
    emitCJS: true,
  },
  externals: [
    '@bundled-es-modules/deepmerge',
    'postcss-nested',
    'postcss-remove-inline-comments',
    'postcss-scss',
  ],
})
