import { kebabCase } from 'lodash-es'

export default async function createComposeWriteProps(
  propName,
  { props, emit, setCallback = null, emitUpdate = true } = {},
) {
  const { computed, ref, unref } = await import('vue')
  const tempProp = ref(null)
  const writeProp = computed({
    get() {
      return tempProp.value || unref(props[propName])
    },
    set(value) {
      if (setCallback)
        setCallback(value)
      if (emitUpdate)
        emit(`update:${kebabCase(propName)}`, value)
      tempProp.value = value
    },
  })

  return writeProp
}
