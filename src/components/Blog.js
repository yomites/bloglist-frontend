import React, { useState } from 'react'
const Blog = ({ blog, updateLikes }) => {

  const [viewVisible, setViewVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const updateBlog = (blog) => {
    updateLikes({
      user: blog.user,
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes,
    })
  }

  if (viewVisible && blog.user !== undefined) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setViewVisible(false)}>hide</button> <br />
          {blog.url} <br />
        likes {blog.likes} <button onClick={updateBlog}>like</button> <br />
          {blog.user.name}
        </div>
      </div>
    )
  } else if (viewVisible && blog.user === undefined) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setViewVisible(false)}>hide</button> <br />
          {blog.url} <br />
        likes {blog.likes} <button onClick={updateBlog}>like</button>
        </div>
      </div>
    )
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={() => setViewVisible(true)}>view</button>
      </div>
    </div>
  )
}

export default Blog