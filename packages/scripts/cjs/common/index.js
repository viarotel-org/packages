const path = require('node:path')
const { promisify } = require('node:util')
const childProcess = require('node:child_process')

/**
 * 执行命令
 */
const exec = promisify(childProcess.exec)

/**
 * 获取完整路径
 */
function getFullPath(
  params = [],
  { basePath = process.cwd(), method = 'join' } = {},
) {
  if (typeof params === 'string') {
    return path[method](basePath, params)
  }

  return path[method](basePath, ...params)
}

/**
 * 获取包管理器名称
 */
function getPackageManager() {
  return (process.env.npm_config_user_agent || '').split('/')[0]
}

module.exports = {
  exec,
  getFullPath,
  getPackageManager,
}
