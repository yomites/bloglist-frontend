import React, { useState, useEffect, useRef } from 'react'
import './App.css'
import Blog from './components/Blog'
import BlogForm from './forms/BlogForm'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './forms/Togglable'
import loginService from './services/login'
import LoginForm from './forms/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])
  console.log('render', blogs.length, 'blogs')

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type = 'success') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('Incorrect username or password', 'error')
    }
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notifyWith(`${returnedBlog.title} by ${returnedBlog.author} successfully added`)
      }).catch(() => {
        notifyWith('The fields can not be empty', 'error')
      })
  }

  const updateBlogLikes = id => {

    const blog = blogs.find(b => b.id === id)
    const changedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }

    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog
          : returnedBlog))
      })
  }

  const logoutUser = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    window.localStorage.clear()
  }

  const blogForm = () => (
    <Togglable buttonLabel='create new blog' ref={blogFormRef}>
      <BlogForm
        createBlog={addBlog}
      />
    </Togglable>
  )

  const sortBlogsByLikes = blogs.sort(function (a, b) {
    return b.likes - a.likes
  })

  const deleteBlog = (id) => {
    const toDelete = blogs.find(p => p.id === id)
    const ok = window.confirm(`Delete ${toDelete.title} by ${toDelete.author}`)
    if (ok && toDelete) {
      blogService.remove(id)
        .then(() => {
          setBlogs(blogs.filter(b => b.id !== id))
          notifyWith(`Deleted ${toDelete.title} by ${toDelete.author}`)
        }).catch(error => {
          error.response.data.code === 401 ?
            setBlogs(blogs) :
            setBlogs(blogs.filter(b => b.id !== id))
          notifyWith(error.response.data.error, 'error')
        })
    }
  }

  if (user === null) {
    return (
      <div>
        <h2>Log in to application</h2>
        <Notification notification={notification} />
        <LoginForm handleLogin={handleLogin}
          handleUsernameChange={handleUsernameChange}
          handlePasswordChange={handlePasswordChange}
          username={username}
          password={password}
        />
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification notification={notification} />
      <p>
        {user.name} logged in
        <button onClick={logoutUser}>logout</button>
      </p>
      {blogForm()}
      {sortBlogsByLikes.map(blog =>
        <Blog key={blog.id} blog={blog}
          updateLikes={() => updateBlogLikes(blog.id)}
          user={user}
          deleteBlog={deleteBlog} />
      )}
    </div>
  )
}

export default App