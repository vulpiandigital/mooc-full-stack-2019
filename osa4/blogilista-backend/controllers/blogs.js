const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const loginRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (req, res) => {
	const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
	res.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.get('/:id', async (req, res, next) => {
	try {
		const blog = await Blog.findById(req.params.id)
		return blog ? res.json(blog.toJSON()) : res.status(404).end()
	} catch(exception) {
		next(exception)
	}
})

blogsRouter.post('/', async (req, res, next) => {
	const body = req.body
	if ( !body.likes || body.likes === null ) { body.likes = 0 }
	try {
		const decodedToken = jwt.verify(req.token, process.env.SECRET)
		if ( !decodedToken.id ) {
			return res.status(401).json({ error: 'Token missing or invalid' })
		}
		const user = await User.findById(decodedToken.id)
		body.user = user._id
		const blog = new Blog(body)
		const savedBlog = await blog.save()
		user.blogs = user.blogs.concat(savedBlog._id)
		await user.save()
		res.status(201).json(savedBlog.toJSON())
	} catch(exception) { 
		next(exception) 
	}
})

blogsRouter.delete('/:id', async (req, res, next) => {
	try {
		const decodedToken = jwt.verify(req.token, process.env.SECRET)
		if ( !decodedToken.id ) {
			return res.status(401).json({ error: 'Token missing or invalid' })
		} else {
			let blog = await Blog.findById(req.params.id)
			if ( !blog ) { return res.status(404).end() }
			if ( blog.user.toString() === decodedToken.id.toString() ) {
				let blog = await Blog.findByIdAndRemove(req.params.id)
				return blog ? res.status(204).end() : res.status(404).end()
			} else {
				return res.status(401).json({ error: 'This item does not belong to you' })
			}
		}
	} catch(exception) {
		next(exception)
	}
})

blogsRouter.put('/:id', async (req, res, next) => {
	const body = req.body
	const blog = { likes: body.likes }
	try {
		const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, { new: true })
		res.json(updatedBlog.toJSON())
	} catch(exception) {
		exception(error)
	}
})


module.exports = blogsRouter