import React, { useState, useEffect } from 'react'
import './App.css'
import Blog from './components/Blog'
import BlogForm from './forms/BlogForm'
import blogService from './services/blogs'
import Notification from './components/Notification'
import loginService from './services/login'
import LoginForm from './forms/LoginForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [notification, setNotification] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notifyWith = (message, type='success') => {
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
        'loggedNoteappUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      notifyWith('Incorrect username or password', 'error')
    }
  }

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const addBlog = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notifyWith(`${returnedBlog.title} by ${returnedBlog.author} successfully added`)
    
        setNewTitle('')
        setNewAuthor('')
        setNewUrl('')
      })
  }

  const logoutUser = () => {
    window.localStorage.removeItem('loggedNoteappUser')
    setUser(null)
    window.localStorage.clear()
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
      <BlogForm
        handleTitleChange={handleTitleChange}
        handleAuthorChange={handleAuthorChange}
        handleUrlChange={handleUrlChange}
        addBlog={addBlog}
        newTitle={newTitle}
        newAuthor={newAuthor}
        newUrl={newUrl}
      />
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App