const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const supertest = require('supertest')
const Blog = require('../models/blog')
const assert = require('node:assert')
const api = supertest(app)
const bcrypt = require('bcrypt')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

beforeEach(async () => {
    await Blog.deleteMany({});
    await User.deleteMany({});

    // Add initial blogs to the database
    for (let blog of helper.initialBlogs) {
        let blogObject = new Blog(blog);
        await blogObject.save();
    }

    // Create a user for generating the token
    const user = new User({
        username: 'testUser',
        name: 'Test User',
        passwordHash: 'hashedpassword', // Replace with actual hashed password
    });
    await user.save();

    // Generate a token for the user
    const userForToken = {
        username: user.username,
        id: user.id,
    };
    token = jwt.sign(userForToken, process.env.SECRET);
    console.log(token)
});

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
        .set('Authorization', `Bearer ${token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    assert(titles.includes('Awooga'))
})

test('missing likes property defaults to zero', async () => {
    const missingLikes = {
        title: 'Who',
        author: 'What',
        url: 'Where',
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(missingLikes)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    console.log(blogsAtEnd[2])
    assert.strictEqual(blogsAtEnd[2].likes, 0)
})

test('posting missing title and url property result in bad request', async () => {
    const missingTitle = {
        url: 'aaa',
        author: 'joe',
        likes: 4,
    }

    const missingUrl = {
        title: 'q',
        author: 'g',
        likes: 6,
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(missingTitle)
        .expect(400)
    
    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(missingUrl)
        .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('no token provided results in 401', async () => {
    const newBlog = {
        title: 'Awooga',
        author: 'BingBong',
        url: 'www.boop.net',
        likes: 4000000,
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
        .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

    const titles = blogsAtEnd.map(blog => blog.title)
    assert(!titles.includes('Awooga'))
})

test('deleting a blog is possible', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    assert(!titles.includes('BlogBois: we out here'))

})

test('updating a blog is possible', async () => {
    const blogAtStart = await helper.blogsInDb()
    const blogToUpdate = blogAtStart[0]
    const updateToBlog = {
        title: 'BlogBois: we out here',
        author: 'JB BlogBoi',
        url: 'wwww.blogafella.edu',
        likes: 40,
    }

    console.log(blogToUpdate.id)

    await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(updateToBlog)
        .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    const updatedBlog = blogsAtEnd[0]
    console.log(updatedBlog)
    assert.strictEqual(updatedBlog.title, updateToBlog.title)
    assert.strictEqual(updatedBlog.likes, updateToBlog.likes)
})

after(async () => {
    await mongoose.connection.close()
})