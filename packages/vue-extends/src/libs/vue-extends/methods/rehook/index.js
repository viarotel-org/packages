/**
 * @param {*} context 自定义当前执行环境
 */
export default async function rehook(params, { context = this } = {}) {
  await context.$nextTick()

  const hooks = []

  if (typeof params === 'string') {
    hooks.push(...params.split(','))
  }
  else if (Array.isArray(params)) {
    hooks.push(...params)
  }

  if (!hooks.length) {
    hooks.push('beforeCreate', 'created', 'beforeMount', 'mounted')
  }

  hooks.forEach((key) => {
    const hook = context.$options[key]

    if (!hook)
      return

    if (typeof hook === 'function') {
      hook.call(context)
    }
    else if (Array.isArray(hook)) {
      hook.forEach(item => item.call(context))
    }
  })
}
