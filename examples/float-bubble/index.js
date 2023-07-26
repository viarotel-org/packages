const { copyPackage } = require('@viarotel-org/scripts')

copyPackage('@viarotel-org/float-bubble/dist/example', './dist', {
  basePath: __dirname,
})
