// import js from '@eslint/js'

import {
  FlatCompat,
} from '@eslint/eslintrc'

const compat = new FlatCompat()

/**
 * ESLint Config
 *
 * @type {Array<import('eslint').Linter.FlatConfig>}
 */
export default [
  // js.configs.all,

  ...compat.extends(
    '@nuxtjs',
    'plugin:jest/recommended',
    'plugin:nuxt/recommended'
  ),

  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
      },
    },
  },

  {
    ignores: [
      '**/.nuxt/**',
      '**/dist/**',
      '**/node_modules/**',
    ],
  },
  {
    files: [
      '**/*.js',
      '**/*.vue',
    ],
    rules: {
      indent: [
        'error',
        2, // 4
        {
          ignoredNodes: [],
          SwitchCase: 1, // 0,
          VariableDeclarator: 1,
          outerIIFEBody: 1,
          MemberExpression: 1,
          FunctionDeclaration: {
            parameters: 1,
            body: 1,
          },
          FunctionExpression: {
            parameters: 1,
            body: 1,
          },
          StaticBlock: {
            body: 1,
          },
          CallExpression: {
            arguments: 1,
          },
          ArrayExpression: 1,
          ObjectExpression: 1,
          ImportDeclaration: 1,
          flatTernaryExpressions: false,
          offsetTernaryExpressions: false,
          ignoreComments: false,
        },
      ],
      quotes: [
        'error',
        'single', // 'double'
        {
          avoidEscape: true,
          allowTemplateLiterals: false,
        },
      ],
      semi: [
        'error',
        'never', // 'always'
        {
          beforeStatementContinuationChars: 'never', // 'any'
        },
      ],
      'comma-dangle': [
        'error',
        {
          arrays: 'always-multiline', // 'never'
          objects: 'always-multiline', // 'never'
          imports: 'always-multiline', // 'never'
          exports: 'always-multiline', // 'never'
          functions: 'never',
        },
      ],
      'jest/no-identical-title': [
        'off', // 'error'
      ],
      'operator-linebreak': [
        'error',
        'before', // 'after'
        {
          overrides: { // replace all from default
            '=': 'after',
            '+=': 'after',
            '-=': 'after',
            '*=': 'after',
            '/=': 'after',
            '%=': 'after',
            '**=': 'after',
            '<<=': 'after',
            '>>=': 'after',
            '>>>=': 'after',
            '&=': 'after',
            '|=': 'after',
            '^=': 'after',
          },
        },
      ],
      'vue/no-multiple-template-root': 'off', // 'error',
    },
  },
]
