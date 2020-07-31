import React, { useState } from 'react'

const Blog = ({
  blog,
  updateLikes,
  user,
  deleteBlog
}) => {

  const [viewVisible, setViewVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const blogViewStatus = () => {
    setViewVisible(!viewVisible)
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

  if (viewVisible && blog.user !== undefined && user.id !== blog.user.id) {
    return (
      <div style={blogStyle} className='viewInfo'>
        <div>
          {blog.title} {blog.author}
          <button onClick={blogViewStatus}
            style={{ backgroundColor: 'yellow' }}>hide</button> <br />
          {blog.url} <br />
        likes {blog.likes} <button onClick={updateBlog}
            style={{ backgroundColor: 'green' }} id='likeButton'>like</button> <br />
          {blog.user.name} <br />
        </div>
      </div>
    )

  } else if (viewVisible && blog.user !== undefined && user.id === blog.user.id) {
    return (
      <div style={blogStyle} className='viewInfo'>
        <div>
          {blog.title} {blog.author}
          <button onClick={blogViewStatus}
            style={{ backgroundColor: 'yellow' }}>hide</button> <br />
          {blog.url} <br />
        likes {blog.likes} <button onClick={updateBlog}
            style={{ backgroundColor: 'green' }} id='likeButton'>like</button> <br />
          {blog.user.name} <br />
          <button
            onClick={() => deleteBlog(blog.id)}
            style={{ backgroundColor: 'red' }} id='deleteButton'>remove</button>
        </div>
      </div>
    )

  } else if (viewVisible && blog.user === undefined) {
    return (
      <div style={blogStyle} className='viewInfo'>
        <div>
          {blog.title} {blog.author}
          <button onClick={blogViewStatus}
            style={{ backgroundColor: 'yellow' }}>hide</button> <br />
          {blog.url} <br />
        likes {blog.likes} <button onClick={updateBlog}
            style={{ backgroundColor: 'green' }} id='likeButton'>like</button>
        </div>
      </div>
    )
  }

  return (
    <div style={blogStyle} className="blogDefaultDisplay">
      <div>
        {blog.title} {blog.author}
        <button onClick={blogViewStatus}
          style={{ backgroundColor: 'gray' }} id='viewButton'>view</button>
      </div>
    </div>
  )
}

export default Blog