module.exports = {
  plugins: ['stylelint-order', 'stylelint-scss'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-recommended',
    './node_modules/prettier-stylelint/config.js',
  ],
  ignoreFiles: [
    '**/node_modules/**',
    './src/scss/lib/**',
  ],
  rules: {
    'block-opening-brace-space-before': 'always',
    'order/properties-alphabetical-order': true,
    'string-quotes': "double",
    'value-list-comma-space-after': 'always',
  },
}
