const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')

describe('blog test', () => {
  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.listWithSomeBlogs
      .map(blog => new Blog(blog))
    const promiseArray = blogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
  })

  describe('blogs get', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('there are 5 blogs', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body.length).toBe(helper.listWithSomeBlogs.length)
    })

    test('unique identifier property of the blog posts is named id', async () => {
      const response = await api.get('/api/blogs')
      expect(response.body[0].id).toBeDefined()
    })
  })

  describe('addition of a new blog', () => {
    test('succeeds with valid data', async () => {
      const newBlog = {
        title: 'Test',
        author: 'tester',
        url: 'www.test.es',
        likes: 2,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      expect(blogsAtEnd.length).toBe(helper.listWithSomeBlogs.length + 1)
      const contents = blogsAtEnd.map(n => n.title)
      expect(contents).toContain('Test')
    })

    test('if likes property is missing, it will get value 0', async() => {
      const blog = {
        title: 'Test',
        author: 'TestUser',
        url: 'www.test.es'
      }

      await api
        .post('/api/blogs')
        .send(blog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await helper.blogsInDb()
      const likes = blogsAtEnd.map(n => n.likes)
      expect(likes).not.toContain(undefined)
    })

    test('if title and url are missing backend responds with 400 ', async() => {
      const newBlog = {
        author: 'testing400',
        likes: 2
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

      const blogsAtEnd = await helper.blogsInDb()
      const author = blogsAtEnd.map(n => n.author)
      expect(author).not.toContain('testing400')
    })
  })

})

describe('user test', () => {
  test('creation fails if username already taken', async () => {
    const usersAtStart = await helper.usersInDb()

    const user = {
      username: 'testing',
      name: 'Testing',
      password: 'tests',
    }

    await api.post('/api/users')
      .send(user)

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('`username` to be unique')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('if username is shorter than 3 characters creation fails ', async () => {
    const usersAtStart = await helper.usersInDb()

    const user = {
      username: 'ml',
      name: 'mltst',
      password: 'salaa',
    }

    const result = await api
      .post('/api/users')
      .send(user)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('is shorter than the minimum allowed length (3)')

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('creation fails if password is smaller than 3 characters', async () => {
    const usersAtStart = await helper.usersInDb()

    const user = {
      username: 'test4',
      name: 'another test',
      password: 'mm',
    }

    await api
      .post('/api/users')
      .send(user)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })
})

afterAll(() => {
  mongoose.connection.close()
})