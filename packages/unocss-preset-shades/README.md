# unocss-preset-shades

🎨 为 Unocss 生成一组逐渐由浅至深的主题色调预设，通过提供基准颜色。

🎨 Create a series of theme color presets for Unocss that gradually transition from light to dark, based on a provided base color.

## 安装

```shell
npm install @viarotel-org/unocss-preset-shades
```

## 示例

```js
import { presetShades } from '@viarotel-org/unocss-preset-shades'

// unocss.config.js
const unocssConfig = {
  // ...
  presets: [
    // colorValue 值支持常见的色值 如 hex rgb rgba hsl cmyk 等
    presetShades(colorValue, {
      shades: [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950],
      baseShade: 500,
      primaryKey: 'primary',
    }),
  ],
}
```

## 注意事项

上面的配置将会在 :root 中注入以下颜色变量以实现主题色动态变更功能

```css
/* 增加 page 选择器以支持 uniapp */
:root,
page {
  --color-primary-50: 230, 244, 241;
  --color-primary-100: 204, 232, 227;
  --color-primary-200: 154, 209, 198;
  --color-primary-300: 103, 187, 170;
  --color-primary-400: 53, 164, 141;
  --color-primary-500: 2, 141, 113;
  --color-primary-600: 2, 113, 90;
  --color-primary-700: 1, 85, 68;
  --color-primary-800: 1, 56, 45;
  --color-primary-900: 0, 28, 23;
  --color-primary-950: 0, 14, 11;
  --color-primary: 2, 141, 113;
}
```

并为 unocss 生成以下颜色配置

```js
const unocssConfig = {
  // ...
  theme: {
    colors: {
      primary: {
        DEFAULT: 'rgba(var(--color-primary), <alpha-value>)',
        50: 'rgba(var(--color-primary-50), <alpha-value>)',
        100: 'rgba(var(--color-primary-100), <alpha-value>)',
        200: 'rgba(var(--color-primary-200), <alpha-value>)',
        300: 'rgba(var(--color-primary-300), <alpha-value>)',
        400: 'rgba(var(--color-primary-400), <alpha-value>)',
        500: 'rgba(var(--color-primary-500), <alpha-value>)',
        600: 'rgba(var(--color-primary-600), <alpha-value>)',
        700: 'rgba(var(--color-primary-700), <alpha-value>)',
        800: 'rgba(var(--color-primary-800), <alpha-value>)',
        900: 'rgba(var(--color-primary-900), <alpha-value>)',
        950: 'rgba(var(--color-primary-950), <alpha-value>)',
      },
    },
  },
}
```

## 高级功能

> 该预设提供 generateShades 以及 updateShades 方法来生成和更新颜色变量
>
> 如果需要自定义配置以及其他高级功能可使用该方法实现

```js
import {
  generateShades,
  updateShades,
} from '@viarotel-org/unocss-preset-shades'

const shades = generateShades(colorValue, {
  returnRgb: true,
  baseShade: 500,
})
// 将会生成以下色组数据
// {
//   '50': '230,244,241',
//   '100': '204,232,227',
//   '200': '154,209,198',
//   '300': '103,187,170',
//   '400': '53,164,141',
//   '500': '2,141,113',
//   '600': '2,113,90',
//   '700': '1,85,68',
//   '800': '1,56,45',
//   '900': '0,28,23',
//   '950': '0,14,11',
//   DEFAULT: '2,141,113'
// }

// 执行 updateShades 将会生成新的色组并更新 :root 上定义的色组变量
// 注意: 小程序环境该方法尚未得到支持
updateShades(newColorValue)
```
