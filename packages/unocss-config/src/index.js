import { defineConfig, presetWind } from "unocss"
import transformerDirectives from "@unocss/transformer-directives"

const primary = {
  DEFAULT: "rgba(var(--color-primary), <alpha-value>)",
  50: "rgba(var(--color-primary-50), <alpha-value>)",
  100: "rgba(var(--color-primary-100), <alpha-value>)",
  200: "rgba(var(--color-primary-200), <alpha-value>)",
  300: "rgba(var(--color-primary-300), <alpha-value>)",
  400: "rgba(var(--color-primary-400), <alpha-value>)",
  500: "rgba(var(--color-primary-500), <alpha-value>)",
  600: "rgba(var(--color-primary-600), <alpha-value>)",
  700: "rgba(var(--color-primary-700), <alpha-value>)",
  800: "rgba(var(--color-primary-800), <alpha-value>)",
  900: "rgba(var(--color-primary-900), <alpha-value>)",
  950: "rgba(var(--color-primary-950), <alpha-value>)",
}

const windPresetConfig = presetWind()
export default defineConfig({
  presets: [windPresetConfig],
  safelist: [],
  theme: {
    colors: {
      gray: windPresetConfig.theme.colors.neutral,
      primary,
    },
    boxShadow: {
      "el": "var(--el-box-shadow)",
      "el-light": "var(--el-box-shadow-light)",
      "el-lighter": "var(--el-box-shadow-lighter)",
      "el-dark": "var(--el-box-shadow-dark)",
    },
  },
  transformers: [transformerDirectives()],
  shortcuts: {
    "position-center":
      "absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2",
    "position-x-center": "absolute left-1/2 transform -translate-x-1/2",
    "position-y-center": "absolute top-1/2 transform -translate-y-1/2",
    "inset-fix-0": "top-0 bottom-0 left-0 right-0",
  },
})
