import { camelCase, kebabCase } from 'lodash-es'
// import { ref, computed, unref } from 'vue-demi'

/**
 * 根据传入的props创建局部可写的参数
 * @param {*} propNames
 * @returns
 */
export const createWriteProps = (
  propNames,
  { prefix = 'write', emitUpdate = true, setCallback = null } = {},
) => ({
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
        if (setCallback) setCallback(value)
        if (emitUpdate) this.$emit(`update:${kebabCase(name)}`, value)
        this[camelCase(`temp-${name}`)] = value
      },
    }
    return obj
  }, {}),
})

// export const createComposeWriteProps = (
//   propName,
//   {
//     props, emit, setCallback = null, emitUpdate = true,
//   } = {},
// ) => {
//   console.log('props[propName]', props[propName])
//   const tempProp = ref(null)
//   const writeProp = computed({
//     get() {
//       return tempProp.value || unref(props[propName])
//     },
//     set(value) {
//       if (setCallback) setCallback(value)
//       if (emitUpdate) emit(`update:${kebabCase(propName)}`, value)
//       tempProp.value = value
//     },
//   })

//   return writeProp
// }
