import { generateShades } from './helpers.js'

export * from './helpers.js'

export function presetShades(
  colorValue,
  { primaryKey = 'primary', ...options } = {},
) {
  const shades = generateShades(colorValue, {
    returnRgb: true,
    ...options,
  })
  // console.log('shades', shades)
  const shadeList = Object.entries(shades)

  return {
    name: 'presetShades',
    preflights: [
      {
        getCSS: () => {
          const vars = shadeList.reduce((style, [key, value]) => {
            if (key === 'DEFAULT') {
              style += `--color-${primaryKey}: ${value};`
            }
            else {
              style += `--color-${primaryKey}-${key}: ${value};`
            }
            return style
          }, '')

          return `
            :root, page {
              ${vars}
            }
          `
        },
      },
    ],
    theme: {
      colors: {
        [primaryKey]: shadeList.reduce((obj, [key]) => {
          if (key === 'DEFAULT') {
            obj[key] = `rgba(var(--color-${primaryKey}), <alpha-value>)`
          }
          else {
            obj[key] = `rgba(var(--color-${primaryKey}-${key}), <alpha-value>)`
          }
          return obj
        }, {}),
      },
    },
  }
}
