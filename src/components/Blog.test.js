import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
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

test('blog url and number of likes are also shown when view button is clicked ', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Brian Taylor',
    url: 'www.briantaylor.com',
    likes: 2
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} blogViewStatus={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)
  component.debug()
  console.log(mockHandler.mock.calls)

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'Brian Taylor'
  )
  expect(component.container).toHaveTextContent(
    'www.briantaylor.com'
  )
  expect(component.container).toHaveTextContent(
    2
  )
})