import React, { useState } from 'react'
const Blog = ({ blog }) => {

  //console.log(blog.user)

  const [viewVisible, setViewVisible] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (viewVisible && blog.user!==undefined) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setViewVisible(false)}>hide</button> <br />
          {blog.url} <br />
        likes {blog.likes} <button>like</button> <br />
        {blog.user.name}
        </div>
      </div>
    )
  } else if (viewVisible && blog.user===undefined) {
    return (
      <div style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={() => setViewVisible(false)}>hide</button> <br />
          {blog.url} <br />
        likes {blog.likes} <button>like</button>
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