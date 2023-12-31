import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    ...['base'].map(name => ({
      name,
      input: `./src/${name}/index.js`,
      outDir: './dist',
    })),
  ],
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
