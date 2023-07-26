import nested from 'postcss-nested'
import removeInlineComments from 'postcss-remove-inline-comments'
import postcssScss from 'postcss-scss'
import deepmerge from '@bundled-es-modules/deepmerge'

export function mergeConfig(...params) {
  return deepmerge(...params)
}

function presetConfig(config) {
  return mergeConfig(
    {
      parser: postcssScss,
      plugins: [removeInlineComments, nested],
    },
    config,
  )
}

export default presetConfig
