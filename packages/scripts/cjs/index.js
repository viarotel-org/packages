const copackage = require('./copackage/index.js')
const repackage = require('./repackage/index.js')
const common = require('./common/index.js')

module.exports = {
  ...common,
  copackage,
  repackage,
}
