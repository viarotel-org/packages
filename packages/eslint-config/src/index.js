export default {
  extends: ['@antfu'],
  rules: {
    // js
    'curly': 'off',
    'n/prefer-global/process': 'off',
    'unused-imports/no-unused-vars': 'off',
    'no-console': 'off',
    'semi': 'error',
    'quotes': ['error', 'single'],
    'prefer-regex-literals': 'off',
    // ts
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/quotes': 'off',
    '@typescript-eslint/semi': 'off',
    '@typescript-eslint/no-invalid-this': 'off',
    // vue
    'vue/no-unused-refs': 'off',
    'vue/component-tags-order': 'off',
    'vue/html-self-closing': 'off',
  },
}
