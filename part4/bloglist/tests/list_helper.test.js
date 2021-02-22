const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list is empty list, equals zero', () => {
    const result = listHelper.totalLikes(helper.listWithNoBlogs)
    expect(result).toBe(0)
  })

  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(5)
  })

  test('when list has some blogs, equals the likes of those', () => {
    const result = listHelper.totalLikes(helper.listWithSomeBlogs)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {
  test('with some blogs', () => {
    const result = listHelper.favoriteBlog(helper.listWithSomeBlogs)
    const expected =
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12
    }
    expect(result).toEqual(expected)
  })
})