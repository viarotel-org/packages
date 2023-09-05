import type { Preset } from 'unocss'
import { generateShades } from './helpers'
import type { ShadesOptions } from './helpers'

export * from './helpers'

interface ColorOptions {
  [key: number]: string
  DEFAULT: string
}

export interface PresetOptions extends ShadesOptions {
  primaryKey?: string
}

export function presetShades(
  colorValue: string = '',
  { primaryKey = 'primary', ...options }: PresetOptions = {},
): Preset {
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
        [primaryKey]: shadeList.reduce(
          (obj: ColorOptions, [key]: [string | number, string]) => {
            if (key === 'DEFAULT') {
              obj[
                key as keyof ColorOptions
              ] = `rgba(var(--color-${primaryKey}), <alpha-value>)`
            }
            else {
              obj[
                key as keyof ColorOptions
              ] = `rgba(var(--color-${primaryKey}-${key}), <alpha-value>)`
            }
            return obj
          },
          {} as ColorOptions,
        ),
      },
    },
  }
}
