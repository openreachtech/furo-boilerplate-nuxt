import openreachtechConfig from '@openreachtech/eslint-config'

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
        Headers: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        Request: 'readonly',
        RequestInfo: 'readonly', // eslint-disable-line no-restricted-syntax
        RequestInit: 'readonly',
        Response: 'readonly',
        sessionStorage: 'readonly',
        Storage: 'readonly',
        URL: 'readonly',

        // DOM
        window: 'readonly',
        document: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLOptionElement: 'readonly',
        HTMLSelectElement: 'readonly',
        HTMLTextAreaElement: 'readonly',
        RadioNodeList: 'readonly', // eslint-disable-line no-restricted-syntax
      },
      sourceType: 'module',
    },
  },

  {
    ignores: [
      '**/.nuxt/**',
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
    rules: {
      'no-restricted-syntax': [
        'error',
        // There are 0 or more rest parameters in the array
        // string | { selector: string, message: string }
        {
          selector: 'CallExpression[callee.property.name=forEach]',
          message: 'Never use forEach method',
        },
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
          selector: 'Identifier[name=/.+(Data|Info|(<?![gs]et)Item|List|Manager)$/]', // 'Identifier[name=/.+(Data|Info|Item|List|Manager)$/]'
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
    },
  },
]
