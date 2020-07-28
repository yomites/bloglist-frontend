import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <h2>create new</h2>
        <div>
                    Title: <input
            id='title'
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
          />
        </div>
        <div>
                    Author: <input
            id='author'
            type="text"
            value={newAuthor}
            onChange={handleAuthorChange}
          />
        </div>
        <div>
                    url: <input
            id='url'
            type="text"
            value={newUrl}
            onChange={handleUrlChange}
          />
        </div>
        <div>
          <button type="submit" id='createblog'>create</button>
        </div>
      </div>
    </form>
  )
}

export default BlogForm