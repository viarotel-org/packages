import nested from 'postcss-nested'
import removeInlineComments from 'postcss-remove-inline-comments'
import postcssScss from 'postcss-scss'
import { defu } from 'defu'

export function mergeConfig(...params) {
  return defu(...params)
}

function presetConfig(config) {
  return mergeConfig(config, {
    parser: postcssScss,
    plugins: [removeInlineComments, nested],
  })
}

export default presetConfig
