import { mergeConfigs } from 'unocss'
import { presetApplet, presetRemRpx, transformerApplet } from 'unocss-applet'

import baseConfig from '../base/index.js'

function presetConfig(...configs) {
  const isApplet = process.env?.UNI_PLATFORM?.startsWith('mp-') || false
  const appletPreset = presetApplet({ enable: isApplet })
  return mergeConfigs([
    baseConfig(),
    {
      presets: [appletPreset, presetRemRpx({ enable: isApplet })],
      transformers: [transformerApplet({ enable: isApplet })],
    },
    ...configs,
  ])
}

export default presetConfig
