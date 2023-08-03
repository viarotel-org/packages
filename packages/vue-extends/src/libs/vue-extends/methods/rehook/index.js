/**
 * @param {*} context 自定义当前执行环境
 */
export default async function rehook({ context = this, hooks } = {}) {
  await context.$nextTick()

  const defaultHooks = ['beforeCreate', 'created', 'beforeMount', 'mounted']

  if (typeof hooks === 'function') {
    hooks = hooks(defaultHooks)
  }
  else if (Array.isArray(hooks)) {
    hooks = [...hooks]
  }
  else {
    hooks = [...defaultHooks]
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
