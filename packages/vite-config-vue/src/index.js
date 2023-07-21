import { mergeConfig } from 'vite'

const viteConfig = async (version = '', config = {}) => {
  const configModel = (baseConfig) => (...params) => mergeConfig(
    baseConfig,
    typeof config === 'function' ? config(...params) : config,
  )

  const splitVersion = version.split('.')

  console.log('splitVersion', splitVersion)

  if (splitVersion[0] === '3') {
    const { default: viteConfigVue3 } = await import(
      '@viarotel-org/vite-config-vue3'
    )
    return configModel(viteConfigVue3)
  }

  if (splitVersion[0] === '2') {
    if (splitVersion[1] >= '7') {
      const { default: viteConfigVue2s } = await import(
        '@viarotel-org/vite-config-vue2s'
      )
      return configModel(viteConfigVue2s)
    }

    const { default: viteConfigVue2 } = await import(
      '@viarotel-org/vite-config-vue2'
    )
    return configModel(viteConfigVue2)
  }
}

export default viteConfig
