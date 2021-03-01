import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  let component = null
  const testBlog = { title: 'testing', author: 'tester', likes: 1213 }

  describe('without like function', () => {
    beforeEach(() => {
      component = render( < Blog blog={testBlog} /> )
    })

    test('only the name and author of the blog post are shown by default', () => {
      const whenHidden = component.container.querySelector('.blog div:nth-child(1)')
      const whenShowing = component.container.querySelector('.blogInfo')
      expect(whenHidden).toBeVisible()
      expect(whenShowing).not.toBeVisible()
    })

    test('clicking the button show shows other information', () => {
      const button = component.getByText('view')
      const whenShowing = component.container.querySelector('.blogInfo')

      fireEvent.click(button)
      expect(whenShowing).toBeVisible()
    })
  })

  describe('with a like function', () => {
    const mockHandler = jest.fn()
    beforeEach(() => {
      component = render( < Blog blog={testBlog} handleLikes={mockHandler} /> )
      fireEvent.click(component.getByText('view'))
    })
    test('clicking the like button twice calls event handler twice', () => {
      const button = component.getByText('like')
      fireEvent.click(button)
      fireEvent.click(button)

      expect(mockHandler.mock.calls).toHaveLength(2)
    })
  })
})