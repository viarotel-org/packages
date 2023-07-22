import { defineBuildConfig } from "unbuild"

export default defineBuildConfig({
  entries: ["./src/index"],
  clean: true,
  failOnWarn: false,
  rollup: {
    emitCJS: true,
  },
  externals: [
    "vite",
    "@vitejs/plugin-vue2",
    "@vitejs/plugin-vue2-jsx",
    "@vue/compiler-sfc",
    "vue2s",
  ],
})
