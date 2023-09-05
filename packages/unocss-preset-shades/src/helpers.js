import Color from 'color'

/**
 * 根据基础颜色生成不同深度的颜色
 * @param {string} colorValue 基础色值
 * @param {array} shades
 * @param {number} baseShade
 * @param {boolean} returnRgb
 * @returns
 */
export function generateShades(
  colorValue,
  {
    shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
    baseShade = 500,
    returnRgb = false,
  } = {},
) {
  const baseColor = Color(colorValue)
  // console.log('baseColor', baseColor)

  const getColor = color =>
    returnRgb ? color.round().color.join(',') : color.hex()

  const value = shades.reduce(
    (obj, shadeValue) => {
      if (baseShade === shadeValue) {
        obj[shadeValue] = obj.DEFAULT
      }
      else if (shadeValue < baseShade) {
        const weight = 1 - shadeValue / baseShade
        const whiten = baseColor.mix(Color('white'), weight)
        obj[shadeValue] = getColor(whiten)
      }
      else {
        const weight = (shadeValue - baseShade) / (1000 - baseShade)
        const blacken = baseColor.mix(Color('black'), weight)
        obj[shadeValue] = getColor(blacken)
      }
      return obj
    },
    {
      DEFAULT: getColor(baseColor),
    },
  )

  // console.log('generateShades.value', value)

  return value
}

/**
 * 更新主题色变量
 * @param {*} baseColor 新的基础色值
 */
export function updateShades(baseColor) {
  const shadeColors = generateShades(baseColor, { returnRgb: true })

  const setProperty = (key, value) =>
    document.documentElement.style.setProperty(key, value)

  Object.entries(shadeColors).forEach(([weight, colorValue]) => {
    if (weight === 'DEFAULT') {
      setProperty('--color-primary', colorValue)
    }
    else {
      setProperty(`--color-primary-${weight}`, colorValue)
    }
  })
}
