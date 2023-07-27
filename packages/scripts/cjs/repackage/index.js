const path = require('node:path')
const fs = require('fs-extra')

const { getPackageManager, getFullPath, exec } = require('../common/index.js')

async function replaceFile(filePath, replacements) {
  const fileContent = await fs.readFile(filePath, 'utf-8')

  // 根据替换对象逐个替换
  let newContent = fileContent
  Object.entries(replacements).forEach(([data, newData]) => {
    const regex = new RegExp(data, 'gi')
    newContent = newContent.replace(regex, newData)
  })

  // 写入修改后的内容到文件
  await fs.writeFile(filePath, newContent, 'utf-8')
}

async function searchRemove(
  rule,
  { basePath = process.cwd(), dirPath = '', callback = () => {} } = {},
) {
  if (typeof rule !== 'function') {
    const reg = rule
    rule = file => reg && new RegExp(reg).test(file)
  }

  try {
    const patches = await fs.readdir(getFullPath('patches', { basePath }))
    for (let index = 0; index < patches.length; index++) {
      const file = patches[index]
      if (rule(file)) {
        const fullPath = getFullPath([dirPath, file], { basePath })
        // @ts-expect-error
        await callback(fullPath)
        await fs.remove(fullPath)
        throw new Error(`${fullPath} remove success`)
      }
    }
  }
  catch (error) {
    console.log('searchRemove', error?.message)
  }
}

async function patchPackage(packageName) {
  const manager = getPackageManager()
  try {
    switch (manager) {
      case 'yarn':
        await exec(`${manager} patch-package ${packageName}`)
        break
      case 'pnpm':
        {
          const { stdout } = await exec(`${manager} patch ${packageName}`)
          // console.log('stdout', stdout)
          const patchCommit = stdout.match(/"([^"]+)"/)?.[1] || ''
          console.log('请在以下文件中手动进行处理')
          console.log('patchCommit', patchCommit)
          // if (patchCommit) {
          //   await exec(patchCommit)
          // }
        }
        break
    }
  }
  catch (error) {
    console.log('patchPackage.error', error)
  }
}

async function repackage(
  replacements,
  {
    filePath = '',
    isPatch = false,
    rootDir = 'node_modules',
    basePath = process.cwd(),
  } = {},
) {
  const fullPath = getFullPath([rootDir, filePath], { basePath })
  const packageName = filePath.split('/')[0]
  const manager = getPackageManager()

  try {
    if (!isPatch) {
      await replaceFile(fullPath, replacements)
      return
    }

    await searchRemove(packageName, {
      basePath,
      dirPath: 'patches',
      callback: async (file) => {
        if (manager === 'pnpm') {
          const pkg = path.parse(file).name
          console.log('pkg', pkg)
          await exec(`pnpm patch-remove ${pkg}`)
        }
      },
    })
    await exec(`${manager} add ${packageName}`)
    await replaceFile(fullPath, replacements)
    await patchPackage(packageName)
    console.log(`替换文件内容成功：${fullPath}`)
  }
  catch (error) {
    console.error(`替换文件内容失败：${error}`)
  }
}

module.exports = repackage
