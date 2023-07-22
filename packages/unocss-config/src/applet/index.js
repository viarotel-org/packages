import { defineConfig, mergeConfigs } from "unocss"
import { presetApplet, presetRemRpx, transformerApplet } from "unocss-applet"

import { presetConfig as baseConfig } from "../base/index.js"

const isApplet = process.env?.UNI_PLATFORM?.startsWith("mp-") || false

const appletPreset = presetApplet({ enable: isApplet })

const presetConfig = mergeConfigs([
  baseConfig,
  {
    presets: [appletPreset, presetRemRpx({ enable: isApplet })],
    transformers: [transformerApplet({ enable: isApplet })],
  },
])

export default defineConfig(presetConfig)
