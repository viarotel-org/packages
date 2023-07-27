import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    ...['createComposeWriteProps', 'createWriteProps'].map(name => ({
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
  externals: ['vue', 'lodash-es'],
})
