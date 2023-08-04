import redata from '../redata/index.js'
import rehook from '../rehook/index.js'

/**
 * 重置 data 中的数据并重新触发钩子函数
 * @param {*} context 自定义当前执行环境
 */
export default async function reload({
  context = this,
  nextTick = true,
  forceUpdate = false,
} = {}) {
  await redata.call(context)

  if (nextTick) {
    await context.$nextTick()
  }

  if (forceUpdate) {
    await context.$forceUpdate()
  }

  await rehook.call(context)
}
