import globals from 'globals'

import eslintPluginComments from 'eslint-plugin-eslint-comments'

import openreachtechConfig from '@openreachtech/eslint-config'
import pluginVue from 'eslint-plugin-vue'

/**
 * ESLint Config
 *
 * @type {Array<import('eslint').Linter.Config>}
 */
export default [
  ...openreachtechConfig,

  // Override rules after extending the Openreach Tech config
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      sourceType: 'module',
    },
  },

  {
    ignores: [
      '**/.nuxt/**',
      '**/.output/**',
      '**/dist/**',
      '**/node_modules/**',
    ],
  },

  // Turn off some rules temporarily
  {
    rules: {
      '@stylistic/lines-around-comment': 'off',

      'import/default': 'off',
      'import/namespace': 'off',
      'import/no-named-as-default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-mutable-exports': 'off',

      'jest/no-deprecated-functions': 'off',
      'jest/require-top-level-describe': 'off',

      'jsdoc/check-tag-names': 'off',
      'jsdoc/no-undefined-types': 'off',
      'jsdoc/valid-types': 'off',

      'n/no-deprecated-api': 'off',
      'n/no-exports-assign': 'off',
      'n/no-path-concat': 'off',
      'n/handle-callback-err': 'off',

      'require-await': 'off',
      'sort-imports': 'off',

      'unicorn/error-message': 'off',

      'vue/no-multiple-template-root': 'off',
    },
  },

  {
    plugins: {
      'eslint-comments': eslintPluginComments,
    },
    rules: {
      'eslint-comments/no-restricted-disable': [
        'error',
        '*',
      ],
    },
  },

  {
    rules: {
      'no-restricted-syntax': [
        'error',
        // There are 0 or more rest parameters in the array
        // string | { selector: string, message: string }
        // NOTE: It's ok to use Array#forEach if there's only one statement in the callback function.
        // {
        //   selector: 'CallExpression[callee.property.name=forEach]',
        //   message: 'Never use forEach method',
        // },
        {
          selector: 'CallExpression[callee.type=MemberExpression][callee.property.name=/^(every|filter|find|findIndex|findLast|findLastIndex|flatMap|forEach|group|groupToMap|map|reduce|reduceRight|some)$/] IfStatement',
          message: 'Never use if in higher-order function',
        },
        {
          selector: 'DoWhileStatement',
          message: 'Never use do-while',
        },
        {
          selector: 'ForInStatement',
          message: 'Never use for-in',
        },
        {
          selector: 'ForOfStatement',
          message: 'Never use for-of',
        },
        {
          selector: 'ForStatement',
          message: 'Never use for',
        },
        {
          selector: 'Identifier[name=/.+((?<!Form)Data|(?<!Request)Info|(?<![gs]et|named|remove)Item|(?<!class|RadioNode)List|Manager)$/]', // 'Identifier[name=/.+(Data|Info|Item|List|Manager)$/]'
          message: 'Not allowed to use "Data", "Info", "Item", "List", and "Manager" as suffix of identifier.',
        },
        {
          selector: 'IfStatement IfStatement',
          message: 'Never use nested-if including else-if',
        },
        {
          selector: 'SwitchStatement',
          message: 'Never use switch',
        },
        // FIXME: below is not required by other rules
        {
          selector: 'VariableDeclaration[kind=let]',
          message: 'Never use let',
        },
        {
          selector: 'WhileStatement',
          message: 'Never use while',
        },
      ],
      complexity: [
        'error',
        10, // 20
      ],
    },
  },
]
