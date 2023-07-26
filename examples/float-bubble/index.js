const { copyPackage } = require('@viarotel-org/scripts')

copyPackage('@viarotel-org/float-bubble/dist/example', './example', {
  basePath: __dirname,
})
