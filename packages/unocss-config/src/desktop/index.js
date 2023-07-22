import { defineConfig, mergeConfigs } from "unocss"

import { presetConfig as baseConfig } from "../base/index.js"

const presetConfig = mergeConfigs([
  baseConfig,
  {
    theme: {
      boxShadow: {
        "el": "var(--el-box-shadow)",
        "el-light": "var(--el-box-shadow-light)",
        "el-lighter": "var(--el-box-shadow-lighter)",
        "el-dark": "var(--el-box-shadow-dark)",
      },
    },
  },
])

export default defineConfig(presetConfig)
