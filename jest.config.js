const sharedConfig = {
  moduleFileExtensions: [
    'js',
    'vue',
    'json',
  ],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^~/(.*)$': '<rootDir>/$1',
  },
  setupFiles: [
    './jest/setup.js',
  ],
  transform: {
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': '@vue/vue3-jest',
  },
}

export default {
  projects: [
    // jsdom environment configurations.
    {
      ...sharedConfig,

      displayName: 'jsdom',
      testEnvironment: 'jsdom',
      testEnvironmentOptions: {
        customExportConditions: [
          'node',
          'node-addons',
        ],
      },
      testMatch: [ // ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)']
        '**/__tests__/jsdom/**/*.[jt]s?(x)',
        '**/jsdom/?(*.)+(spec|test).[jt]s?(x)',
      ],
    },

    // node environment configurations.
    {
      ...sharedConfig,

      displayName: 'node',
      testEnvironment: 'node',
      testMatch: [ // ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)']
        '**/__tests__/node/**/*.[jt]s?(x)',
        '**/node/?(*.)+(spec|test).[jt]s?(x)',
      ],
    },
  ],
}
