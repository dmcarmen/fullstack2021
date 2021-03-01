import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component = null
  const testBlog = { title: 'testing', author: 'tester', likes: 1213 }

  beforeEach(() => {
    component = render( < Blog blog={testBlog} /> )
  })

  test('only the name and author of the blog post are shown by default', () => {
    component.debug()
    const hideWhenExpandedDiv = component.container.querySelector('.blog div:nth-child(1)')
    const showWhenExpandedDiv = component.container.querySelector('.blogInfo')
    expect(hideWhenExpandedDiv).toBeVisible()
    expect(showWhenExpandedDiv).not.toBeVisible()
  })
})