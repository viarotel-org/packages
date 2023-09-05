import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    ...['helpers'].map(name => ({
      name,
      input: `./src/${name}.js`,
      outDir: './dist',
    })),
  ],
  clean: true,
  failOnWarn: false,
  rollup: {
    emitCJS: true,
  },
  externals: ['color'],
})
