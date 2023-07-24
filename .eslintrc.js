module.exports = {
  extends: "@antfu",
  rules: {
    // js
    "curly": "off",
    "n/prefer-global/process": "off",
    "unused-imports/no-unused-vars": "off",
    "no-console": "off",
    "semi": "error",
    // ts
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/quotes": "off",
    "@typescript-eslint/semi": "off",
    // vue
    "vue/no-unused-refs": "off",
    "vue/component-tags-order": "off",
  },
}
