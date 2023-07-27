import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: [
    './src/index',
    ...['applet', 'base', 'desktop'].map(name => ({
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
    'unocss',
    'unocss-applet',
    '@unocss/transformer-directives',
    '@unocss/core',
    'css-tree',
    'source-map-js/lib/source-map-generator.js',
  ],
})
