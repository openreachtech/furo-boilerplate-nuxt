// To apply fetch API polyfill for Jest
import 'whatwg-fetch'

import {
  jest as jestGlobal,
} from '@jest/globals'

globalThis.jest = jestGlobal
