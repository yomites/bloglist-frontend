import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Brian Taylor',
    url: 'www.briantaylor.com',
    likes: 2
  }

  const component = render(
    <Blog blog={blog} />
  )

  component.debug()

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Brian Taylor'
  )
  expect(component.container).not.toHaveTextContent(
    'www.briantaylor.com'
  )
  expect(component.container).not.toHaveTextContent(
    2
  )
})