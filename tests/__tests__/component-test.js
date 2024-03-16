import {
  mount,
} from '@vue/test-utils'

import TheHeader from '../../components/The/Header.vue'

describe('<TheHeader>', () => {
  test('to include <header>', () => {
    const wrapper = mount(TheHeader)

    const actual = wrapper.html()

    expect(actual)
      .toBe('<header>I am Header</header>')
  })
})
