const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'BlogBois: we out here',
        author: 'JB BlogBoi',
        url: 'wwww.blogafella.edu',
        likes: 33,
    },
    {
        title: 'Bing Bop Blame',
        author: 'Jim',
        url: 'www.jokeurl.com',
        likes: 12,
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(u => u.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}