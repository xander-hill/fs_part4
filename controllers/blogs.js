const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user')
    response.json(blogs)
})
  
blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
    const body = request.body

    const user = request.user

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user.id,
      comments: []
    })

    const savedBlog = await blog.save()
    console.log(savedBlog)
    user.blogs = user.blogs.concat(savedBlog)
    await user.save()

    response.status(201).json(savedBlog)
})

blogsRouter.post('/:id/comments', async (request, response) => {
  if (!blog) {
    response.status(404).end()
  } 
  const body = request.body
  const blog = await Blog.findById(request.params.id)

  const comment = new Comment({
    comment: body.content,
  })

  const savedComment = comment.save()

  blog.comments = blog.comments.concat(savedComment)
  await blog.save()

  response.status(201).json(savedComment)

})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end()
  }
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request,response) => {
  console.log('request params id:', request.params.id)
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    console.log(`Blog with ID ${request.params.id} not found`);
    return response.status(404).json({ error: 'Blog not found' });
  }

  console.log(request.params.user)
  console.log(blog.user)
  const userid = request.user.id
  console.log(userid.toString())
  if ( blog.user.toString() === userid.toString() ) {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
  }

  response.status(401).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const update = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, update, {new: true}).populate('user')
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter