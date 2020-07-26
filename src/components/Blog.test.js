import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from '../forms/BlogForm'

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
    likes: 0
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} blogViewStatus={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)
  component.debug()

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
    0
  )
})

test('clicking the likes button twice calls the event handler twice ', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Brian Taylor',
    url: 'www.briantaylor.com',
    likes: 0
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} updateLikes={mockHandler} />
  )

  const viewButton = component.getByText('view')
  fireEvent.click(viewButton)

  const likesButton = component.getByText('like')
  fireEvent.click(likesButton)
  fireEvent.click(likesButton)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.change(author, {
    target: { value: 'Brian Taylor' }
  })
  fireEvent.change(url, {
    target: { value: 'www.brian.com' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier')
  expect(createBlog.mock.calls[0][0].author).toBe('Brian Taylor')
  expect(createBlog.mock.calls[0][0].url).toBe('www.brian.com')
})