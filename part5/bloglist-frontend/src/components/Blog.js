import React from 'react'
import Togglable from './Togglable'

const Blog = ({ blog, handleLikes, handleDelete }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div className='blog' style={blogStyle} >
      <div>
        TITLE: {blog.title} <br/>
        AUTHOR: {blog.author} <br/>
      </div>
      <Togglable buttonLabel="view" cancelButton="hide">
        <div className='blogInfo'>
          likes {blog.likes}  <button type='button' value={blog.id} onClick={handleLikes}>like</button> <br/>
          <a href={blog.url}>{blog.url}</a> <br/>
          <button type='button' value={blog.id} onClick={handleDelete}>delete</button> <br/>
        </div>
      </Togglable>
    </div>
  )
}

export default Blog