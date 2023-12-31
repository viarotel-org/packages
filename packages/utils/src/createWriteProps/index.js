import { camelCase, kebabCase } from 'lodash-es'

/**
 * 根据传入的props创建局部可写的参数
 * @param {*} propNames
 * @returns
 */
export default function createWriteProps(
  propNames,
  { prefix = 'write', emitUpdate = true, setCallback = null } = {},
) {
  return {
    data: propNames.reduce((obj, name) => {
      obj[camelCase(`temp-${name}`)] = null
      return obj
    }, {}),
    computed: propNames.reduce((obj, name) => {
      obj[camelCase(`${prefix}-${name}`)] = {
        get() {
          return this[camelCase(`temp-${name}`)] || this[name]
        },
        set(value) {
          if (setCallback)
            setCallback(value)
          if (emitUpdate)
            this.$emit(`update:${kebabCase(name)}`, value)
          this[camelCase(`temp-${name}`)] = value
        },
      }
      return obj
    }, {}),
  }
}
