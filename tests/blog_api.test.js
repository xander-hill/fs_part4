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
    console.log(response._body[0])
    assert(Object.hasOwn(response.body[0], 'id'))
})

after(async () => {
    await mongoose.connection.close()
})