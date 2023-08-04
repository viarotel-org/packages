/**
 * 重置 data 中的数据
 * @param {*} context 自定义当前执行环境
 */
export default async function redata(params, { context = this } = {}) {
  const keys = []
  if (typeof params === 'string') {
    keys.push(params)
  }
  else if (Array.isArray(params)) {
    keys.push(...params)
  }

  let rawData = Object.entries(context.$options.data())

  if (keys.length) {
    rawData = rawData.filter(([key]) => keys.includes(key))
  }

  rawData.forEach(([key, value]) => {
    context.$data[key] = value
  })
}
