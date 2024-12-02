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

after(async () => {
    await mongoose.connection.close()
})