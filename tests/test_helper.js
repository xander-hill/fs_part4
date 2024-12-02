const Blog = require('../models/blog')

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
        likes: 12
    },
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
}

module.exports = {
    initialBlogs, blogsInDb
}