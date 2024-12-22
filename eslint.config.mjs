import antfu from '@antfu/eslint-config'

export default antfu({
  vue: {
    overrides: {
      'no-console': 'off',
    },
  },
  ignores: [
    'node_modules',
    'dist',
  ],
  formatters: {
    css: true,
    html: true,
    markdown: 'prettier',
  },
})
