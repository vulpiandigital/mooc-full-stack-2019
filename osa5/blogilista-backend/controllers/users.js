const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (req, res, next) => {
	try {
		const body = req.body
		if ( !body.password || body.password.length < 3 ) {
			return res.status(400).json({ error: 'A password must be provided and it has to be least 3 characters long' })
		}
		if ( !body.name ) { body.name = '' }
		const saltRounds = 10
		const passwordHash = await bcrypt.hash(body.password, saltRounds)
		const user = new User({
			username: body.username,
			name: body.name,
			passwordHash
		})
		
		const savedUser = await user.save()
		
		res.status(201).json(savedUser)
		
	} catch(exception) {
		next(exception)
	}
})

usersRouter.get('/', async (req, res) => {
	const users = await User.find({}).populate('blogs', { likes: 0, user: 0 })
	res.json(users.map(u => u.toJSON()))
})

module.exports = usersRouter