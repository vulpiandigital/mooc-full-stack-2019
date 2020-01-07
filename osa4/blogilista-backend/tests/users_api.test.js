//const blogsApiHelper = require('../utils/blogs_api_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

const initialUsers = [
	{
		username: "test",
		password: "pass",
		name: "Test User"
	}
]

beforeEach(async () => {
	await User.deleteMany({})
	await User.insertMany(initialUsers)
})

describe('Bloglist / Users API tests', () => {
	
	const noUsername = {...initialUsers[0]}
	delete noUsername.username
	test('Username must be provided', async () => {
		await api
			.post('/api/users')
			.send(noUsername)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	})
	
	const nonUniqueUsername = {...initialUsers[0]}
	test('Username must be unique', async () => {
		await api
			.post('/api/users')
			.send(nonUniqueUsername)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	})
	
	const badUsername = {...initialUsers[0]}
	badUsername.username = 'a'
	test('Username must be at least 3 characters long', async () => {
		await api
			.post('/api/users')
			.send(badUsername)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	})
	
	const noPassword = {...initialUsers[0]}
	delete noPassword.password
	test('Password must be provided', async () => {
		await api
			.post('/api/users')
			.send(noPassword)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	})
	
	const badPassword = {...initialUsers[0]}
	delete badPassword.password
	test('Password must be at least 3 characters long', async () => {
		await api
			.post('/api/users')
			.send(badPassword)
			.expect(400)
			.expect('Content-Type', /application\/json/)
	})
	
})

afterAll(() => { mongoose.connection.close() })