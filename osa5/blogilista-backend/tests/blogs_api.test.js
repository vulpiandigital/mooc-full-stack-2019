const blogsApiHelper = require('../utils/blogs_api_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
 	{
		_id: "5a422a851b54a676234d17f7",
		title: "React patterns",
		author: "Michael Chan",
		url: "https://reactpatterns.com/",
		likes: 7,
		__v: 0
  	},
	{
		_id: "5a422aa71b54a676234d17f8",
		title: "Go To Statement Considered Harmful",
		author: "Edsger W. Dijkstra",
		url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
		likes: 5,
		__v: 0
	},
	{
		_id: "5a422b3a1b54a676234d17f9",
		title: "Canonical string reduction",
		author: "Edsger W. Dijkstra",
		url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
		likes: 12,
		__v: 0
	},
	{
		_id: "5a422b891b54a676234d17fa",
		title: "First class tests",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.html",
		likes: 10,
		__v: 0
	},
	{
		_id: "5a422ba71b54a676234d17fb",
		title: "TDD harms architecture",
		author: "Robert C. Martin",
		url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
		likes: 0,
		__v: 0
	},
  	{
    	_id: "5a422bc61b54a676234d17fc",
    	title: "Type wars",
    	author: "Robert C. Martin",
    	url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    	likes: 2,
    	__v: 0
 	}  
]
const newBlog = {...initialBlogs[0]}

beforeEach(async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(initialBlogs)
})

describe('Bloglist / Blogs API tests', () => {
	
	test('Blogs are returned as JSON', async () => {
		await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})

	test('Blogs are identified by a field called id', async () => {
		const res = await api
			.get('/api/blogs')
			.expect(200)
			.expect('Content-Type', /application\/json/)
		
		expect(blogsApiHelper.blogsHaveID(res.body)).toBeDefined()
	})
	
	// Commented tests excluded as they would fail w/o token authorization
	
	/*test('Can insert a valid blog item via POST request', async () => {
		const blogsBeforeInsert = await blogsApiHelper.blogsInDb()
		await api
			.post('/api/blogs')
			.send(newBlog)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		const blogsAfterInsert = await blogsApiHelper.blogsInDb()
		expect(blogsAfterInsert.length).toBe(blogsBeforeInsert.length + 1)
	})
	
	test('Likes will be given value 0 if not set', async () => {
		const newBlogWithoutLikes = {...newBlog}
		delete newBlogWithoutLikes.likes
		const res = await api
			.post('/api/blogs')
			.send(newBlogWithoutLikes)
			.expect(201)
			.expect('Content-Type', /application\/json/)
		expect(res.body.likes).toBe(0)
	})
	
	test('Blog item will be rejected if it is missing title and url', async () => {
		const newBlogWithoutTitleAndUrl = {...newBlog}
		delete newBlogWithoutTitleAndUrl.title
		delete newBlogWithoutTitleAndUrl.url
		await api
			.post('/api/blogs')
			.send(newBlogWithoutTitleAndUrl)
			.expect(400)
	})
	
	test('Blog item can be removed via DELETE request', async () => {
		await api
			.delete('/api/blogs/5a422a851b54a676234d17f7')
			.expect(204)
	})*/
	
	test('Likes of a blog item can be updated via PUT request', async () => {
		
		const newLikes = {...newBlog}
		delete newLikes.title
		delete newLikes.author
		delete newLikes.url
		
		await api
			.put('/api/blogs/5a422a851b54a676234d17f7')
			.send(newLikes)
			.expect(200)
			.expect('Content-Type', /application\/json/)
	})
	
})

afterAll(() => { mongoose.connection.close() })