import antfu from '@antfu/eslint-config'

export default antfu(
  {
    ignores: [
      'node_modules',
      'dist',
    ],
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },
  },
  {
    rules: {
      'no-console': 'off',
    },
  },
)
