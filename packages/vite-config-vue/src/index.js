import { mergeConfig } from "vite"

async function viteConfig(version = "", config = {}) {
  const configModel = baseConfig => mergeConfig(baseConfig, config)

  const splitVersion = version.split(".")
  // console.log('splitVersion', splitVersion)

  if (splitVersion[0] === "3") {
    const { presetConfig: viteConfigVue3 } = await import(
      "@viarotel-org/vite-config-vue3"
    )
    return configModel(viteConfigVue3)
  }

  if (splitVersion[0] === "2") {
    if (splitVersion[1] >= "7") {
      const { presetConfig: viteConfigVue2s } = await import(
        "@viarotel-org/vite-config-vue2s"
      )
      return configModel(viteConfigVue2s)
    }

    const { presetConfig: viteConfigVue2 } = await import(
      "@viarotel-org/vite-config-vue2"
    )
    return configModel(viteConfigVue2)
  }

  return config
}

export default viteConfig
