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
        {blog.author} <br/>
        likes {blog.likes}  <button type='button' value={blog.id} onClick={handleLikes}>like</button> <br/>
        <a href={blog.url}>{blog.url}</a> <br/>
        <button type='button' value={blog.id} onClick={handleDelete}>delete</button> <br/>
    </div>
  )
}

export default Blog