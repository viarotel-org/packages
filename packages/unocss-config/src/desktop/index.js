import { mergeConfigs } from "unocss"
import baseConfig from "../base/index.js"

function presetConfig(...configs) {
  return mergeConfigs([
    baseConfig(),
    {
      name: "desktopPreset",
      presets: [],
      theme: {
        boxShadow: {
          "el": "var(--el-box-shadow)",
          "el-light": "var(--el-box-shadow-light)",
          "el-lighter": "var(--el-box-shadow-lighter)",
          "el-dark": "var(--el-box-shadow-dark)",
        },
      },
    },
    ...configs,
  ])
}

export default presetConfig
