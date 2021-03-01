import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Logout from './components/Logout'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notifMessage, setNotifMessage] = useState(null)
  const [notifType, setNotifType] = useState('notif')

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })

      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBloglistappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotifMessage('Wrong credentials')
      setNotifType('error')
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }  }

  const handleLogout = () => {
    setUser(null)
    blogService.setToken(null)
    window.localStorage.removeItem('loggedBloglistappUser')
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotifMessage('Blog added correctly!')
      setNotifType('notif')
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    } catch (exception) {
      setNotifMessage('Something went wrong')
      setNotifType('error')
      setTimeout(() => {
        setNotifMessage(null)
      }, 5000)
    }
  }

  const deleteBlog = (event) => {
    event.preventDefault()
    const id = event.target.value
    const blog = blogs.find(n => n.id === id)
    if (window.confirm(`delete blog ${blog.title} by ${blog.author}`)) {
      blogService.remove(id)
      setBlogs(blogs.filter(n => n.id !== id))
    }
  }

  const handleLikes = (event) => {
    event.preventDefault()
    const id = event.target.value
    const blog = blogs.find(n => n.id === id)
    const changedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user
    }
    blogService
      .update(id, changedBlog)
      .then(returnedBlog => {
        setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
      })
  }

  const loginForm = () => {
    return (
      <Togglable buttonLabel="log in" cancelButton='cancel'>
        <LoginForm
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
        />
      </Togglable>
    )
  }

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" cancelButton='cancel' ref={blogFormRef}>
        <BlogForm createBlog={createBlog} />
      </Togglable>
    )
  }

  return (
    <div>
      <h1>Blogs application</h1>
      <Notification msg={notifMessage} msgType={notifType} />
      {user === null ?
        <div>
          {loginForm()}
        </div>
        :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged-in</p>
          <Logout handleLogout={handleLogout} />
          <h3>add blog</h3>
          {blogForm()}
          blogs
          {blogs.sort((a, b) => b.likes - a.likes)
            .map((blog, i) =>
              <ul key={blog.id} id={i}>
                <Blog blog={blog} handleLikes={handleLikes} handleDelete={deleteBlog}/>
              </ul>
            )}
        </div>
      }

    </div>
  )
}

export default App