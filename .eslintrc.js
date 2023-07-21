module.exports = {
  extends: '@antfu',
  rules: {
    // js
    'n/prefer-global/process': 'off',
    'unused-imports/no-unused-vars': 'off',
    'no-console': 'off',
    'semi': ['error', 'never'],
    // ts
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/semi': 'off',
    // vue
    'vue/no-unused-refs': 'off',
  },
}
