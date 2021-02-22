const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  return blogs.reduce((acc, curr) => acc + curr.likes, 0) || 0
}

const favoriteBlog = (blogs) => {
  const topBlog = blogs.reduce((acc, curr) => curr.likes > acc.likes ? curr : acc)
  const { _id, url, __v, ...rest } = topBlog
  return rest
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
}