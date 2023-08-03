import { mergeConfigs } from 'unocss'
import { presetDaisy } from 'unocss-preset-daisy'
import baseConfig from '../base/index.js'

function presetConfig(...configs) {
  return mergeConfigs([
    baseConfig(),
    {
      presets: [presetDaisy()],
    },
    ...configs,
  ])
}

export default presetConfig
