const path = require('node:path')
const fs = require('fs-extra')

async function copyPackage(
  sourcePath,
  targetPath = './dist',
  { basePath = process.cwd() },
) {
  const sourceDir = path.join(basePath, 'node_modules', sourcePath)
  const targetDir = path.resolve(basePath, targetPath)

  return fs.copy(sourceDir, targetDir, { dereference: true }).catch((err) => {
    console.error('Error copying packages:', err)
    throw err
  })
}

module.exports = copyPackage
