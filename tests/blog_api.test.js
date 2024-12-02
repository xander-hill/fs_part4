const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const assert = require('node:assert')
const api = supertest(app)

beforeEach(async () => {
    await Blog.deleteMany({})

    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('blogs are returned as json', async () => {
    console.log('entered test')
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('unique identifier is "id" and not "_id" ', async () => {
    const response = await api.get('/api/blogs')
    assert(Object.hasOwn(response.body[0], 'id'))
})

test('posting a blog works', async () => {
    const newBlog = {
        title: 'Awooga',
        author: 'BingBong',
        url: 'www.boop.net',
        likes: 4000000,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    assert(titles.includes('Awooga'))
})

after(async () => {
    await mongoose.connection.close()
})